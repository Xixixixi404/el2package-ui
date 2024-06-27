<template>
  <div class="subList" ref="subListRef">
    <jn-form
      ref="searchFormRef"
      isSearch
      :rowsTotal="props.rowsTotal"
      :formOpts="props.searchParamet"
      v-model="searchValue"
    >
      <!-- v-model="formData" -->
      <!-- :inline="true" -->
      <template #searchAction="scope">
        <jn-button
          type="primary"
          icon="Search"
          @click="handleSearch(scope.model)"
          >查询</jn-button
        >
        <jn-button icon="Refresh" @click="resetSearchForm">重置</jn-button>
        <jn-button
          type="primary"
          v-if="!scope.isShowExpand"
          link
          @click="changeExpand"
        >
          <el-icon>
            <ArrowDown v-if="!subListOpenFlag" />
            <ArrowUp v-else />
          </el-icon>
          {{ !subListOpenFlag ? '展开' : '收起' }}</jn-button
        >
      </template>
    </jn-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

let props = defineProps({
  // modelValue: {
  //   type: Object,
  //   default: () => {},
  // },
  rowsTotal: {
    type: Number,
    default: 999999,
  },
  searchParamet: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
})
const $emit = defineEmits([
  /**
   * 搜索
   * @arg {object} params - {current?: number}
   */
  'search',
  'update:formData',
])
const searchValue = ref(props.formData || {})
// interface SubListItem {
//   id: number;
//   name: string;
// }
const searchFormRef = ref()

const subListHeight = ref<String>('')
const subListOpenFlag = ref(false)
const showSubListBtnFlag = ref(false)
const subListRef = ref()
const changeExpand = () => {
  subListOpenFlag.value = !subListOpenFlag.value
  searchFormRef.value.calculateShowCol(subListOpenFlag.value)
}

/** 重置 */
const resetSearchForm = () => {
  searchFormRef.value.resetFields()
  // $emit('update:formData', {})
  $emit('search', {
    current: 1,
  })
}
onMounted(() => {
  // searchFormRef?.value.initForm({
  //   formData: props.formData,
  // })
})

// 单纯重置表单
const resetSearchFormParams = () => {
  searchFormRef.value.resetFields()
}

const handleSearch = (params) => {
  // console.log('params :>> ', params)
  // 在这里对搜索参数进行处理，去除左右空格
  const trimmedParams = { ...params }
  for (const key in trimmedParams) {
    if (typeof trimmedParams[key] === 'string') {
      trimmedParams[key] = trimmedParams[key].trim()
    }
    if (Array.isArray(trimmedParams[key]) && !trimmedParams[key].length) {
      delete trimmedParams[key]
    }
  }

  $emit('search', { ...trimmedParams, current: 1 })
}
// 暴露重置方法
defineExpose({
  resetSearchForm,
  resetSearchFormParams,
})
</script>
<style lang="scss" scoped>
$mainColor: #5864ff;

.search-btn {
  margin-left: 10px;
}

.btn {
  font-size: 14px;
  color: $mainColor;
  position: absolute;
  right: 0px;
  bottom: 2px;
  background-color: #fff;
  padding-left: 60px;
  padding-right: 10px;

  &:hover {
    color: orange;
  }
}

.subList {
  // background-color: #f5f6fa;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  // overflow: hidden;

  li {
    margin: 15px;
    white-space: nowrap;

    &:hover {
      color: $mainColor;
    }
  }

  .active {
    color: $mainColor;
  }

  .btn {
    background-color: #f5f6fa;
    position: absolute;
    right: -20px;
    bottom: -5px;
    padding: 0px 20px;
    cursor: pointer;
    list-style-type: none;

    &:hover {
      color: orange;
    }
  }
}
</style>
