<template>
    <div class="top-right-btn" :style="style">
      <el-row>
        <!-- <el-tooltip
          class="item"
          effect="dark"
          :content="showSearch ? '隐藏搜索' : '显示搜索'"
          placement="top"
          v-if="search"
        >
          <el-button circle icon="Search" @click="toggleSearch()" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button circle icon="Refresh" @click="refresh()" />
        </el-tooltip> -->
        <el-tooltip
          class="item"
          effect="dark"
          content="显隐列"
          placement="top"
          v-if="columns"
        >
          <el-button circle icon="Menu" @click="showColumn()" />
        </el-tooltip>
        <el-popover
          placement="bottom"
          title="自定义列配置"
          :width="300"
          trigger="click"
        >
          <template #reference>
            <el-button circle icon="Menu" />
          </template>
          <div class="columns-list">
            <draggable
              v-model="myColumns"
              group="people"
              :sort="true"
              @start="onStart"
              @end="onEnd"
              item-key="id"
              draggable=".columns-item"
              handle=".mover"
              ghost-class="ghost"
            >
              <template #item="{ element, index }">
                <div
                  v-if="!element.type && element.slot !== 'action'"
                  class="columns-item"
                >
                  <div class="left">
                    <div class="mover">
                      <el-icon size="18"><Rank /></el-icon>
                      <div style="width: 5px"></div>
                      <el-checkbox
                        :checked="element.checked"
                        size="large"
                        @change="
                          (e) => {
                            changeCheckbox(e, element);
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
                        ><Back
                      /></el-icon>
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
                        ><Right
                      /></el-icon>
                    </el-tooltip>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
          <div class="columns-footer" style="text-align: right; margin: 0">
            <el-button size="small"  @click="visible = false"
              >重置</el-button
            >
            <el-button size="small" type="primary" @click="setColumnConfig"
              >保存</el-button
            >
          </div>
        </el-popover>
      </el-row>
      <el-dialog :title="title" v-model="open" append-to-body>
        <el-transfer
          :titles="['显示', '隐藏']"
          v-model="value"
          :data="columns"
          @change="dataChange"
        ></el-transfer>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import cloneDeep from "lodash/cloneDeep";
  import draggable from "vuedraggable";
  import useSettingsStore from "@/store/modules/settings";
  const props = defineProps({
    // showSearch: {
    //   type: Boolean,
    //   default: true,
    // },
    columns: {
      type: Array,
    },
    tableColumns: {
      type: Array,
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
      default: "",
      required: true,
    },
  });
  
  const drag = ref(false);
  const myColumns = ref([]);
  const list = cloneDeep(props.tableColumns);
  myColumns.value = useSettingsStore().getTableColumnConfig(props.cacheKey, list);
  // console.log(props.cacheKey, myColumns.value, "222222");
  
  
  const setColumnConfig = (e) => {
    useSettingsStore().setTableColumnConfig(props.cacheKey, myColumns.value);
  };
  const emits = defineEmits([
    "update:showSearch",
    "queryTable",
    "update:tableColumns",
  ]);
  
  // 显隐数据
  const value = ref([]);
  // 弹出层标题
  const title = ref("显示/隐藏");
  // 是否显示弹出层
  const open = ref(false);
  
  const style = computed(() => {
    const ret = {};
    if (props.gutter) {
      ret.marginRight = `${props.gutter / 2}px`;
    }
    return ret;
  });
  
  // 搜索
  function toggleSearch() {
    emits("update:showSearch", !props.showSearch);
  }
  
  // 刷新
  function refresh() {
    emits("queryTable");
  }
  
  // 右侧列表元素变化
  function dataChange(data) {
    for (let item in props.columns) {
      const key = props.columns[item].key;
      props.columns[item].visible = !data.includes(key);
    }
  }
  
  // 打开显隐列dialog
  function showColumn() {
    open.value = true;
  }
  
  // 显隐列初始默认隐藏列
  for (let item in props.columns) {
    if (props.columns[item].visible === false) {
      value.value.push(parseInt(item));
    }
  }
  const onStart = (list) => {};
  const onEnd = () => {
    // console.log(props.tableColumns, "props.tableColumns");
    emits("update:tableColumns", myColumns.value);
    useSettingsStore().setTableColumnConfig(props.cacheKey, myColumns.value);
  };
  /** 勾选列 */
  const changeCheckbox = (e, item) => {
    item.checked = e;
    if (!e) {
      const list = props.tableColumns.filter((obj) => obj.prop !== item.prop);
      emits("update:tableColumns", list);
    } else {
      let idx = undefined;
      const objItem = myColumns.value.find((i, index) => {
        idx = index;
        return i.prop == item.prop;
      });
      props.tableColumns.splice(idx, 0, objItem);
    }
  };
  /** 固定列 */
  const handleFixed = (item, type) => {
    if (item.fixed === type) {
      item.fixed = false;
      return;
    }
    props.tableColumns.forEach((i) => {
      // if (item.prop === type) {
      //   item.fixed = "";
      //   return;
      // } else
      if (item.prop === i.prop) {
        item.fixed = type;
      }
    });
  };
  </script>
  
  <style lang="scss" scoped>
  :deep(.el-transfer__button) {
    border-radius: 50%;
    display: block;
    margin-left: 0px;
  }
  :deep(.el-transfer__button:first-child) {
    margin-bottom: 10px;
  }
  
  .my-el-transfer {
    text-align: center;
  }
  .columns-list {
    max-height: 300px;
    overflow-y: auto;
  }
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
  .ghost {
    background: rgba(209, 224, 255, 0.3) !important;
  }
  .columns-footer{
    padding: 8px 0 0;
      border-top: 1px solid #f0f0f0;
  }
  </style>
  