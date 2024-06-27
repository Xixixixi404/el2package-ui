import { ref, onMounted } from 'vue'
const changeSaleOrg = (e, row) => {
  console.log(e, row, 'eqeqwwq')
  row.saleCountry = '31312321'
  row.saleGroup = e
}
export const formOptions = ref({
  title: {
    type: 'title',
    label: '基础数据信息',
    colSize: 24,
    attrs: {},
  },
  saleOrg: {
    type: 'select',
    label: '销售组织',
    placeholder: '请输入销售组织',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
    },
    events: {
      change: ($event, val) => changeSaleOrg($event, val),
      // focus: ($event, row) => focus($event, row),
      // blur: ($event, row) => blur($event, row),
    },
    // dictType: 'customer_file_organization',
    children: [
      {
        label: '前纺一车间',
        value: 'W1',
      },
      {
        label: '前纺二车间',
        value: 'W2',
      },
      {
        label: '前纺三车间',
        value: 'W3',
      },
    ],
  },
  saleDeptCode: {
    type: 'select',
    label: '销售部门代码',
    placeholder: '请输入销售部门代码',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true,
      props: {
        label: 'saleDeptCode',
        value: 'saleDeptCode',
      },
    },
    events: {
      change: null,
    },
    children: [],
  },
  saleDept: {
    type: 'input',
    label: '销售部门描述',
    placeholder: '请输入销售部门描述',
    required: true,
    rules: [],
    colSize: 24,
    attrs: (row) => {
      return {
        disabled:
          row.saleDeptCode == null || row.saleDeptCode == '' ? true : false,
        // colProp: 24,
      }
    },
  },
  saleGroupCode: {
    type: 'select',
    label: '销售组代码',
    placeholder: '请输入销售组代码',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true,
      props: {
        label: 'saleGroupCode',
        value: 'saleGroupCode',
      },
    },
    events: {
      change: null,
    },
    children: [],
  },
  saleGroup: {
    type: 'input',
    label: '销售组描述',
    placeholder: '请输入销售组描述',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
    },
  },
  saleCountry: {
    type: 'select',
    label: '行政区划',
    placeholder: '请输入行政区划',
    // required: true,
    rules: [],
    colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
      props: {
        label: 'name',
        value: 'name',
      },
    },
    children: [],
  },
})
