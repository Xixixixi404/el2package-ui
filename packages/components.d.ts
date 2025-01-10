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

import JnDetail from './Detail/src/index.vue'
import JnForm from './Form/src/index.vue'
import JnTable from './Table/src/index.vue'
import JnFormTable from './JnFormInTable/src/index.vue'
import JnFileUpload from './JnFileUpload/src/index.vue'
import JnToolbar from './JnToolbar/src/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    TLayoutPage: typeof TLayoutPage
    TLayoutPageItem: typeof TLayoutPageItem
    El2Button: typeof El2Button
    El2Select: typeof El2Select
    El2TableSearch: typeof El2TableSearch

    JnDetail: typeof JnDetail
    JnForm: typeof JnForm
    JnTable: typeof JnTable
    JnFormTable: typeof JnFormTable
    JnFileUpload: typeof JnFileUpload
    JnToolbar: typeof JnToolbar
  }
}
