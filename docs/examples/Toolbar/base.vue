<template>
  <t-layout-page>
    <t-layout-page-item>
      <el2-table
        ref="jnTableRef"
        v-model:paginationConfig="pageConfig"
        cacheKey="placeOrder"
        :tableData="tableData"
        :loading="loading"
        :columns="columns"
        rowKey="id"
        stripe
        border
        max-height="500"
        :showPagination="false"
        @changePage="initData"
        @row-click="rowClick"
        @selection-change="selectionChange"
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
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            size="small"
            @click="handlerDelect(scope)"
          >
            删除
          </el-button>
        </template>
      </el2-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  const columns = ref([
    { type: 'expand', label: '', slotName: 'expand' },
    { type: 'selection', label: '', reserveSelection: true },
    { type: 'index', label: '序号', width: '160', allSort: true },
    // 自定义索引
    // {
    //   label: '排名',
    //   prop: 'ranking',
    //   type: 'index',
    //   width: 80,
    //   index: (index: number) => {
    //     return index * 3
    //   }
    // },
    {
      prop: 'name',
      label: '名字',
      fit: true,
      width: 50,
      // slotName: "name",
      render: (val) => {
        return val
      }
    },
    {
      fit: true,
      prop: 'name',
      label: '地址1'
    },
    {
      prop: 'amount',
      label: '金额555',
      render: (val) => {
        return val
      }
    },
    {
      prop: 'handler',
      slotName: 'handler',
      label: '操作',
      align: 'center',
      showOverflowTooltip: true,
      fixed: 'right',
      minWidth: 220
    }
  ])

  const tableData = ref<any[]>([])
  const loading = ref(false)
  let pageConfig = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    small: true,
    background: true
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
    return [
      {
        id: 1,
        name: '李白21212121212121222222222222',
        province: '广东',
        area: '深圳',
        county: '南山',
        amount: 1111
      }
    ]
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
