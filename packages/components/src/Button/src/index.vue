<template>
  <el-button
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts" name="El2Button">
  const props = withDefaults(
    defineProps<{
      time?: number
    }>(),
    { time: 1000 }
  )

  // 抛出事件
  const emits = defineEmits(['click'])
  const record = ref(0)
  const handleClick = () => {
    let newTime = new Date()
    if (newTime.getTime() - record.value > props.time) {
      emits('click')
    }
    record.value = new Date().getTime()
  }
</script>
