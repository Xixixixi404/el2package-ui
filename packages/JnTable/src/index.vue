<template>
  <jn-toolbar
    v-if="showToolbar"
    v-model:columnConfig="columnConfig"
    :cacheKey="cacheKey"
    @setTableColumnConfig="setTableColumnConfig"
  ></jn-toolbar>
  <!-- 数据表格 -->
  <el-table
    class="jn-table"
    ref="jnTableRef"
    :data="tableData"
    v-bind="$attrs"
    v-loading="loading"
  >
    <!-- 递归渲染多级表头 -->
    <template v-for="(column, index) in tableColumn" :key="index">
      <MultistageColumn
        v-if="column.children && column.children.length"
        :key="column.prop"
        :column="column"
      ></MultistageColumn>
      <!-- :key="column.prop" -->
      <el-table-column
        v-else
        v-bind="column"
        show-overflow-tooltip
        :index="column.allSort ? typeIndex : undefined"
      >
        <template v-if="column.slotName" v-slot="scope">
          <slot :name="column.slotName" :scope="scope"></slot>
        </template>
        <template v-if="column.render" v-slot="scope">
          <RenderCol
            :column="column"
            :row="scope.row"
            :render="column.render"
            :index="scope.$index"
          ></RenderCol>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <!-- 分页配置 -->
  <div
    class="pagination"
    :style="{ justifyContent: paginationFloat }"
    v-if="showPagination"
  >
    <Pagination
      :pageConfig="_paginationConfig"
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
    ></Pagination>
  </div>
</template>
<!-- <script lang="ts">
export default {
  name: 'jn-table', //这个⾮常重要，就是未来你放到其他项⽬中，组件标签的名字，⽐如：<vue3-xmw-table></vue3-xmw-table>
}
</script> -->
<script lang="ts" setup>
import {
  defineProps,
  computed,
  defineEmits,
  reactive,
  ref,
  watch,
  PropType,
} from 'vue'
import RenderCol from './renderCol.vue'
import MultistageColumn from './MultistageColumn.vue' // 递归多级表头组件
import Pagination from './Pagination.vue' // 分页组件
// 定义组件接收的prop属性
const props = defineProps({
  // 表格源数据
  tableData: {
    type: Array,
    default: () => [],
  },
  //   表格配置项
  tableConfig: {
    type: Object,
    default: () => {},
  },
  //   表格列配置
  columns: {
    type: Array as PropType<any[]>,
    default: () => <any>[],
  },
  //   加载loading
  loading: {
    type: Boolean,
    default: false,
  },
  //   是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 分页配置
  paginationConfig: {
    type: Object,
    default: () => {},
  },
  /**
   * 当一个页面出现多个Table时 作为唯一键
   */
  cacheKey: {
    type: String,
    default: '',
    // required: true,
  },
  /**
   * 是否显示自定义列配置
   */
  showToolbar: {
    type: Boolean,
    default: true,
  },
  /**
   * 分页居左/居右
   */
  paginationFloat: {
    type: String,
    default: 'end',
  },
})

const emit = defineEmits(['update:paginationConfig', 'changePage']) // 声明emit

// const jnTableRef = ref<HTMLElement | null>(null) // 表格ref
const jnTableRef = ref(null) // 表格ref

const generateStorageKey = (cacheKey) =>
  location.pathname +
  location.hash +
  `?table-column${cacheKey ? '-' + cacheKey : ''}`

const tableColumnConfig = computed(() =>
  JSON.parse(localStorage['tableColumnConfig'] || JSON.stringify({}))
)
/** 保存table配置项 */
function setTableColumnConfig(value) {
  tableColumnConfig.value[generateStorageKey(props.cacheKey)] = value
  localStorage['tableColumnConfig'] = JSON.stringify(tableColumnConfig.value)
}
/** 获取table配置项 */
function getTableColumnConfig(cacheKey, columns) {
  return (
    tableColumnConfig.value[generateStorageKey(cacheKey)] ||
    columns.map((obj) => {
      obj.checked = true
      return obj
    })
  )
}
/** 所有列 */
const columnConfig = ref(
  getTableColumnConfig(props.cacheKey, props.columns) || []
)
/** 获取表格列 */
const tableColumn = computed(() => {
  const flag = tableColumnConfig.value[generateStorageKey(props.cacheKey)]
  const resultArr = flag
    ? columnConfig.value.map((item2: any) => {
        const matchingItem1 = props?.columns?.find((item1: any) => {
          if (item2.prop) {
            return item1.prop === item2.prop
          } else if (item2.type) {
            return item1.type === item2.type
          }
        })
        if (matchingItem1) {
          if (matchingItem1.type) {
            return matchingItem1 // 直接复用整个对象
          } else {
            return {
              ...item2, // 复用属性
              ...matchingItem1,
              fixed: matchingItem1.fixed, // 保持 arr1 中的 fixed 不变
              checked: item2.checked,
            }
          }
        } else {
          return item2
        }
      })
    : columnConfig.value
  return resultArr.filter((obj) => obj.checked !== false)
})

