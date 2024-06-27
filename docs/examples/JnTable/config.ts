/*
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-08-31 09:20:56
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-22 09:39:33
 * @FilePath: \zr_szhpt_web\src\views\test\config\tableConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
// 表格列配置
export const columns = ref([
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
