/*
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-19 10:11:13
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-20 14:40:51
 * @FilePath: \jnf-ui-master\packages\jnform\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Form from './src/index.vue'
import { withInstall } from '../withInstall'

const JnForm = withInstall(Form)
export default JnForm
