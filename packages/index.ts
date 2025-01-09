/*
 * @Description: 注册组件
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-09 15:39:43
 * @FilePath: \el2package-ui\packages\index.ts
 * Endless Story. - NANA
 */

import type { Component, App } from 'vue'
import TLayoutPage from './layout-page'
import TLayoutPageItem from './layout-page-item'
import El2Button from './Button'
import El2Select from './Select'
import El2TableSearch from './TableSearch'

import JnDetail from './JnDetail'
import JnForm from './JnForm'
import JnTable from './JnTable'
import JnFormTable from './JnFormInTable'
import JnFileUpload from './JnFileUpload'
import JnToolbar from './JnToolbar'
import VersionTag from './VersionTag' // 版本号内部文档使用

// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  TLayoutPage,
  TLayoutPageItem,
  El2Button,
  El2Select,
  El2TableSearch,

  JnDetail,
  JnForm,
  JnTable,
  JnFormTable,
  JnFileUpload,
  JnToolbar,
  VersionTag
}
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App) => {
  // components.forEach((comp: any) => {
  //   app.component(comp.name as string, comp)
  // })
  //   app.use(ElementPlus, {
  //     locale // 语言设置
  //   // size: Cookies.get('size') || 'medium' // 设置默认尺寸
  // })
  for (const key in components) {
    app.component(key, components[key])
  }
}
// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const install: any = (app: any) => {
  installComponents(app)
}

// 按需引入
export {
  TLayoutPage,
  TLayoutPageItem,
  El2Button,
  El2Select,
  El2TableSearch,
  JnDetail,
  JnForm,
  JnTable,
  JnFormTable,
  JnFileUpload,
  JnToolbar,
  VersionTag
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
