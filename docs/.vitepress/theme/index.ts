/*
 * @Description:
 * @Author: wangchao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangchao 6141364@qq.com
 * @LastEditTime: 2024-06-27 15:49:45
 * @FilePath: \el2package-ui\docs\.vitepress\theme\index.ts
 */
import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { VPDemo } from '../vitepress'
// 基于element-plus二次封装基础组件
import TuiPlus from '../../../packages'
import '../../public/css/index.css'

import '@vue-office/excel/lib/index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(TuiPlus)
    ctx.app.mixin({
      mounted() {
        import('@vue-office/docx').then(function (m) {
          // ctx.app.use(m.default)
        })
        import('@vue-office/pdf').then(function (m) {
          // ctx.app.use(m.default)
        })
        import('@vue-office/excel').then(function (m) {
          // ctx.app.use(m.default)
        })
      },
    })

    ctx.app.component('Demo', VPDemo)
  },
}
