<!--
 * @Description: 
 * @Author: wangChao 6141364@qq.com
 * @Date: 2025-01-09 11:24:43
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-09 11:55:55
 * @FilePath: \el2package-ui\packages\VersionTag\src\index.vue
 * Endless Story. - NANA
-->

<template>
  <span class="version">{{ version }}</span>
</template>

<script setup lang="ts">
  import PackageJson from '../../../package.json'
  defineProps({
    version: {
      type: String,
      default: PackageJson.version
    }
  })
</script>

<style lang="scss" scoped>
  .version {
    font-size: 12px;
    padding: 2px 10px;
    color: var(--vp-c-brand-1);
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 14px;
    position: relative;
    top: -3px;
  }
</style>
