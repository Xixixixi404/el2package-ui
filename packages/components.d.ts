/*
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-10-09 15:48:59
 * @FilePath: \jnf-ui-master\packages\components.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import TLayoutPage from './layout-page/src/index.vue'
import TLayoutPageItem from './layout-page-item/src/index.vue'
import JnSelect from './JnSelect/src/index.vue'
import JnDetail from './JnDetail/src/index.vue'
import JnButton from './JnButton/src/index.vue'
import JnForm from './jnform/src/index.vue'
import JnTableSearch from './JnTableSearch/src/index.vue'
import JnTable from './JnTable/src/index.vue'
import JnFormTable from './JnFormInTable/src/index.vue'
import JnFileUpload from './JnFileUpload/src/index.vue'
import JnToolbar from './JnToolbar/src/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    TLayoutPage: typeof TLayoutPage
    TLayoutPageItem: typeof TLayoutPageItem
    JnSelect: typeof JnSelect
    JnDetail: typeof JnDetail
    JnButton: typeof JnButton
    JnForm: typeof JnForm
    JnTableSearch: typeof JnTableSearch
    JnTable: typeof JnTable
    JnFormTable: typeof JnFormTable
    JnFileUpload: typeof JnFileUpload
    JnToolbar: typeof JnToolbar
  }
}
