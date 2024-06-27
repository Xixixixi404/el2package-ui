/*
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-10-09 15:50:38
 * @FilePath: \jnf-ui-master\docs\.vitepress\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
export default defineConfig({
  title: 'jnf-ui基础组件文档',
  description: '基于Element-plus基础组件封装使用',
  lang: 'cn-ZH',
  base: '/jnf-ui/',
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'jnf-ui基础组件文档',
    outline: 3,
    socialLinks: [],
    nav: [
      {
        text: '安装指南',
        link: '/components/',
      },
      { text: '基础组件', link: '/components/JnSelect/base.md' },
    ],
    sidebar: {
      '/components': [
        {
          text: '常用组件',
          items: [
            { text: 'jnf下拉选择组件', link: '/components/JnSelect/base.md' },
            { text: 'jnf详情组件', link: '/components/JnDetail/base.md' },
            { text: 'jnf按钮组件', link: '/components/JnButton/base.md' },
          ],
        },
        {
          text: '复杂组件',
          items: [
            {
              text: 'jnf条件查询组件',
              link: '/components/JnTableSearch/base.md',
            },
            { text: 'jnf表单组件', link: '/components/JnForm/base.md' },
            { text: 'jnf-table表格组件', link: '/components/JnTable/base.md' },
            {
              text: 'jnf-form-table表单中可编辑table组件',
              link: '/components/JnFormInTable/base.md',
            },
            { text: 'jn-file-upload文件上传组件', link: '/components/JnFileUpload/base.md' },
            { text: 'jn-toolbar表格自定义列组件', link: '/components/JnToolbar/base.md' },

          ],
        },
      ],
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
