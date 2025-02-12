import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
export default defineConfig({
  title: 'El2package-UI',
  head: [['link', { rel: 'icon', href: '/el2package-ui/favicon.ico' }]],
  description: '基于Element-plus基础组件二次封装',
  lang: 'cn-ZH',
  base: '/el2package-ui/',
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'El2package-UI',
    outline: {
      // 侧边栏配置
      level: [2, 6],
      label: 'CONTENTS'
    },
    socialLinks: [
      // 社交链接配置
      { icon: 'gitee', link: 'https://gitee.com/xiaoxi77/el2package-ui' },
      { icon: 'github', link: 'https://xixixixi404.github.io/el2package-ui/' }
    ],
    nav: [
      // 导航栏配置
      {
        text: '指南',
        link: '/guide/'
      },
      { text: '组件', link: '/components/Button/base.md' }
    ],
    sidebar: {
      '/guide': [{ text: '安装指南', items: [{ text: '快速开始', link: '/guide/' }] }],
      '/components': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/Button/base.md' },
            { text: 'Select 下拉选择', link: '/components/Select/base.md' }
          ]
        },
        {
          text: '复杂组件',
          items: [
            { text: 'Form 表单', link: '/components/Form/base.md' },
            {
              text: 'TableSearch 条件查询',
              link: '/components/TableSearch/base.md'
            },
            { text: 'Detail 详情', link: '/components/Detail/base.md' },
            { text: 'Table 表格', link: '/components/Table/base.md' },
            {
              text: 'FormInTable 可编辑表格',
              link: '/components/FormInTable/base.md'
            },
            // { text: 'jn-file-upload文件上传组件', link: '/components/JnFileUpload/base.md' },
            { text: 'Toolbar 表格自定义工具', link: '/components/Toolbar/base.md' }
          ]
        }
      ]
    }
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md)
  }
})
