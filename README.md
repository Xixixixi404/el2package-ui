<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: wangchao 6141364@qq.com
 * @LastEditTime: 2024-06-27 16:06:41
 * @FilePath: \el2package-ui\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# el2package-ui

## 介绍

> 基于 vue3+ ts+ Element-plus 二次封装组件

这是我在学习 Vue3 中基于[Element-plus](https://element-plus.org/zh-CN/) 二次封装基础组件文档，希望对你有用。可查看 [详细组件案例文档](https://yangzzyu.github.io/el2package-ui/) 预览

基于[jnf-ui](https://yangzzyu.github.io/jnf-ui/)二次开发

## npm 方式安装使用

```shell
npm i el2package-ui
```

### 全局注册使用

```js
// 在main.js中按下引入
import el2packageUi from 'el2package-ui'
import 'el2package-ui/lib/style.css'
Vue.use(el2packageUi)
```

### 按需引入

```js
// 在main.js中按下引入
import 'el2package-ui/lib/style.css'
// 单个.vue文件引入
;<script setup lang="ts">
  import {(JnDetail, el2packageorm)} from "el2package-ui"
</script>
```

### el2package-ui Volar 组件类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "el2package-ui/components.d.ts",
    ],
}

```

## 安装依赖

```shell
pnpm install

```

## 本地运行 vuepress 中组件文档

```shell
// docs项目(文档demo示例)基于vue3+vite项目
npm run docs:dev

```
