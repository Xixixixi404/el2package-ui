<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-19 11:45:27
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-10 09:48:14
 * @FilePath: \el2package-ui\docs\examples\Table\base.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page>
    <t-layout-page-item>
      <div style="height: 20px"></div>
      <!-- <el2-table></el2-table> -->
      <el2-table
        :tableData="tableData"
        :loading="loading"
        :columns="columns1"
        v-model:paginationConfig="pageConfig"
        @changePage="initData"
        rowKey="id"
        stripe
        border
        @row-click="rowClick"
        ref="jnTableRef"
        @selection-change="selectionChange"
        cacheKey="tabssss"
      >
        <!-- :showPagination="false" -->
        <!-- max-height="500" -->
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
  import { reactive, ref, onMounted } from 'vue'
  import { columns1 } from './config.jsx'
  console.log(columns1, 'columns1')

  const columns = ref([
    { type: 'expand', label: '', slotName: 'expand' },
    { type: 'selection', label: '', reserveSelection: true },
    { type: 'index', label: '序号', width: '60', allSort: true },
    // 自定义索引
    {
      label: '排名',
      prop: 'ranking',
      // type: 'index',
      width: 80,
      index: (index: number) => {
        return index * 3
      }
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
      }
    },
    {
      fit: false,
      prop: 'name1',
      label: '地址0'
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
      prop: 'address1',
      label: '地址1',
      fit: true
    },
    {
      prop: 'address2',
      label: '地址2'
    },
    {
      prop: 'address3',
      label: '地址3'
    },

    {
      prop: 'address4',
      label: '地址4'
    },
    {
      prop: 'address5',
      label: '地址5'
    },
    {
      prop: 'address6',
      label: '地址6'
    },
    {
      prop: 'amount',
      label: '金额',
      // sortable: true,
      render: (val) => {
        return val
        // <el2-button type="primary">Primary</el2-button>
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

  // 动态更新列
  // setTimeout(() => {
  //   columns1.value = [
  //     {
  //       prop: 'address6',
  //       label: '地址6',
  //     },
  //     {
  //       prop: 'amount',
  //       label: '金额',
  //       // sortable: true,
  //       render: (val) => {
  //         return val
  //         // <el2-button type="primary">Primary</el2-button>
  //       },
  //     },
  //     {
  //       prop: 'handler',
  //       slotName: 'handler',
  //       label: '操作',
  //       align: 'center',
  //       showOverflowTooltip: true,
  //       fixed: 'right',
  //       minWidth: 220,
  //     },
  //   ]
  // }, 1000)

  const tableData = ref([])
  const loading = ref(false)
  let pageConfig = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    size: 'small',
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
    let result = <any>[]
    for (let i = 0; i < 50; i++) {
      result.push({
        id: String(i),
        name: `李白21212121212121222222222222${i + 1}`,
        province: '广东',
        area: '深圳',
        county: '南山',
        amount: i * 100
      })
    }
    return result
  }

  // 初始化数据
  function initData() {
    loading.value = true
    setTimeout(() => {
      tableData.value = fetchData().slice(
        (pageConfig.value.pageNum - 1) * pageConfig.value.pageSize,
        pageConfig.value.pageNum * pageConfig.value.pageSize
      )
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
