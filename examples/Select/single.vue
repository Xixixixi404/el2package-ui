<template>
  <t-layout-page>
    <El2-select
      v-model="selectVlaue"
      placeholder="请选择"
      :optionSource="stepList"
      valueKey="label"
      width="200px"
      @change="selectChange"
    />
  </t-layout-page>
</template>
<script setup lang="ts" name="Single">
  import { ref } from 'vue'
  const selectVlaue = ref<any>()
  const stepList = [{ label: 'option1' }, { label: 'option2' }, { label: 'option3' }, { label: 'option4' }]
  const selectChange = (val: any) => {
    console.log('selectChange', val, selectVlaue.value)
  }
</script>
