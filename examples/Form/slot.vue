<template>
  <t-layout-page>
    <t-layout-page-item>
      <el2-form
        ref="detailForm"
        v-model="formData"
        :formOpts="formOptions"
        :disabled="false"
      >
        <template #titleSlot>
          <div>
            <el-button type="primary">titleSlot</el-button>
          </div>
        </template>
        <template #inputSlot>
          <div><el-button type="primary">inputSlot</el-button></div>
        </template>
      </el2-form>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  const checkPhone = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('Phone number is a required field'))
    } else {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('The phone number is illegal'))
      }
    }
  }

  const formOptions = ref({
    title: {
      type: 'title',
      label: 'title',
      colSize: 24,
      attrs: {
        isShowExpand: true,
        className: 'wqwqwqwq'
      },
      slotName: 'titleSlot'
    },
    inputDom: {
      type: 'slot',
      label: 'inputSlot',
      placeholder: 'placeholder',
      required: true,
      rules: [],
      colSize: 12,
      attrs: {},
      slotName: 'inputSlot'
    },
    phoneNumber: {
      type: 'input',
      label: 'phoneNumber',
      placeholder: 'placeholder',
      required: true,
      rules: [
        {
          validator: checkPhone,
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
        }
      }
    },
    suffixSlot: {
      type: 'input',
      label: 'suffixSlot',
      placeholder: '--placeholder',
      colSize: 24,
      attrs: {
        slot: {
          name: 'suffix',
          render: () => {
            return 'prefix'
          }
        }
      }
    },
    suffixSlot1: {
      type: 'input',
      label: 'suffixSlot1',
      placeholder: 'placeholder',
      colSize: 24,
      attrs: {
        slot: {
          name: 'suffix',
          render: () => {
            return 'prefix'
          }
        }
      }
    },
    titleOther: {
      type: 'title',
      label: 'Other title',
      colSize: 24,
      attrs: {
        isShowExpand: false
      }
    },
    select: {
      type: 'select',
      label: 'select',
      placeholder: 'placeholder',
      attrs: {
        filterable: true,
        remote: true,
        reservekeyword: true,
        clearable: true
      },
      events: {
        change: ($event, val) => changeSaleOrg($event, val)
      },
      children: [
        {
          label: 'label one',
          value: 'one'
        },
        {
          label: 'label two',
          value: 'two'
        },
        {
          label: 'label three',
          value: 'three'
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
  let detailForm = ref()
  const formData = ref({})

  const changeSaleOrg = (e, row) => {
    console.log(e, row, 'eqeqwwq')
    row.saleCountry = '31312321'
    row.saleGroup = e
  }

  setTimeout(() => {
    formData.value = {
      telf1: '13234556676'
    }
  }, 1000)
</script>

<style>
  .wqwqwqwq {
    display: flex;
  }
</style>
