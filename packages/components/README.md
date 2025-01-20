# el2package-ui

## 介绍

> 基于 vue3+ ts+ Element-plus 二次封装组件
> 这是我在学习 Vue3 中基于[Element-plus](https://element-plus.org/zh-CN/) 二次封装基础组件文档，希望对你有用。
> 预览 [组件案例文档](https://xixixixi404.github.io/el2package-ui/)

## 安装依赖

```bash
pnpm install
```

## 本地运行 组件文档

```bash
# 文档demo示例 基于 vue3 + vite 项目
pnpm run docs:dev
```

## 全局注册使用

```javascript
// main.js
import el2packageUi from 'el2package-ui'
import 'el2package-ui/es/style.css'
Vue.use(el2packageUi)
```

## 按需引入

```javascript
// main.js
import 'el2package-ui/es/style.css'

// 单个.vue文件引入
import { El2Detail, El2Form, ... } from 'el2package-ui'
```

## Volar 支持

```javascript
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  // ...
  "types": [
      "el2package-ui/global",
    ]
}

```
