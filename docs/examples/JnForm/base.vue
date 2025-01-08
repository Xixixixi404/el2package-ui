<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-19 11:45:27
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-08 13:52:07
 * @FilePath: \el2package-ui\docs\examples\JnForm\base.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page>
    <t-layout-page-item>
      <jn-button @click="open">打开</jn-button>
      <el-dialog
        v-model="dialogSelectEnt"
        :title="'212123'"
        width="70%"
        draggable
        @close="handleClose"
      >
        {{ formData }} formData

        <jn-form
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
        </jn-form>
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
  // saleDeptCode: '1212121', saleOrg: 'W1'

  async function open() {
    dialogSelectEnt.value = true
    await nextTick()
    formData.value = {
      telf1: '13234556676'
    }
    // detailForm?.value.initForm({
    //   formData: {
    //     saleDeptCode: 'ssssssssaaaaaassss',
    //     saleOrg: 'W1',
    //     orderNumber: 'gfhfhfghf',
    //   }
    // })
    // setTimeout(()=>{
    // // formData.value.saleDeptCode = 'ssssssssaaaaaassss'
    // formData.value = {
    //   saleDeptCode: 'ssssssssaaaaaassss',
    //   saleOrg: 'W1',
    //   orderNumber: 'gfhfhfghf',
    // }
    // },1000)
    // await nextTick()
    // setTimeout(() => {
    //   detailForm?.value.initForm({
    //     formData: formData.value,
    //   })
    // })
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
