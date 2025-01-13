/*
 * @Description:
 * @Author: wangchao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-13 13:58:21
 * @FilePath: \el2package-ui-new\docs\.vitepress\theme\index.ts
 */
import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { VPDemo } from '../vitepress'

/**
 * @description: 引入组件库 并在全局注册
 */
import el2packageUi from '../../../packages/components/dist/es/index'
import '../../public/css/index.css'

// import '@vue-office/excel/lib/index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(el2packageUi)

    // TODO: 混入 vue-office 库， 暂时不需要
    // ctx.app.mixin({
    //   mounted() {
    //     import('@vue-office/docx').then(function (m) {
    //       console.log(m)
    //       // ctx.app.use(m.default)
    //     })
    //     import('@vue-office/pdf').then(function (m) {
    //       // ctx.app.use(m.default)
    //     })
    //     import('@vue-office/excel').then(function (m) {
    //       // ctx.app.use(m.default)
    //     })
    //   }
    // })

    ctx.app.component('Demo', VPDemo)
  }
}
