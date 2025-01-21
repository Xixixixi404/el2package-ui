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
  const formOptions = ref({
    inputForm: {
      type: 'input',
      label: 'params one',
      placeholder: 'placeholder',
      required: true,
      attrs: {
        clearable: true,
        colProp: 12
      }
    },
    params: {
      type: 'input-number',
      label: 'params two',
      placeholder: 'placeholder',
      colSize: 24,
      attrs: {
        controls: false,
        slot: {
          name: 'suffix',
          render: () => {
            return '123'
          }
        }
      }
    }
  })
  let detailForm = ref()
  const formData = ref({})
</script>

<style>
  .wqwqwqwq {
    display: flex;
  }
</style>
