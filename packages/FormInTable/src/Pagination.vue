
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
