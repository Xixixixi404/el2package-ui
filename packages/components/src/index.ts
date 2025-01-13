
import type { Component, App } from 'vue'
// import TLayoutPage from './layout-page'
// import TLayoutPageItem from './layout-page-item'
import El2Button from './Button'
// import El2Select from './Select'
// import El2TableSearch from './TableSearch'
// import El2Form from './Form'
// import El2Detail from './Detail'
// import El2Table from './Table'
// import El2FormInTable from './FormInTable'
// import El2Toolbar from './Toolbar'
// import VersionTag from './VersionTag' // 版本号内部文档使用

// 存储组件列表
const components: Component
 = [
  El2Button
 ]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export {
  El2Button
}

export default install
