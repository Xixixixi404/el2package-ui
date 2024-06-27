<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-20 15:33:17
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-20 15:36:15
 * @FilePath: \jnf-ui-master\docs\examples\JnButton\base.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <div style="display: flex; align-items: center">
        <div style="width: 140px; font-weight: 700">输入防抖时间：</div>
        <el-input-number
          style="width: 240px"
          v-model="time"
          placeholder="请输入防抖时间（毫秒）"
          :min="1000"
          :max="10000"
          :controls="false"
          @change="handleChange"
        />
      </div>
      <jn-button
        style="margin-top: 15px"
        color="#626aef"
        :time="time"
        @click="exportExcel"
        >导出</jn-button
      >
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const time = ref(1000)
const handleChange = (val) => {
  console.log('输入框的值：', val)
}
const exportExcel = () => {
  console.log('点击事件')
}
</script>
