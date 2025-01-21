<template>
  <el-select
    v-model="childSelectedValue"
    popper-class="el2-select"
    :style="{ width: width || '100%' }"
    v-bind="{ clearable: true, filterable: true, ...$attrs }"
    :multiple="multiple"
  >
    <el-checkbox
      v-if="multiple"
      v-model="selectChecked"
      class="all_checkbox"
      @change="selectAll"
    >
      全选
    </el-checkbox>
    <el-option
      v-for="item in optionSource"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
  type Props = {
    modelValue?: string | number | Array<string | number>
    // 是否多选
    multiple?: boolean
    // 选择框宽度
    width?: string
    // 传入的option数组中，要作为最终选择项的键值key
    valueKey?: string
    // 传入的option数组中，要作为显示项的键值名称
    labelKey?: string
    // 下拉框组件数据源
    optionSource: any[]
  }
  const props = withDefaults(defineProps<Props>(), {
    labelKey: 'label',
    valueKey: 'value'
  })
  const emits = defineEmits(['update:modelValue'])

  let childSelectedValue: any = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      // console.log(777, val)
      emits('update:modelValue', val)
    }
  })

  // 设置全选
  const selectChecked = computed({
    get() {
      const _deval: any = props.modelValue
      return _deval?.length === props.optionSource.length
    },
    set(val: any) {
      return val?.length === props.optionSource.length
    }
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
<style lang="scss">
  .el2-select {
    .el-select-dropdown {
      .all_checkbox {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>
