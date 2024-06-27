<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-28 10:01:58
 * @FilePath: \jnf-ui-master\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# jnf-ui

## 介绍

> 基于 vue3+ ts+ Element-plus 二次封装组件

这是我在学习 Vue3 中基于[Element-plus](https://element-plus.org/zh-CN/) 二次封装基础组件文档，希望对你有用。可查看 [详细组件案例文档](https://yangzzyu.github.io/jnf-ui/) 预览

## npm 方式安装使用

```shell
npm i jnf-ui
```

### 全局注册使用

```js
// 在main.js中按下引入
import JnfUi from 'jnf-ui'
import 'jnf-ui/lib/style.css'
Vue.use(JnfUi)
```

### 按需引入

```js
// 在main.js中按下引入
import 'jnf-ui/lib/style.css'
// 单个.vue文件引入
;<script setup lang="ts">
  import {(JnDetail, JnForm)} from "jnf-ui"
</script>
```

### jnf-ui Volar 组件类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "jnf-ui/components.d.ts",
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
