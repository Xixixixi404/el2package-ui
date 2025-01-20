<template>
  <div
    ref="subListRef"
    class="subList"
  >
    <el2-form
      ref="searchFormRef"
      v-model="searchValue"
      isSearch
      :rowsTotal="props.rowsTotal"
      :formOpts="props.searchParamet"
      :customCol="props.customCol"
      v-bind="$attrs"
    >
      <template
        v-for="item in searchParamet"
        :key="item.prop"
        #[item.slotName]
      >
        <slot :name="item.slotName"></slot>
      </template>
      <template #searchAction="scope">
        <el2-button
          :time="time"
          type="primary"
          icon="Search"
          @click="handleSearch(scope.model)"
        >
          查询
        </el2-button>
        <el2-button
          :time="time"
          icon="Refresh"
          @click="resetSearchForm"
        >
          重置
        </el2-button>
        <el2-button
          v-if="!scope.isShowExpand"
          :time="time"
          style="margin-left: 0"
          type="primary"
          link
          @click="changeExpand"
        >
          <el-icon>
            <ArrowDown v-if="!subListOpenFlag" />
            <ArrowUp v-else />
          </el-icon>
          {{ !subListOpenFlag ? '展开' : '收起' }}
        </el2-button>
      </template>
    </el2-form>
  </div>
</template>

<script setup lang="ts">
  let props = withDefaults(
    defineProps<{
      rowsTotal?: number // 控制搜索栏默认展开行数
      searchParamet: any // 搜索参数配置
      formData: any // 绑定的数据
      customCol?: boolean // 是否使用用户配置的 col 为 true 时将使用配置中的 colSize 属性配置。
      time?: number // 防抖时间
    }>(),
    {
      rowsTotal: 999999,
      searchParamet: {},
      formData: {},
      customCol: false,
      time: 1000
    }
  )

  const $emit = defineEmits([
    /**
     * 搜索
     * @arg {object} params - {current?: number}
     */
    'search',
    'update:formData',
    'reset'
  ])
  const searchValue = ref(props.formData || {})
  const searchFormRef = ref()
  const subListOpenFlag = ref(false)
  const subListRef = ref()
  const changeExpand = () => {
    subListOpenFlag.value = !subListOpenFlag.value
    searchFormRef.value.calculateShowCol(subListOpenFlag.value)
  }

  const resetSearchForm = () => {
    searchFormRef.value.resetFields()
    $emit('reset')
    $emit('search', {
      current: 1
    })
  }

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

    $emit('search', { ...trimmedParams })
  }

  // 暴露重置方法
  defineExpose({
    resetSearchForm,
    resetSearchFormParams
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
