<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-08-31 10:37:12
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-22 10:49:56
 * @FilePath: \zr_szhpt_web\src\views\test\MultistageColumn.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 此处加上v-bind="column"，会有警告，原因暂不明 -->
  <el-table-column :label="column.label" :prop="column.label" v-bind="column">
    <template v-for="item in column.children">
      <MultistageColumn
        v-if="item.children && item.children.length"
        :key="item.prop"
        :column="item"
      ></MultistageColumn>
      <el-table-column
        v-else
        :key="item.id"
        v-bind="item"
        show-overflow-tooltip
      >
        <template v-if="item.slotName" v-slot="scope">
          <slot :name="item.slotName" :data="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>
<script lang="ts">
// import LbRender from "./lb-render.vue";
// export default defineComponent({
//   name: "MultistageColumn",
// });
export default {
  name: 'MultistageColumn',
}
</script>
<script lang="ts" setup>
import { defineProps, defineComponent } from "vue";
// 定义组件接收的prop属性
const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
});
</script>
