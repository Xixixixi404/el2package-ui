<template>
  <t-layout-page>
    <t-layout-page-item>
      <el2-button @click="open">打开</el2-button>
      <el-dialog
        v-model="dialogSelectEnt"
        :title="'212123'"
        width="70%"
        draggable
        @close="handleClose"
      >
        {{ formData }} formData

        <el2-form
          ref="detailForm"
          v-model="formData"
          :formOpts="formOptions"
          :disabled="false"
        >
          <template #aaaa="{ scope }">
            <div>
              <el-button type="primary">Primary</el-button>
            </div>
          </template>
          <template #bbbb="{ scope }">
            <div><el-button type="primary">Primary</el-button></div>
          </template>
        </el2-form>
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >
          提交
        </el-button>
      </el-dialog>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  import { formOptions } from './config'
  const dialogSelectEnt = ref(false)
  let detailForm = ref()
  const formData = ref({})

  async function open() {
    dialogSelectEnt.value = true
    await nextTick()
    formData.value = {
      telf1: '13234556676'
    }
  }

  function handleClose() {
    console.log('9090909')
    detailForm.value.resetFields()
    dialogSelectEnt.value = false
  }
  function submitForm() {
    let validate = detailForm.value.validate()
    validate((valid: boolean) => {
      if (valid) {
      }
    })
  }
</script>

<style>
  .wqwqwqwq {
    display: flex;
  }
</style>
