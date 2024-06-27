/*
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-10-09 15:48:22
 * @FilePath: \jnf-ui-master\packages\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Component, App } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn' // 因element-plus默认是英文，我们指定一下默认中文
import TLayoutPage from './layout-page'
import TLayoutPageItem from './layout-page-item'
import JnSelect from './JnSelect'
import JnDetail from './JnDetail'
import JnButton from './JnButton'
import JnForm from './JnForm'
import JnTableSearch from './JnTableSearch'
import JnTable from './JnTable'
import JnFormTable from './JnFormInTable'
import JnFileUpload from './JnFileUpload'
import JnToolbar from './JnToolbar'

// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  TLayoutPage,
  TLayoutPageItem,
  JnSelect,
  JnDetail,
  JnButton,
  JnForm,
  JnTableSearch,
  JnTable,
  JnFormTable,
  JnFileUpload,
  JnToolbar
}
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App) => {
  // components.forEach((comp: any) => {
  //   app.component(comp.name as string, comp)
  // })
  //   app.use(ElementPlus, {
  //     locale // 语言设置
  //   // size: Cookies.get('size') || 'medium' // 设置默认尺寸
  // })
  for (const key in components) {
    app.component(key, components[key])
  }
}
// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const install: any = (app: any, router?: any) => {
  // !router && installRouter(app);
  installComponents(app)
}

// 按需引入
export {
  TLayoutPage,
  TLayoutPageItem,
  JnSelect,
  JnDetail,
  JnButton,
  JnForm,
  JnTableSearch,
  JnTable,
  JnFormTable,
  JnFileUpload,
  JnToolbar
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
}
