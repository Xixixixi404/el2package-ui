<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-20 15:33:17
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-28 10:49:51
 * @FilePath: \jnf-ui-master\docs\examples\JnButton\base.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <jn-file-upload
        :disabled="false"
        :isShowTip="true"
        uploadTitle="上传资料"
        :fileType="fileTypesArray"
        :headers="headers"
        v-model:modelValue="fileList"
      ></jn-file-upload>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const headers = ref({ Authorization: 'Bearer ' })
const fileTypesArray: Array<string> = [
  'pdf',
  'xls',
  'xlsx',
  'doc',
  'docx',
  'jpg',
  'png',
  'rar',
  'zip',
  '7z',
]
const fileList = ref([{}])
</script>
