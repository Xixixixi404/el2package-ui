# 安装

## 兼容性 <VersionTag/>

El2package-UI 是基于 Element Plus <VersionTag :version="version"/> 二次封装而来。 <br>

so: 目前 El2package-UI 兼容性和 Element Plus 的兼容性保持一致。详情可见：[Element Plus 指南](https://element-plus.org/zh-CN/guide/installation.html 'Element Plus 指南')

::: tip Tips

由于 Vue 3 不再支持 IE11，El2package-UI 也不再支持 IE 浏览器。

:::

## 使用包管理器

建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装 El2package-UI，然后您就可以使用打包工具，例如 Vite 或 webpack。

# 选择一个你喜欢的包管理器

::: code-group

```bash:no-line-numbers[npm]
npm install el2package-ui -S
```

```bash:no-line-numbers[pnpm]
pnpm add el2package-ui -S
```

:::

## 使用

### 完整引入​

如果你对打包后的文件大小不是很在乎，使用完整导入将会更方便。

```TypeScript
// main.ts
import el2package-ui from 'el2package-ui'
import 'el2package-ui/lib/style.css'

const app = createApp(App)
app.use(el2package-ui)
app.mount('#app')
```

### Volar 支持

如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```TypeScript
// tsconfig.json

compilerOptions：{
  "types": [
    ...
    "el2package-ui/components.d.ts",
    ...
  ],
}

```

<!--
### docs文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.ts        # 全局变量定义
|  │  └─ plugins.ts       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ vp-demo          # VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.ts         # 暴露VPDemo组件
│  └─ config.ts           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件（支持tsx）
``` -->

<script setup>
  import { version } from 'element-plus'
</script>
