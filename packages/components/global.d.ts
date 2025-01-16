/*
 * @Description: 导出组件声明文件
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-16 11:28:44
 * @FilePath: \el2package-ui-new\packages\components\global.d.ts
 * Endless Story. - NANA
 */
declare module 'vue' {
  export interface GlobalComponents {
    TLayoutPage: (typeof import('El2package-ui'))['TLayoutPage']
    TLayoutPageItem: (typeof import('El2package-ui'))['TLayoutPageItem']
    El2Button: (typeof import('El2package-ui'))['El2Button']
    El2Select: (typeof import('El2package-ui'))['El2Select']
    El2TableSearch: (typeof import('El2package-ui'))['El2TableSearch']
    El2Form: (typeof import('El2package-ui'))['El2Form']
    El2Detail: (typeof import('El2package-ui'))['El2Detail']
    El2Table: (typeof import('El2package-ui'))['El2Table']
    El2FormInTable: (typeof import('El2package-ui'))['El2FormInTable']
    // TODO: toolbar重构
    // El2Toolbar: typeof import('./es/Toolbar/src/index.vue')
  }
}

export {}
