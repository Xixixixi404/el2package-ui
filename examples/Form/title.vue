<template>
  <t-layout-page>
    <t-layout-page-item>
      <el2-form
        ref="detailForm"
        v-model="formData"
        :formOpts="formOptions"
        :disabled="false"
      >
        <template #aaaa>
          <div>
            <el-button type="primary">primary</el-button>
          </div>
        </template>
        <template #bbbb>
          <div><el-button type="primary">Primary</el-button></div>
        </template>
      </el2-form>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  let detailForm = ref()
  const formData = ref({})

  const formOptions = ref({
    title: {
      type: 'title',
      label: 'this is title',
      colSize: 24,
      attrs: {
        isShowExpand: true,
        className: 'wqwqwqwq'
      }
    },
    phoneNumber: {
      type: 'input',
      label: 'phoneNumber',
      placeholder: 'phoneNumber',
      required: true,
      attrs: {
        clearable: true,
        colProp: 12
      },
      events: {
        change: (a, b, c) => {
          c.orderNumber.colSize = 0
        }
      }
    },
    customerType: {
      type: 'input',
      label: '客户类型',
      placeholder: '',
      required: true,
      rules: [],
      colSize: 24,
      attrs: {
        slot: {
          name: 'suffix',
          render: () => {
            return '123'
          }
        }
      }
    },
    title1: {
      type: 'title',
      label: 'This is ohter title',
      colSize: 24,
      attrs: {
        isShowExpand: false
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
        multiple: true,
        filterable: true,
        remote: true,
        reservekeyword: true,
        // remoteMethod: remoteMethod,
        clearable: true
        // valueKey: 'id'
      },
      events: {
        change: ($event, val) => changeSaleOrg($event, val)
      },
      children: [
        {
          label: '前纺一车间',
          value: 1
        },
        {
          label: '前纺二车间',
          value: 2
        },
        {
          label: '前纺三车间',
          value: 3
        }
      ]
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
        }
      }
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

  const changeSaleOrg = (e, row) => {
    console.log(e, row, 'eqeqwwq')
    row.saleCountry = '31312321'
    row.saleGroup = e
  }

  setTimeout(() => {
    formData.value = {
      telf1: '13812345678'
    }
  }, 1000)
</script>

<style>
  .wqwqwqwq {
    display: flex;
  }
</style>
