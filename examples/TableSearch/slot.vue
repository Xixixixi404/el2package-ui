<template>
  <t-layout-page>
    <t-layout-page-item>
      <El2TableSearch
        :searchParamet="formOptions"
        :formData="searchValue"
        :time="0"
        customCol
        @search="search"
      >
        <template #paramsSlot>
          <El2Button
            type="primary"
            style="margin-bottom: 10px"
          >
            paramsSlot
          </El2Button>
        </template>
        <template #paramsSlotForItemSlot>
          <El2Button type="primary">paramsSlotForItemSlot</El2Button>
        </template>
      </El2TableSearch>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  const searchValue = ref({
    params1: '',
    params2: ''
  })

  const formOptions = ref({
    paramsSlot: {
      type: 'slot',
      slotName: 'paramsSlot',
      label: 'params slot'
    },
    paramsSlotForItem: {
      type: 'slot',
      slotName: 'paramsSlotForItemSlot',
      label: 'Slot For Item'
    },
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
    }
  })

  /**
   * 条件查询参数
   */
  function search(params) {
    console.log(params, '条件查询参数')
  }
</script>
