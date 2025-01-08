import { ref } from 'vue'
const changeSaleOrg = (e, row) => {
  console.log(e, row, 'eqeqwwq')
  row.saleCountry = '31312321'
  row.saleGroup = e
}

export const formOptions = ref({
  title: {
    type: 'title',
    // hidden: true,
    label: '订单详细信息111',
    colSize: 24,
    attrs: {
      isShowExpand: true,
      className: 'wqwqwqwq'
    },
    slotName: 'aaaa'
  },
  orderNumber: {
    type: 'slot',
    label: '订单编号',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 12,
    attrs: {},
    slotName: 'bbbb'
  },
  telf1: {
    type: 'input',
    label: '联系人电话',
    placeholder: '请输入联系电话',
    required: true,
    rules: [
      {
        pattern: '/^[1][3,4,5,7,8][0-9]{9}$/',
        message: '手机号码格式不正确',
        trigger: ['blur']
      }
    ],
    attrs: {
      clearable: true,
      colProp: 12
    },
    events: {
      change: (a, b, c) => {
        c.orderNumber.colSize = 0
        debugger
      }
    }
  },
  customerType: {
    type: 'input',
    label: '客户类型',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {
      slot: {
        name: 'suffix',
        render: () => {
          return '123'
        }
      }
    }
  },
  salesDepartment: {
    type: 'input',
    label: '销售部门/销售组',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  documentCurrency: {
    type: 'input',
    label: '凭证货币',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  customerName: {
    type: 'input',
    label: '客户名称',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 12,
    attrs: {}
  },
  payer: {
    type: 'input',
    label: '付款方',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 12,
    attrs: {}
  },
  orderDate: {
    type: 'input',
    label: '订货日期',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  paymentTerms: {
    type: 'input',
    label: '付款条件',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  shippingTerms: {
    type: 'input',
    label: '装运条件',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  salesOrganization: {
    type: 'input',
    label: '销售组织',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  title2: {
    type: 'title',
    label: '订单配置信息',
    colSize: 24,
    attrs: {}
  },
  deliveryDate: {
    type: 'input',
    label: '请求交货日期',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  sapCustomerNumber: {
    type: 'input',
    label: 'SAP客户编号',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {
      filterable: true,
      remote: true,
      reservekeyword: true,
      clearable: true
    }
  },
  orderType: {
    type: 'input',
    label: '订单类型',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  priceMaintenanceType: {
    type: 'input',
    label: '价格维护类型',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  salesMode: {
    type: 'input',
    label: '销售模式',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  customerPurchaseOrderNumber: {
    type: 'input',
    label: '客户采购订单编号',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  endCustomer: {
    type: 'input',
    label: '终端客户',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 6,
    attrs: {}
  },
  deliveryParty: {
    type: 'input',
    label: '送达方',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 12,
    attrs: {}
  },
  orderText: {
    type: 'input',
    label: '订单文本',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 12,
    attrs: {}
  },
  billingParty: {
    type: 'input',
    label: '开票方',
    placeholder: '',
    required: true,
    rules: [],
    colSize: 12,
    attrs: {}
  },
  saleOrderTableData: {
    label: '',
    prop: 'saleOrderTableData'
  },
  title1: {
    type: 'title',
    label: '基础数据信息',
    colSize: 24,
    attrs: {
      isShowExpand: true
    }
  },
  saleOrg: {
    type: 'select',
    label: '销售组织',
    placeholder: '请输入销售组织',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      filterable: true,
      remote: true,
      reservekeyword: true,
      // remoteMethod: remoteMethod,
      clearable: true
      // valueKey: 'label',
    },
    events: {
      change: ($event, val) => changeSaleOrg($event, val)
      // focus: ($event, row) => focus($event, row),
      // blur: ($event, row) => blur($event, row),
    },
    // dictType: 'customer_file_organization',
    children: [
      {
        label: '前纺一车间',
        value: 'W1'
      },
      {
        label: '前纺二车间',
        value: 'W2'
      },
      {
        label: '前纺三车间',
        value: 'W3'
      }
    ]
  },
  saleDeptCode: {
    type: 'select',
    label: '销售部门代码',
    placeholder: '请输入销售部门代码',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true,

      props: {
        label: 'saleDeptCode',
        value: 'saleDeptCode'
      }
    },
    events: {
      change: null
    },
    children: []
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
        disabled: row.saleDeptCode == null || row.saleDeptCode == '' ? true : false
        // colProp: 24,
      }
    }
  },
  saleGroupCode: {
    type: 'select',
    label: '销售组代码',
    placeholder: '请输入销售组代码',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true,
      props: {
        label: 'saleGroupCode',
        value: 'saleGroupCode'
      }
    },
    events: {
      change: null
    },
    children: []
  },
  saleGroup: {
    type: 'input',
    label: '销售组描述',
    placeholder: '请输入销售组描述',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true
    }
  },
  saleCountry: {
    type: 'select',
    label: '行政区划',
    placeholder: '请输入行政区划',
    // required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
      props: {
        label: 'name',
        value: 'name'
      }
    },
    children: []
  },
  saleDeptCode1: {
    type: 'radio-group',
    label: '销售部门代码111',
    placeholder: '请输入销售部门代码',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true
      // props: {
      //   label: 'saleDeptCode',
      //   value: 'saleDeptCode',
      // },
    },
    events: {
      change: null
    },
    children: [
      {
        label: '前纺一车间1111',
        value: 'W1'
      },
      {
        label: '前纺二车间',
        value: 'W2'
      },
      {
        label: '前纺三车间',
        value: 'W3'
      }
    ]
  },
  saleDeptCode221: {
    type: 'checkbox-group',
    label: '销售部门',
    placeholder: '请输入销售部门代码',
    required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true
      // props: {
      //   label: 'saleDeptCode',
      //   value: 'saleDeptCode',
      // },
    },
    events: {
      change: null
    },
    children: [
      {
        label: '前纺一车间1111',
        value: 'W1'
      },
      {
        label: '前纺二车间',
        value: 'W2'
      },
      {
        label: '前纺三车间',
        value: 'W3'
      }
    ]
  },
  saleCountry22: {
    type: 'tree-select',
    label: '行政区划',
    placeholder: '请输入行政区划',
    // required: true,
    rules: [],
    colSize: 24,
    attrs: {
      clearable: true,
      data: [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        }
      ]
    }
  }
})
