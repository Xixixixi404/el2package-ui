<template>
  <t-layout-page>
    <t-layout-page-item>
      <El2TableSearch
        :searchParamet="formOptions"
        :rowsTotal="1"
        :formData="searchValue"
        :time="0"
        @search="search"
      ></El2TableSearch>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  const searchValue = ref({
    params1: '',
    params2: ''
  })

  const formOptions = ref({
    params1: {
      type: 'select',
      label: 'params one',
      placeholder: 'placeholder',
      children: [
        {
          label: 'label1',
          value: 'value1'
        },
        {
          label: 'label2',
          value: 'value2'
        },
        {
          label: 'label3',
          value: 'value3'
        }
      ]
    },
    params2: {
      type: 'input',
      label: 'params two',
      placeholder: 'placeholder'
    },
    params3: {
      type: 'input',
      label: 'params three',
      placeholder: 'placeholder'
    },
    params4: {
      type: 'input',
      label: 'params four',
      placeholder: 'placeholder'
    }
  })

  /**
   * 条件查询参数
   */
  function search(params) {
    console.log(params, '条件查询参数')
  }
</script>
