<!--
 * @Description:
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-09 15:19:27
 * @FilePath: \el2package-ui\docs\components\Button\base.md
 * Endless Story. - NANA
-->

# Button 按钮组件(内置防抖)

:::tip tips
继承el-button所有属性 <br/>新增 `time` 属性（多少时间内点击；默认 1 秒）
:::

### 基础用法

:::demo
Button/base
:::

### Attributes

继承 el-button所有属性

| 参数 | 说明     | 类型   | 默认值(ms) |
| :--- | :------- | :----- | :--------- |
| time | 防抖时间 | number | 1000       |
