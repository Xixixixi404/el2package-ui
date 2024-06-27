<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-28 09:45:45
 * @FilePath: \jnf-ui-master\docs\examples\JnSelect\single.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page>
    <jn-select
      placeholder="请选择工序"
      v-model="selectVlaue"
      :optionSource="stepList"
      valueKey="label"
      @change="selectChange"
      width="200px"
    />
  </t-layout-page>
</template>
<script setup lang="ts" name="Single">
import { ref } from 'vue'
const selectVlaue = ref<any>()
const stepList = [
  { label: '开始' },
  { label: 'POSUI' },
  { label: '11' },
  { label: 'GX123' },
  { label: '烘干破碎' },
  { label: '车间仓库' },
  { label: 'ui3333' },
  { label: 'hhh333' },
]
const selectChange = (val: any) => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>
