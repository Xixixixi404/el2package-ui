<template>
  <t-layout-page>
    <t-layout-page-item>
      <!-- {{ formData }} -->
      <el2-form
        ref="detailForm"
        v-model="formData"
        class="baseForm"
        label-width="110px"
        :formOpts="formOptions"
        :disabled="false"
      >
        <template #list="{ formData }">
          <!-- TODO: 添加自定义row-key -->
          <el2-form-in-table
            :tableData="formData.list"
            ruleKey="list"
            row-key="id"
            :columns="tableOptions"
            border
            :disabled="false"
            :showPagination="false"
          >
            <!-- area1 -->
            <template #area1="{ itemData }">
              <!-- <div>{{ itemData }}</div> -->
              <!-- {{ itemData }}wqqe3111111111111111111312313 -->
              <el-input v-model="itemData.area1"></el-input>
            </template>
            <!-- v-model:paginationConfig="pageConfig" -->
            <!-- <template #actionArea="{ itemData }">
              <el-button link type="danger" size="small"
                >删除132123123</el-button
              >
            </template> -->
          </el2-form-in-table>
        </template>
      </el2-form>
      <el-button @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="submitForm"
      >
        提交
      </el-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  let detailForm = ref()
  const formData = ref({ area11: '212121', list: [{ area11: 'dd' }] })
  const changeSaleOrg = (e, row) => {
    console.log(e, row, 'eqeqwwq')
    row.saleCountry = '31312321'
    row.saleGroup = e
  }
  const sapOptions = ref([])
  const formOptions = ref({
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
        clearable: true,
        childType: 'option'
      },
      events: {
        change: ($event, val) => changeSaleOrg($event, val)
        // focus: ($event, row) => focus($event, row),
        // blur: ($event, row) => blur($event, row),
      },
      // dictType: 'customer_file_organization',
      children: sapOptions
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
        childType: 'option',
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
        childType: 'option',
        clearable: true,
        props: {
          label: 'name',
          value: 'name'
        }
      },
      children: []
    },
    list: {}
  })
  const tableOptions = ref([
    // { type: 'expand', label: '', slotName: 'expand' },
    { type: 'selection', label: '', reserveSelection: true },
    { type: 'index', label: '序号', width: '60', allSort: true },
    {
      prop: 'area',
      label: '装炉位置',
      required: true,
      columnConfig: {
        minWidth: '120'
      },
      configEdit: {
        type: 'select',
        rules: [
          {
            required: true,
            message: '装炉位置为必填项',
            trigger: 'blur'
          }
        ],
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
        ],
        events: {
          change: ($event, row, formData) => {
            console.log($event, row, formData, 'ppppp')
            row.area1 = '1212121'
            row.list = [{ label: '1', value: '1' }]
          }
        }
      }
    },
    {
      prop: 'area1',
      label: '装炉位置',
      columnConfig: {
        minWidth: '120'
      },
      configEdit: {
        type: 'input',
        attrs: {},
        rules: [
          {
            required: true,
            message: 'aaaaaa',
            trigger: 'blur'
          }
        ]
      },
      slotName: 'area1'
    },
    {
      prop: 'area2',
      label: '装炉位置',
      columnConfig: {
        minWidth: '120'
      },
      configEdit: {
        type: 'select',
        children: ({ row, formData }) => {
          console.log(formData)
          return row.list
        }
      }
    },
    {
      prop: 'area3',
      label: '装炉位置',
      columnConfig: {
        minWidth: '120'
      },
      configEdit: {
        type: 'radio-group'
        // children: [
        //   {
        //     label: '前纺一车间',
        //     value: 'W1',
        //   },
        //   {
        //     label: '前纺二车间',
        //     value: 'W2',
        //   },
        //   {
        //     label: '前纺三车间',
        //     value: 'W3',
        //   },
        // ],
      }
    },
    {
      prop: 'area4a',
      label: '装炉位置444',
      columnConfig: {
        minWidth: '120'
      },
      configEdit: {
        type: 'tree-select',
        attrs: {
          renderAfterExpand: false,
          // nodeKey: 'id',
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
    },
    {
      prop: 'area11',
      label: '装炉位wqwq置',
      columnConfig: {
        minWidth: '120',
        align: 'right'
      }
    },
    {
      prop: 'areaww2',
      label: '装炉位置',
      columnConfig: {
        minWidth: '120'
      },
      configEdit: {
        type: 'date-picker',
        attrs: {
          type: 'daterange'
        }
      }
    },
    {
      type: 'handle',
      label: '操作',
      columnConfig: {
        minWidth: '220',
        fixed: 'right'
      }
    }
  ])

  onMounted(() => {
    // detailForm?.value.initForm({
    //   schema: formOptions.value,
    //   formData: formData.value,
    // })
  })
  function handleClose() {
    detailForm.value.resetFields()
  }
  function submitForm() {
    let validate = detailForm.value.validate()
    validate((valid: boolean) => {
      if (valid) {
      }
    })
    let model = detailForm.value.getFormData()
    console.log(model, 'model')
  }
</script>
