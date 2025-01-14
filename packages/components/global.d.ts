/*
 * @Description: 导出组件声明文件
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-14 16:02:45
 * @FilePath: \el2package-ui-new\packages\components\global.d.ts
 * Endless Story. - NANA
 */
declare module 'vue' {
  export interface GlobalComponents {
    TLayoutPage: typeof import('./es/layout-page/src/index.vue')
    TLayoutPageItem: typeof import('./es/layout-page-item/src/index.vue')
    El2Button: typeof import('./es/Button/src/index.vue')
    El2Select: typeof import('./es/Select/src/index.vue')
    El2TableSearch: typeof import('./es/TableSearch/src/index.vue')
    El2Detail: typeof import('./es/Detail/src/index.vue')
    El2Form: typeof import('./es/Form/src/index.vue')
    El2Table: typeof import('./es/Table/src/index.vue')
    El2FormTable: typeof import('./es/FormInTable/src/index.vue')
    // TODO: toolbar重构
    // El2Toolbar: typeof import('./es/Toolbar/src/index.vue')
  }
}
