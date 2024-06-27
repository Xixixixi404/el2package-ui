<!--
 * @Description: Tangod 弹窗
 * @Author: 
 * @Date: 
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2024-01-05 09:31:38
 * @FilePath: /zr_szhpt_web/src/views/Tangod/components/dialog.vue
 * 
-->
<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="80%"
    :before-close="handleClose"
  >
    <vue-office-pdf
      v-if="fileType == 'pdf'"
      :src="previewUrl"
      @rendered="renderedHandler"
      @error="errorHandler"
    />
    <vue-office-docx
      v-if="fileType == 'docx'"
      :src="previewUrl"
      style="height: 100vh"
      @rendered="renderedHandler"
    />
    <vue-office-excel
      v-if="fileType == 'xlsx'"
      :src="previewUrl"
      style="height: 60vh"
      @rendered="renderedHandler"
      @error="errorHandler"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import { ref, nextTick, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
const previewUrl = ref('')
function renderedHandler() {
  console.log('渲染完成')
}
function errorHandler() {
  console.log('渲染失败')
}
const fileType = ref('')
let dialogVisible = ref(false)
const formDisabled = ref(false)
let title = ref('新增')

/** 数据回显 */
const open = async (fileUrl, tit) => {
  formDisabled.value = tit == '详情' ? true : false
  title.value = tit
  dialogVisible.value = true
  await nextTick()
  fileType.value = fileUrl.split('.')?.at(-1)
  previewUrl.value = 'http://192.168.9.11:100' + fileUrl
}

// 关闭弹窗
const handleClose = () => {
  dialogVisible.value = false
}

defineExpose({
  open,
})
</script>
<style lang="scss"></style>
