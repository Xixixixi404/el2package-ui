<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-28 09:44:00
 * @FilePath: \jnf-ui-master\packages\JnSelect\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-select
    popper-class="jn_select"
    v-model="childSelectedValue"
    :style="{ width: width || '100%' }"
    v-bind="{ clearable: true, filterable: true, ...$attrs }"
    :multiple="multiple"
  >
    <el-checkbox v-if="multiple" v-model="selectChecked" @change="selectAll" class="all_checkbox">全选</el-checkbox>
    <el-option
      v-for="(item, index) in optionSource"
      :key="index + 'i'"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
export default {
  name: 'JnSelect',
}
</script>
<script setup lang="ts">
import { computed, watch, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 选择框宽度
  width: {
    type: String,
  },
  // 传入的option数组中，要作为最终选择项的键值key
  valueKey: {
    type: String,
    default: 'key',
  },
  // 传入的option数组中，要作为显示项的键值名称
  labelKey: {
    type: String,
    default: 'label',
  },
  // 下拉框组件数据源
  optionSource: {
    type: Array as unknown as any[],
    default: () => [],
  },
})
// 抛出事件
const emits = defineEmits(['update:modelValue'])
// vue3 v-model简写
let childSelectedValue: any = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // console.log(777, val)
    emits('update:modelValue', val)
  },
})
// 设置全选
const selectChecked = computed({
  get() {
    const _deval: any = props.modelValue
    return _deval?.length === props.optionSource.length
  },
  set(val: any) {
    return val?.length === props.optionSource.length
  },
})
// 点击全选
const selectAll = (val: any) => {
  const options = JSON.parse(JSON.stringify(props.optionSource))
  if (val) {
    const selectedAllValue = options.map((item) => {
      return item[props.valueKey]
    })
    emits('update:modelValue', selectedAllValue)
  } else {
    emits('update:modelValue', null)
  }
}
</script>
<style lang="scss" scoped>
.jn_select {
  .el-select-dropdown {
    .all_checkbox {
      margin-left: 20px;
    }
  }
}
</style>
