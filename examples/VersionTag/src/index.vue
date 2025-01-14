<template>
  <span class="version">{{ version }}</span>
</template>

<script setup lang="ts">
  // import PackageJson from '../../../package.json'
  defineProps({
    version: {
      type: String,
      default: 0
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
