<!--
 * @Description: 
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-09 15:22:20
 * @FilePath: \el2package-ui\docs\examples\Button\base.vue
 * Endless Story. - NANA
-->
<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <div style="display: flex; align-items: center">
        <div style="font-weight: 700">试试防抖时间：</div>
        <el-input-number
          v-model="time"
          style="width: 240px"
          placeholder="请输入防抖时间（毫秒）"
          :min="1000"
          :max="10000"
          :controls="false"
          @change="handleChange"
        />
      </div>
      <el2-button
        style="margin-top: 15px"
        :time="time"
        type="primary"
        round
        @click="clickFn"
      >
        Primary
      </el2-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const time = ref(1000)
  const handleChange = (val) => {
    console.log('输入框的值：', val)
  }
  const clickFn = () => {
    console.log('点击事件')
  }
</script>
