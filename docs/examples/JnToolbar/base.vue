<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-19 11:45:27
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-10-10 13:39:26
 * @FilePath: \jnf-ui-master\docs\examples\JnForm\base.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <el-row>
          <el-popovers placement="top" trigger="click">
            <div>
              <!-- el-checkbox-group 组件 -->
              <el-checkbox-group v-model="selectedColumns">
                <!-- 使用 v-for 渲染复选框 -->
                <draggable>
                  <transition-group>
                    <el-checkbox
                      class="check"
                      v-for="(item, index) in columns"
                      :label="item.prop"
                      :key="item.prop"
                    >
                      {{ item.label || '未命名列' }}
                    </el-checkbox>
                  </transition-group>
                </draggable>
              </el-checkbox-group>
            </div>
            <!-- 放置上述代码 -->
            <template #reference>
              <el-button class="m-2">Hover to activate</el-button>
            </template>
          </el-popovers>
        </el-row>
      </div>
      <jn-toolbar
        v-model:tableColumns="columns"
        cacheKey="placeOrder"
      ></jn-toolbar>
      <jn-table
        cacheKey="placeOrder"
        :tableData="tableData"
        :loading="loading"
        :columns="columns"
        v-model:paginationConfig="pageConfig"
        @changePage="initData"
        rowKey="id"
        stripe
        border
        max-height="500"
        @row-click="rowClick"
        ref="jnTableRef"
        @selection-change="selectionChange"
        :showPagination="false"
      >
        <template #expand="{ scope }">
          <el-row style="padding: 20px">
            <el-col>姓名：{{ scope.row.name }}</el-col>
            <el-col>金额：{{ scope.row.amount }}</el-col>
          </el-row>
        </template>
        <template #handler="{ scope }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handlerEdit(scope)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="handlerDelect(scope)"
            >删除</el-button
          >
        </template>
      </jn-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable'
import { reactive, ref, onMounted } from 'vue'
// import { columns } from './config'
console.log(draggable,'draggable')
const selectedColumns=ref([])
const columns = ref([
  { type: 'expand', label: '', slotName: 'expand' },
  { type: 'selection', label: '', reserveSelection: true },
  { type: 'index', label: '序号', width: '60', allSort: true },
  // 自定义索引
  {
    label: '排名',
    prop: 'ranking',
    type: 'index',
    width: 80,
    index: (index: number) => {
      return index * 3
    },
  },
  {
    prop: 'name',
    label: '名字',
    // filters: [
    //   { text: '李白2', value: '李白2' },
    //   { text: '李白4', value: '李白4' },
    // ],
    // 'filter-method': (
    //   value: string,
    //   row: columnTypes,
    //   column: TableColumnCtx<columnTypes>
    // ) => {
    //   const property = column['property']
    //   // @ts-ignore
    //   return row[property] === value
    // },
    fit: true,
    // slotName: "name",
    render: (val) => {
      return val

      //   <el-tag type="success">{ val }</el-tag>;
    },
  },
  {
    fit: false,
    prop: 'name',
    label: '地址',
    // children: [
    //     {
    //         label: '省份',
    //         prop: 'province',
    //         align: 'center'
    //     },
    //     {
    //         label: '城市',
    //         prop: 'city',
    //         align: 'center',
    //         children: [
    //             {
    //                 label: '区',
    //                 prop: 'area',
    //                 align: 'center',
    //             },
    //             {
    //                 label: '县',
    //                 prop: 'county',
    //                 align: 'center',
    //             }
    //         ]
    //     }
    // ]
  },
  {
    prop: 'address',
    label: '地址',
    fit: true,
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'address',
    label: '地址',
  },

  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'amount',
    label: '金额',
    // sortable: true,
    render: (val) => {
      return val
      // <jn-button type="primary">Primary</jn-button>
    },
  },
  {
    prop: 'handler',
    slotName: 'handler',
    label: '操作',
    align: 'center',
    showOverflowTooltip: true,
    fixed: 'right',
    minWidth: 220,
  },
])

const tableData = ref([])
const loading = ref(false)
let pageConfig = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  small: true,
  background: true,
})
const jnTableRef = ref<HTMLElement | null>(null) // 表格ref
// 编辑操作
function handlerEdit(row: any) {
  console.log(row)
}

// 删除操作
function handlerDelect(row: any) {
  pageConfig.value.pageNum = 1
  initData()
  console.log(row)
}

// 模拟数据
function fetchData() {
  let result = <any>[]
  for (let i = 0; i < 50; i++) {
    result.push({
      id: String(i),
      name: `李白21212121212121222222222222${i + 1}`,
      province: '广东',
      area: '深圳',
      county: '南山',
      amount: i * 100,
    })
  }
  return result
}

// 初始化数据
function initData() {
  loading.value = true
  setTimeout(() => {
    tableData.value = fetchData()
    // .slice(
    //   (pageConfig.value.pageNum - 1) * pageConfig.value.pageSize,
    //   pageConfig.value.pageNum * pageConfig.value.pageSize
    // )
    loading.value = false
  }, 1000)
}

onMounted(() => {
  pageConfig.value.total = fetchData().length
  initData()
})

// 行点击事件 测试事件绑定
function rowClick(row: any) {
  console.log(row)
}
// 多选赋值
function selectionChange(selection: any) {
  // state.selection = selection;
  console.log(selection, 'selecwqwqwqwq312321tion')
}
</script>
