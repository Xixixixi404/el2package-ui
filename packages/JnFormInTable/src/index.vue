<template>
  <!-- 数据表格 -->
  <el-table class="jn-form-table" ref="jnFormTableRef" :data="tableData" v-bind="$attrs" v-loading="loading">
    <!-- 递归渲染多级表头 -->
    <template v-for="column in columns" :key="column">
      <el-table-column v-if="['index', 'selection', 'expand'].includes(column.type)"
        :index="column.allSort ? typeIndex : undefined" v-bind="column">
        <template #default="scope">
          <RenderCol v-if="column.render" :column="column" :row="scope.row" :render="column.render"
            :index="scope.$index"></RenderCol>
        </template>
      </el-table-column>
      <!-- <MultistageColumn
        v-if="column.children && column.children.length"
        :key="column.prop"
        :column="column"
      ></MultistageColumn> -->
      <!-- :key="column.prop" -->
      <!-- v-else -->
      <el-table-column v-if="column?.type == 'handle'" label="操作" fixed="right" align="center"
        v-bind="column.columnConfig">
        <template #default="{ row, $index }">
          <slot name="actionArea" :item-data="row" :idx="$index">
            <el-button v-if="$index === tableData.length - 1" link type="primary" size="small"
              @click.prevent="add">新增</el-button>
            <el-button v-if="$index !== 0" link type="danger" size="small" @click.prevent="del(row)">删除</el-button>
          </slot>
        </template>
      </el-table-column>
      <el-table-column v-if="!['index', 'selection', 'expand', 'handle'].includes(column.type)"
        v-bind="{ ...column.columnConfig, ...$attrs, ...column }" show-overflow-tooltip>
        <!-- :index="column.allSort ? typeIndex : 'index'" -->
        <template #header>
          <i v-if="column.required && !props.disabled" style="color: #f56c6c">*</i>
          {{ column.label }}
        </template>
        <template #default="scope">
          <el-form-item label="" label-width="0" :prop="[ruleKey, scope.$index, column.prop]"
            :rules="column.configEdit?.rules" class="table-form-item">
            <!-- style="margin-top: 18px" -->
            <template v-if="column.slotName">
              <slot :name="column.slotName" :item-data="scope.row" :idx="scope.$index"
                :disabled="column?.configEdit?.attrs?.disabled"></slot>
            </template>
            <template v-else-if="column.render">
              <RenderCol :column="column" :row="scope.row" :render="column.render" :index="scope.$index"></RenderCol>
            </template>
            <!-- 单个单元格编辑 -->
            <template v-else-if="column?.hasOwnProperty('configEdit') && !column.slotName
    ">
              <single-edit-cell :configEdit="column.configEdit" v-model="scope.row![column.prop!]" :prop="column.prop"
                :scope="scope" :formData="formData" :disabled="disabled" v-bind="$attrs" ref="editCell">
                <slot v-if="column.configEdit && column.configEdit.editSlotName" :name="column.configEdit.editSlotName"
                  :scope="scope" />
              </single-edit-cell>
            </template>
            <div v-else-if="!column?.hasOwnProperty('configEdit') && !column.slotName
    " class="text" :class="column?.columnConfig?.align
    ? `is-${column.columnConfig.align}`
    : ''
    ">
              {{ scope.row[column.prop] }}
              <!-- <div>{{ scope.row[column.prop] }}</div> -->
            </div>
          </el-form-item></template>
      </el-table-column>
    </template>
  </el-table>

  <!-- 分页配置 -->
  <div class="pagination" :style="{ justifyContent: paginationFloat }" v-if="showPagination">
    <Pagination :pageConfig="_paginationConfig" @size-change="pageSizeChange" @current-change="currentPageChange">
    </Pagination>
  </div>
</template>
<script lang="ts" setup>
import {
  defineProps,
  computed,
  defineEmits,
  reactive,
  ref,
  PropType,
} from 'vue'
import RenderCol from './renderCol.vue'
// import MultistageColumn from './MultistageColumn.vue' // 递归多级表头组件
import Pagination from './Pagination.vue' // 分页组件
import SingleEditCell from './singleEditCell.vue'
// 定义组件接收的prop属性
const props = defineProps({
  // 表格源数据
  tableData: {
    type: Array,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => { },
  },
  /**
   * 是否禁用该表单
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  ruleKey: {
    type: String,
    default: '',
  },
  //   表格配置项
  tableConfig: {
    type: Object,
    default: () => { },
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
  isShowAdd: {
    type: Boolean,
    default: true,
  },
  //   是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 分页配置
  paginationConfig: {
    type: Object,
    default: () => { },
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
const jnFormTableRef = ref() // 表格ref
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
    ((_paginationConfig.value?.pageNum || 1) - 1) *
    (_paginationConfig.value?.pageSize || 10) +
    1
  return tabIndex
}
function add() {
  props.tableData.push({})
}
function del(val) {
  const index = props.tableData.indexOf(val)
  if (index !== -1) {
    props.tableData.splice(index, 1)
  }
}
// 将table组件的全部方法暴露出去
defineExpose({
  element: jnFormTableRef,
})
</script>
<style scoped>
.pagination {
  text-align: right;
  margin: 10px 0;
  display: flex;
  width: 100%;
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

          &>span {
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
<style lang="scss">
.jn-form-table {
  .el-form-item {
    padding: 0 !important;
    margin: 0 !important;

    .el-form-item__error {
      position: static;
    }
  }

  .el-input,
  .el-cascader,
  .el-select,
  .el-input-number,
  .el-date-editor {
    width: 100% !important;
  }

  .text {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: pre-line;
  }

  .is-center {
    margin: auto;
  }

  .is-right {
    margin-left: auto;
  }
}
</style>
