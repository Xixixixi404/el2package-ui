import path from 'path'
import fs from 'fs'
// @ts-ignore
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdContainer from 'markdown-it-container'
// @ts-ignore
import type Token from 'markdown-it/lib/token'
import { highlight } from '../utils/highlight'
import { docRoot } from './global'
import prettier from '@prettier/sync'

const localMd = MarkdownIt()

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(tokens: Token[], index: number): string
}

/**
 * @description: 生成对应markDownIt配置，render函数提供名为Demo的组件。
 * 在md文件中使用<CustomComponent />，可以渲染vue组件
 * Demo组件会读取examples文件夹下的.vue文件，将文件内容作为源码展示
 * 同时每个.md文件会被自动解析为一个vue组件，可以在页面中直接引用
 * @param {typeof} md: MarkdownIt 配置
 * @return {string} Demo组件
 */
export const mdPlugin = (md: any) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        // 意为打开标签
        /* means the tag is opening */
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''

        // demo文件名称
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          // 读取示列代码文件
          source = fs.readFileSync(path.resolve(docRoot, `${sourceFile}.vue`), 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        // 正则表达式匹配并移除 <t-layout-page> 和 <t-layout-page-item> 标签及其内容
        const cleanedContent = source
          .replace(/<t-layout-page[\s\S]*?>([\s\S]*?)<\/t-layout-page>/g, '$1') // 移除 <t-layout-page> 标签，但保留内部内容
          .replace(/<t-layout-page-item[\s\S]*?>([\s\S]*?)<\/t-layout-page-item>/g, '$1') // 移除 <t-layout-page-item> 标签，但保留内部内容

        // 使用 Prettier 格式化处理后的内容，自动加载项目中的配置
        const formattedContent = prettier.format(cleanedContent, {
          parser: 'vue' // 指定解析器为 vue
        })
        console.log(formattedContent)

        // opening tag
        return `<Demo
              source="${encodeURIComponent(highlight(formattedContent, 'vue'))}"
              path="${sourceFile}"
              raw-source="${encodeURIComponent(cleanedContent)}"
              description="${encodeURIComponent(localMd.render(description))}">`
      } else {
        // 闭合标签
        // closing tag
        return '</Demo>\n'
      }
    }
  } as ContainerOpts)
}
