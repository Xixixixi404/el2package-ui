<template>
  <!-- :style="style" -->
  <div class="jn-toolbar">
    <el-row>
      <el-popover placement="bottom" title="自定义列配置" :width="300" trigger="click">
        <template #reference>
          <el-button circle icon="Menu" class="menu-btn" />
        </template>
        <div class="columns-list">
          <draggable v-model="columnConfigs" group="people" :sort="true" @start="onStart" @end="onEnd" item-key="id"
            draggable=".columns-item" handle=".mover" ghost-class="ghost">
            <template #item="{ element, index }">
              <div v-if="!element.type && element.slot !== 'action'" class="columns-item">
                <div class="left">
                  <div class="mover">
                    <el-icon size="18">
                      <Rank />
                    </el-icon>
                    <div style="width: 5px"></div>
                    <el-checkbox :checked="element.checked" :key="element.prop || element.type" size="large" @change="(e) => {
        changeCheckbox(e, element)
      }
        " />
                    <!-- <el-checkbox :label="element.prop" size="large">{{
                          element.label || '未命名列'
                        }}</el-checkbox> -->
                  </div>
                  {{ element.label }}
                </div>
                <div class="right">
                  <el-tooltip effect="dark" content="固定到左侧" placement="top">
                    <el-icon :color="element.fixed == 'left' ? 'red' : ''" size="18"
                      @click="handleFixed(element, 'left')">
                      <Back />
                    </el-icon>
                  </el-tooltip>
                  <div style="width: 20px"></div>
                  <el-tooltip effect="dark" content="固定到右侧" placement="top">
                    <el-icon :color="element.fixed == 'right' ? 'red' : ''" size="18"
                      @click="handleFixed(element, 'right')">
                      <Right />
                    </el-icon>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <!-- </el-checkbox-group> -->
        <div class="columns-footer" style="text-align: right; margin: 0">
          <!-- <el-button size="small" @click="visible = false">重置</el-button> -->
          <el-button size="small" type="primary" @click="setColumnConfig">保存</el-button>
        </div>
      </el-popover>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  ref,
  onMounted,
  watch,
  computed,
  defineExpose,
  nextTick,
} from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import draggable from 'vuedraggable'
const props = defineProps({
  columnConfig: {
    type: Array as PropType<any[]>,
    default: () => <any>[],
  },
  search: {
    type: Boolean,
    default: true,
  },
  gutter: {
    type: Number,
    default: 10,
  },
  /**
   * 当一个页面出现多个Table时 作为唯一键
   */
  cacheKey: {
    type: String,
    default: '',
    required: true,
  },
})

const columnConfigs = ref(props.columnConfig || [])
/** 保存数据 */
const setColumnConfig = (e) => {
  const list =
    props?.columnConfig?.map((item: any) => {
      if (item.fixed) {
        return {
          label: item.label,
          prop: item.prop,
          type: item.type,
          fixed: item.fixed,
          checked: item.checked,
        }
      } else {
        return {
          label: item.label,
          prop: item.prop,
          checked: item.checked,
          type: item.type,
        }
      }
    }) || []
  emits('setTableColumnConfig', list)
}
const emits = defineEmits(['setTableColumnConfig', 'update:columnConfig'])

// const style = computed(() => {
//   const ret = {}
//   if (props.gutter) {
//     ret.marginRight = `${props.gutter / 2}px`
//   }
//   return ret
// })

const onStart = (list) => { }
const onEnd = () => {
  emits('update:columnConfig', columnConfigs.value)
}

/** 勾选列 */
const changeCheckbox = (e, item) => {
  item.checked = e
  emits('update:columnConfig', columnConfigs.value)
}
/** 固定列 */
const handleFixed = (item, type) => {
  if (item.fixed === type) {
    item.fixed = false
    return
  }
  item.fixed = type
  // props?.columnConfig.forEach((i:any) => {
  //   // if (item.prop === type) {
  //   //   item.fixed = "";
  //   //   return;
  //   // } else
  //   if (item.prop === i.prop) {
  //     item.fixed = type
  //   }
  // })
}
emits('update:columnConfig', columnConfigs.value)
</script>

<style lang="scss">
.jn-toolbar {
  position: relative;
  float: right;

  .menu-btn {
    position: absolute;
    top: -40px;
    right: 0;
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

// :deep(.el-transfer__button) {
//   border-radius: 50%;
//   display: block;
//   margin-left: 0px;
// }
// :deep(.el-transfer__button:first-child) {
//   margin-bottom: 10px;
// }

// .my-el-transfer {
//   text-align: center;
// }</style>
