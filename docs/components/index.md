<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-27 14:08:34
 * @FilePath: \jnf-ui-master\docs\components\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### 快速上手

::: tip 提示

jnf-ui 基于 vue3 + ts + Element-plus 再次封装的基础组件

:::

### 安装

```bash:no-line-numbers
npm install jnf-ui -S
&
pnpm add jnf-ui -S
```


### 使用

```js
// main.ts
import JnfUi from 'jnf-ui'
import 'jnf-ui/lib/style.css'
const app = createApp(App)
app.use(JnfUi)
app.mount('#app')
```

### jnf-ui组件 Volar 类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "jnf-ui/components.d.ts",
    ],
}

```
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
```
### vue2基础组件
> 基于 vue2 + Element-ui 和 ant-design-vue 二次封装的基础组件
******
<!-- #### [Vue2 基础组件文档地址](https://wocwin.github.io/t-ui/) -->
******
<!-- #### [Vue2 基础组件码云地址](https://gitee.com/wocwin/t-ui) -->
******
<!-- #### [Vue2 基础组件GitHub地址](https://github.com/wocwin/t-ui) -->

