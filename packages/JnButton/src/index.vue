<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-20 15:32:54
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-28 09:35:14
 * @FilePath: \jnf-ui-master\packages\JnButton\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-button v-bind="$attrs" @click="handleClick">
    <slot />
  </el-button>
</template>
<script lang="ts">
export default {
  name: 'JnButton',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  time: {
    type: Number,
    default: 1000,
  },
})
// 抛出事件
const emits = defineEmits(['click'])
const record = ref(0)
const handleClick = () => {
  let newTime = new Date()
  if (newTime.getTime() - record.value > props.time) {
    emits('click')
  }
  record.value = new Date().getTime()
}
</script>
