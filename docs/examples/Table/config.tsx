
// import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

// interface columnTypes {
//   id: string
//   name: string
//   province: string
//   area: string
//   county: string
//   amount: Number
// }
import { ref, onMounted } from 'vue'
const a = ref('')
// 表格列配置
export const columns1 = ref([
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
    width: 300,
    // slotName: "name",
    header: (val) => {
      return <el-input v-model={a.value}></el-input>
    }
  },
  {
    fit: false,
    prop: 'name1',
    label: '地址',
    header: (val) => {
      return <el-input v-model={a.value}></el-input>
    }
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
      return <el2-button type="primary">Primary</el2-button>
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
