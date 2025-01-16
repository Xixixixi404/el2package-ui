import type { Component, App } from 'vue'
import TLayoutPage from './layout-page'
import TLayoutPageItem from './layout-page-item'
import El2Button from './Button'
import El2Select from './Select'
import El2TableSearch from './TableSearch'
import El2Form from './Form'
import El2Detail from './Detail'
import El2Table from './Table'
import El2FormInTable from './FormInTable'
import El2Toolbar from './Toolbar'
// import VersionTag from './VersionTag' // 版本号内部文档使用

// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  TLayoutPage,
  TLayoutPageItem,
  El2Button,
  El2Select,
  El2TableSearch,
  El2Form,
  El2Detail,
  El2Table,
  El2FormInTable,
  El2Toolbar
  // VersionTag
}

const install = (Vue: App) => {
  for (const key in components) {
    Vue.component(key, components[key])
  }
}

export {
  TLayoutPage,
  TLayoutPageItem,
  El2Button,
  El2Select,
  El2TableSearch,
  El2Form,
  El2Detail,
  El2Table,
  El2FormInTable,
  El2Toolbar
  // VersionTag
}

export default install
