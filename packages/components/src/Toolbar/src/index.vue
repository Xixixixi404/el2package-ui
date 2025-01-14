<template>
  <div class="el2-toolbar">
    <el-popover
      placement="bottom"
      title="自定义列配置"
      :width="300"
      trigger="click"
    >
      <template #reference>
        <div
          class="menu-btn"
          :style="{ 'justify-content': position }"
        >
          <el-button
            circle
            icon="Menu"
          />
        </div>
      </template>

      <div class="columns-list">
        <draggable
          :list="_columnConfig"
          :sort="true"
          item-key="id"
          group="people"
          draggable=".columns-item"
          handle=".mover"
          ghost-class="ghost"
          @end="onEnd"
        >
          <template #item="{ element }">
            <div
              v-if="!element.type && element.slot !== 'action'"
              class="columns-item"
            >
              <div class="left">
                <div class="mover">
                  <el-icon size="18">
                    <Rank />
                  </el-icon>
                  <div style="width: 5px"></div>
                  <el-checkbox
                    :key="element.prop || element.type"
                    :checked="element.checked"
                    size="large"
                    @change="
                      (e) => {
                        changeCheckbox(e, element)
                      }
                    "
                  />
                </div>
                {{ element.label }}
              </div>
              <div class="right">
                <el-tooltip
                  effect="dark"
                  content="固定到左侧"
                  placement="top"
                >
                  <el-icon
                    :color="element.fixed == 'left' ? 'red' : ''"
                    size="18"
                    @click="handleFixed(element, 'left')"
                  >
                    <Back />
                  </el-icon>
                </el-tooltip>
                <div style="width: 20px"></div>
                <el-tooltip
                  effect="dark"
                  content="固定到右侧"
                  placement="top"
                >
                  <el-icon
                    :color="element.fixed == 'right' ? 'red' : ''"
                    size="18"
                    @click="handleFixed(element, 'right')"
                  >
                    <Right />
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div
        class="columns-footer"
        style="text-align: right; margin: 0"
      >
        <el-button
          size="small"
          type="primary"
          @click="setColumnConfig"
        >
          保存
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'

  const props = withDefaults(
    defineProps<{
      columnConfig: any[]
      cacheKey: string
      position?: 'flex-start' | 'center' | 'flex-end' | 'start' | 'end'
    }>(),
    {
      position: 'flex-end'
    }
  )

  const emits = defineEmits(['update:columnConfig', 'setTableColumnConfig'])

  const _columnConfig = computed(() => {
    return props.columnConfig
  })

  /**
   * @description: TODO: 处理保存的table列配置
   * @param {type} e:
   * @return {type}
   */
  const setColumnConfig = (e: any) => {
    console.log(e)
    const list =
      props?.columnConfig?.map((item: any) => {
        return item
      }) || []
    emits('setTableColumnConfig', list)
  }

  const onEnd = () => {
    emits('update:columnConfig', _columnConfig)
  }

  /** 勾选列 */
  const changeCheckbox = (e, item) => {
    item.checked = e
    emits('update:columnConfig', props.columnConfig)
  }
  /** 固定列 */
  const handleFixed = (item, type) => {
    if (item.fixed === type) {
      item.fixed = false
      return
    }
    item.fixed = type
  }
</script>

<style lang="scss">
  .el2-toolbar {
    position: relative;
    float: right;

    .menu-btn {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }

  .columns-list {
    max-height: 300px;
    overflow-y: auto;

    .columns-item {
      display: flex;
      justify-content: space-between;
      padding: 4px 16px 8px 0;

      .left {
        display: flex;
        align-items: center;

        .mover {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 5px;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .el-icon {
          cursor: pointer;
        }
      }
    }
  }

  .ghost {
    background: rgba(209, 224, 255, 0.3) !important;
  }

  .columns-footer {
    padding: 8px 0 0;
    border-top: 1px solid #f0f0f0;
  }
</style>
