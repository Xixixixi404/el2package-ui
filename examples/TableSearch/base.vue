<template>
  <t-layout-page>
    <t-layout-page-item>
      <el2-table-search
        label-width="120px"
        :searchParamet="formOptions"
        :rowsTotal="1"
        :customCol="true"
        :formData="searchValue"
        @search="search"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  const changeSaleOrg = (e, row) => {
    console.log(e, row, 'eqeqwwq')
    row.saleCountry = '31312321'
    row.saleGroup = e
  }

  const searchValue = ref({
    saleGroup: '13213232',
    saleCountry: '31312321',
    saleDept: '11',
    saleDeptCode: '111'
  })

  const formOptions = ref({
    saleOrg: {
      type: 'select',
      label: '销售组织111',
      placeholder: '请输入销售组织',
      required: true,
      rules: [],
      colSize: 12,
      attrs: {
        clearable: true,
        multiple: true
      },
      events: {
        change: ($event, val) => changeSaleOrg($event, val)
      },
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
    saleDept: {
      type: 'input',
      label: '销售部门描述',
      placeholder: '请输入销售部门描述',
      rules: [],
      // colSize: 24,
      attrs: (row) => {
        return {
          disabled: row.saleDeptCode == null || row.saleDeptCode == '' ? true : false
        }
      },
      events: {
        input: ($event, val) => changeSaleOrg($event, val)
      }
    },
    saleGroup: {
      type: 'input',
      label: '销售组描述',
      placeholder: '请输入销售组描述',
      rules: [],
      attrs: {
        clearable: true
      }
    }
  })

  /**
   * 条件查询参数
   */
  function search(params) {
    console.log(params, '条件查询参数')
  }
</script>
