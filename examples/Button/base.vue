<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <div style="display: flex; align-items: center; margin-bottom: 10px">
        <div>试试防抖：</div>
        <el-input-number
          v-model="time"
          style="width: 240px"
          placeholder="请输入防抖时间（毫秒）"
          :min="1000"
          :max="10000"
          :controls="false"
          @change="handleChange"
        >
          <template #suffix>ms</template>
        </el-input-number>
      </div>

      <div class="button-demo">
        count： {{ count }}
        <el2-button
          :time="time"
          type="primary"
          round
          @click="clickFn"
        >
          Primary
        </el2-button>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
  const time = ref<number>(1000)

  const count = ref(0)

  const handleChange = (val) => {
    console.log('输入框的值：', val)
  }
  const clickFn = () => {
    count.value++
  }
</script>

<style lang="scss" scoped>
  .button-demo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