watch(
  () => columnConfig.value,
  (val) => {
    columnConfig.value = val
  },
  { deep: true }
)

// 合并分页配置
const _paginationConfig = computed(() => {
  const config = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
    layout: 'total, sizes, prev, pager, next, jumper',
  }
  return {
    pageNum: props.paginationConfig?.pageNum,
    ...config,
    ...props.paginationConfig,
    currentPage: props.paginationConfig?.pageNum,
  }
})
// 切换分页
function pageSizeChange(pageSize: number) {
  const obj = {
    ...props.paginationConfig,
    pageNum: 1,
    pageSize,
  }
  emit('update:paginationConfig', obj)
  emit('changePage')
}
function currentPageChange(pageIndex: number) {
  const obj = {
    ...props.paginationConfig,
    pageNum: pageIndex,
  }
  emit('update:paginationConfig', obj)
  emit('changePage')
}

// 自定义排序
function typeIndex(index: number) {
  const tabIndex =
    index +
    (_paginationConfig.value.pageNum - 1) * _paginationConfig.value.pageSize +
    1
  return tabIndex
}

// 将table组件的全部方法暴露出去
defineExpose({ element: jnTableRef })
</script>
<style scoped>
.pagination {
  text-align: right;
  margin: 10px 0;
  display: flex;
}
</style>
<style lang="scss" scoped>
.jn-table {
  z-index: 0;
  background-color: var(--el-bg-color);
  :deep(.el-table__header-wrapper) {
    .el-table__header {
      margin: 0;
      overflow: unset;
    }
  }
  :deep(.el-table__body-wrapper) {
    .el-table__body {
      margin: 0;
      overflow: unset;
      // th,
      // td {
      //   border: none !important;
      // }
    }
  }
  tr {
    border: none;
  }

  :deep(.el-pagination) {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    // margin-right: 60px;
    margin-right: calc(2% - 20px);
    background-color: var(--el-bg-color);
  }
  // ttable过长省略号
  .el-table {
    .el-tooltip {
      div {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
  // 某行隐藏复选框/单选框
  .el-table {
    .el-table__row {
      :deep(.table_column_hidden) {
        .cell {
          .el-radio__input,
          .el-checkbox__input {
            display: none;
          }

          & > span {
            display: none;
          }
        }
      }
    }
  }

  .el-table th,
  .el-table td {
    padding: 8px 0;
  }

  .el-table--border th:first-child .cell,
  .el-table--border td:first-child .cell {
    padding-left: 5px;
  }

  .el-table .cell {
    padding: 0 5px;
  }

  .el-table--scrollable-y .el-table__fixed-right {
    right: 8px !important;
  }

  .header_wrap {
    display: flex;
    align-items: center;

    .toolbar_top {
      flex: 0 70%;
      display: flex;
      padding: 10px 0;
      align-items: center;
      justify-content: flex-end;

      .toolbar {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }

      .el-button--small {
        height: 32px;
      }

      .el-button--success {
        background-color: #355db4;
        border: 1px solid #355db4;
      }
    }

    .header_title {
      display: flex;
      align-items: center;
      flex: 0 30%;
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
      color: var(--el-text-color-primary);
    }
  }

  .marginBttom {
    margin-bottom: -8px;
  }

  // 单选样式
  .radioStyle {
    :deep(.el-radio) {
      .el-radio__label {
        display: none;
      }

      &:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
        box-shadow: none;
      }
    }

    :deep(tbody) {
      .el-table__row {
        cursor: pointer;
      }
    }
  }

  // 复制功能样式
  .cursor {
    :deep(tbody) {
      .el-table__row {
        cursor: pointer;
      }
    }
  }
  // 行拖动
  .row_sort {
    :deep(tbody) {
      .el-table__row {
        cursor: move;
      }
    }
  }

  // 每行高度设置
  .el-table {
    .el-table__body {
      .el-table__row {
        :deep(.el-table__cell) {
          padding: 8px 0;

          .cell {
            min-height: 32px;
            line-height: 32px;
            // display: flex;
            // align-items: center;
            // justify-content: center;
          }
        }
      }
    }
  }
  // treeTable样式
  .tree_style {
    :deep(.el-table__body-wrapper) {
      .el-table__body {
        .cell {
          display: flex;
          align-items: center;
          .el-table__expand-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .operator {
    // 操作样式
    .operator_btn {
      .el-button {
        margin: 0;
        margin-right: 10px;
      }
    }
  }

  // 页面缓存时，表格内操作栏每行高度撑满
  :deep(.el-table__fixed-right) {
    height: 100% !important;
  }

  // 选中行样式
  .highlightCurrentRow {
    :deep(.current-row) {
      color: var(--el-color-primary);
      cursor: pointer;
      background-color: #355db4 !important;
    }
  }

  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-x: auto;
  }

  .handle_wrap {
    position: sticky;
    z-index: 10;
    right: 0;
    bottom: -8px;
    margin: 0 -8px -8px;
    padding: 12px 16px;
    background-color: var(--el-bg-color);
    border-top: 1px solid #ebeef5;
    text-align: right;

    .el-btn {
      margin-left: 8px;
    }
  }
}
</style>
