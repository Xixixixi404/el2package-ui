<template>
  <el-descriptions
    class="jn_detail"
    size="small"
    v-bind="$attrs"
    :column="descColumn"
  >
    <el-descriptions-item
      v-for="(item, key) in descData"
      :key="key"
      :label="item.label"
      :span="item.span || 1"
      v-bind="$attrs"
    >
      <template v-if="item.slotName">
        <slot :name="item.slotName"></slot>
      </template>
      <span
        v-else
        class="tip_class"
      >
        <el-tooltip
          v-if="item.tooltip"
          v-bind="$attrs"
          :placement="item.placement || 'bottom'"
        >
          <span>
            <span v-if="item.filters && item.filters.list">
              {{
                constantEscape(
                  dataList[item.fieldName],
                  listTypeInfo[item.filters.list],
                  item.filters.key || 'value',
                  item.filters.label || 'label'
                )
              }}
            </span>
            <span v-else>{{ item.value }}</span>
            <el-icon
              :size="item.iconSize"
              :color="item.iconColor"
              style="cursor: pointer; margin-left: 2px; top: 1px"
            >
              <Warning />
            </el-icon>
          </span>
          <template
            v-if="item.tooltip"
            #content
          >
            <span v-if="typeof item.tooltip === 'string'">{{ item.tooltip }}</span>
            <template v-else-if="typeof item.tooltip === 'function'">
              <render-tooltip
                :render="item.tooltip"
                :item="item"
              />
            </template>
          </template>
        </el-tooltip>
        <span v-else>
          <span v-if="item.filters && item.filters.list">
            {{
              constantEscape(
                dataList[item.fieldName],
                listTypeInfo[item.filters.list],
                item.filters.key || 'value',
                item.filters.label || 'label'
              )
            }}
          </span>
          <span v-else>{{ item.value }}</span>
        </span>
      </span>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script lang="ts">
  export default {
    name: 'JnDetail'
  }
</script>
<script setup lang="ts">
  import RenderTooltip from './renderTooltip.vue'

  const props = withDefaults(
    defineProps<{
      descColumn: number
      dataList: any
      listTypeInfo: any
      descData: any[]
    }>(),
    {
      descColumn: 4,
      dataList: () => ({}),
      listTypeInfo: () => ({}),
      descData: () => []
    }
  )

  /**
   * 下拉数据回显中文过滤器
   * @param [String,Number] value 需要转中文的key值
   * @param {String} list  数据源
   * @param [String,Number] key  数据源的key字段（默认：value）
   * @param {String} label  数据源的label字段（默认：label）
   */
  const constantEscape = (value: any, list: any[], key: string | number, label: string | number) => {
    const res = list.find((item) => {
      return item[key] === value
    })
    return res && res[label]
  }
</script>
<style lang="scss">
  .jn_detail {
    :deep(.el-descriptions__label) {
      font-weight: bold;
      min-width: 65px;
    }
  }
</style>
