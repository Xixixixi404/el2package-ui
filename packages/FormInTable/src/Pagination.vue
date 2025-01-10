<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-21 15:22:59
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-22 10:52:43
 * @FilePath: \jnf-ui-master\packages\JnTable\src\Pagination.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-pagination v-bind="pageConfig"></el-pagination>
</template>
<script lang="ts">
export default {
  name: 'Pagination',
}
</script>
<script lang="ts" setup>
import { defineProps } from "vue";
// 定义组件接收的prop属性
const props = defineProps({
    pageConfig: {
        type: Object,
        default: () => ({})
    }
})
</script>