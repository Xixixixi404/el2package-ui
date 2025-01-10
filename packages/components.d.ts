/*
 * @Description: 导出组件声明文件
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-09 14:38:58
 * @FilePath: \el2package-ui\packages\components.d.ts
 * Endless Story. - NANA
 */

import TLayoutPage from './layout-page/src/index.vue'
import TLayoutPageItem from './layout-page-item/src/index.vue'
import El2Button from './Button/src/index.vue'
import El2Select from './Select/src/index.vue'
import El2TableSearch from './TableSearch/src/index.vue'
import El2Detail from './Detail/src/index.vue'
import El2Form from './Form/src/index.vue'
import El2Table from './Table/src/index.vue'
import El2FormTable from './FormInTable/src/index.vue'
import El2Toolbar from './Toolbar/src/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    TLayoutPage: typeof TLayoutPage
    TLayoutPageItem: typeof TLayoutPageItem
    El2Button: typeof El2Button
    El2Select: typeof El2Select
    El2TableSearch: typeof El2TableSearch
    El2Detail: typeof El2Detail
    El2Form: typeof El2Form
    El2Table: typeof El2Table
    El2FormTable: typeof El2FormTable
    El2Toolbar: typeof El2Toolbar
  }
}
