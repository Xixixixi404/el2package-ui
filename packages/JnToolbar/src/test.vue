<template>
  <div class="col-table">
    <el-popover
      v-if="showPopover"
      placement="bottom"
      width="200"
      trigger="click"
      popper-class="col-table-popper"
    >
      <div class="popover">
        <div class="popover-header">
          <el-checkbox
            class="check"
            @change="selectAll"
            :label="1"
            v-model="checkAll"
            >全选</el-checkbox
          >
          <div>
            <span @click="saveColumns">保存</span>
            <span @click="reset()">重置</span>
          </div>
        </div>
        <div class="popover-content">
          <el-checkbox-group v-model="selectColumns" @change="handleColumns">
            <div class="left check-group">
              <p class="check-label">固定在左侧</p>
              <draggable v-model="myColumns.left" @change="dragColumns">
                <transition-group>
                  <el-checkbox
                    class="check"
                    v-for="(item, index) in myColumns.left"
                    :label="item.id"
                    :key="item.id"
                    >{{
                      item.label || defaultConfig[item.property] || '未命名列'
                    }}
                    <p class="ctl">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="下移"
                        placement="top"
                      >
                        <span
                          @click.prevent="moveDown(0, index)"
                          class="ctl el-icon-download"
                        ></span>
                      </el-tooltip>
                    </p>
                  </el-checkbox>
                </transition-group>
              </draggable>
            </div>
            <div class="default check-group">
              <p class="check-label">不固定</p>
              <draggable v-model="myColumns.default" @change="dragColumns">
                <transition-group>
                  <el-checkbox
                    class="check"
                    v-for="(item, index) in myColumns.default"
                    :label="item.id"
                    :key="item.id"
                    >{{
                      item.label || defaultConfig[item.property] || '未命名列'
                    }}
                    <p class="ctl">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="上移"
                        placement="top"
                      >
                        <span
                          @click.prevent="moveUp(1, index)"
                          class="el-icon-upload2"
                        ></span>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="下移"
                        placement="top"
                      >
                        <span
                          @click.prevent="moveDown(1, index)"
                          class="el-icon-download"
                        ></span>
                      </el-tooltip>
                    </p>
                  </el-checkbox>
                </transition-group>
              </draggable>
            </div>
            <div class="right check-group">
              <p class="check-label">固定在右侧</p>
              <draggable v-model="myColumns.right" @change="dragColumns">
                <transition-group>
                  <el-checkbox
                    class="check"
                    v-for="(item, index) in myColumns.right"
                    :label="item.id"
                    :key="item.id"
                    >{{
                      item.label || defaultConfig[item.property] || '未命名列'
                    }}
                    <p class="ctl">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="上移"
                        placement="top"
                      >
                        <span
                          @click.prevent="moveUp(2, index)"
                          class="el-icon-upload2"
                        ></span>
                      </el-tooltip>
                    </p>
                  </el-checkbox>
                </transition-group>
              </draggable>
            </div>
          </el-checkbox-group>
        </div>
      </div>

      <el-tooltip
        class="popover-btn"
        effect="dark"
        content="列设置"
        placement="top"
        slot="reference"
        :style="{ top: -offset + 'px' }"
      >
        <span class="el-icon-setting"></span>
      </el-tooltip>
    </el-popover>
    <slot></slot>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import commonApi from '@/api/Common.js'
export default {
  components: {
    draggable,
  },
  props: {
    hide: {
      //默认隐藏的列
      type: Array,
      default: () => [],
    },
    name: {
      //表格名称，要确保该名称在该项目中是唯一的
      type: String,
      default: '',
    },
    config: {
      //表格配置，用于自定义属性显示文本的配置
      type: Object,
      default: () => {},
    },
    offset: {
      //列设置图标定位-top
      type: String,
      default: '20',
    },
  },
  data() {
    return {
      columns: [],
      myColumns: {
        left: [],
        default: [],
        right: [],
      },
      selectColumns: [],
      table: {},
      showPopover: true,
      checkAll: false,
      defaultConfig: {
        //插件默认的属性对应的显示文本
        'col-table-radio': '单选',
        'col-table-checkbox': '多选',
        'col-table-index': '序号',
        'col-table-operation': '操作',
      },
    }
  },
  mounted() {
    // console.log(this.$slots, this.name,this.offset);
    this.defaultConfig = Object.assign(this.defaultConfig, this.config)
    this.table = this.$slots.default[0].componentInstance
    // console.log(this.table);
    this.columns = this.table.columns
    this.columnsObj = {}
    this.columns.forEach((d) => {
      if (d.type == 'hide') this.hide.push(d.property)
      this.columnsObj[d.property] = JSON.parse(JSON.stringify(d))
    })
    this.reset()
    this.init()
    //
  },
  methods: {
    async init() {
      let res = await commonApi.tableColumns({
        listCode: this.name,
      })
      // console.log(res);
      res = res.data
      if (!res || (res && !res.data) || (res && res.code != 200)) return false
      let data = res.data
      //根据后端返回的res.data生成columnsObj
      let hide = this.hide.concat()
      let columnsObj = Object.assign(
        this.dataToColumns(data.listLeftAttributes, 'left', hide),
        this.dataToColumns(data.listMidAttributes, false, hide),
        this.dataToColumns(data.listRightAttributes, 'right', hide)
      )
      // console.log(hide);
      this.reset(columnsObj, hide)
    },
    async saveColumns() {
      //保存列数据
      let data = {
        listCode: this.name,
        listLeftAttributes: [],
        listMidAttributes: [],
        listRightAttributes: [],
      }
      data.listLeftAttributes = this.columnsToData(this.myColumns.left)
      data.listMidAttributes = this.columnsToData(this.myColumns.default)
      data.listRightAttributes = this.columnsToData(this.myColumns.right)
      // console.log(data);
      let res = await commonApi.saveTableColumns(data)
      // console.log(res);
      if (res && res.data && res.data.code == 200)
        this.$message.success('保存成功')
      // if (!res || !res.data) return this.reset();
    },

    reset(columnsObj, hide) {
      // console.log("重置列数据");
      // let columns=JSON.parse(JSON.stringify(this.columns));
      this.myColumns = {
        left: [],
        default: [],
        right: [],
      }
      this.selectColumns = []
      this.checkAll = false
      this.compileColumns(
        columnsObj ? columnsObj : this.columnsObj,
        hide ? hide : this.hide
      )
      // console.log(this.columns, this.selectColumns);
      this.dragColumns()
    },
    columnsToData(columns) {
      if (!columns.length) return []
      let target = []
      columns.forEach((d, i) => {
        target.push({
          columnsName: d.property,
          sort: i,
          isCheck: this.selectColumns.includes(d.id),
        })
      })
      return target
    },
    dataToColumns(data, fixed, hide) {
      if (!data || !data.length) return {}
      let target = {}
      data.forEach((d) => {
        if (!d.isCheck) hide.push(d.columnsName)
        if (d.isCheck && hide.includes(d.columnsName))
          hide.splice(hide.indexOf(d.columnsName), 1)
        target[d.columnsName] = {
          property: d.columnsName,
          fixed: fixed,
        }
      })
      return target
    },
    compileColumns(columnsObj, hide) {
      this.selectColumns = this.columns.map((d) => {
        let p = columnsObj[d.property]
        // console.log(p, d);
        d.fixed = p ? p.fixed : d.fixed
        if (d.fixed && d.fixed != 'right') this.myColumns['left'].push(d)
        else if (d.fixed == 'right') this.myColumns['right'].push(d)
        else this.myColumns['default'].push(d)
        if (!hide || !hide.includes(d.property)) return d.id
      })
    },

    selectAll(e) {
      // console.log("selectAll(e)", e, this.table.columns, this.columns);
      if (e) {
        this.selectColumns = this.columns.map((d) => {
          return d.id
          // if (!this.hide.includes(d.property)) return d.id;
        })
      } else this.selectColumns = []
      this.handleColumns()
    },
    moveUp(type, index) {
      let current, target, id
      if (type == 2) {
        current = this.myColumns.right
        target = this.myColumns.default
      }
      if (type == 0) {
        current = this.myColumns.left
        target = null
      }
      if (type == 1) {
        current = this.myColumns.default
        target = this.myColumns.left
      }
      if (current && target) {
        if (type == 1) current[index].fixed = 'left'
        if (type == 2) current[index].fixed = false
        target.push(current[index])
        current.splice(index, 1)
      }
      this.dragColumns()
    },
    moveDown(type, index) {
      let current, target, id
      if (type == 2) {
        current = this.myColumns.right
        target = null
      }
      if (type == 0) {
        current = this.myColumns.left
        target = this.myColumns.default
      }
      if (type == 1) {
        current = this.myColumns.default
        target = this.myColumns.right
      }
      if (current && target) {
        if (type == 0) current[index].fixed = false
        if (type == 1) current[index].fixed = 'right'
        target.unshift(current[index])
        current.splice(index, 1)
      }
      this.dragColumns()
    },
    dragColumns(e) {
      this._columns = this.myColumns.left
        .concat(this.myColumns.default)
        .concat(this.myColumns.right)
      this.handleColumns()
    },
    handleColumns(e) {
      // console.log(this.selectColumns);
      if (!this._columns) return false
      this.table.store.states._columns = this._columns.filter((d) => {
        return this.selectColumns.includes(d.id)
      })
      // setTimeout(() => {
      this.table.store.updateColumns()
      setTimeout(() => {
        this.table.doLayout()
      })

      // });
      // console.log(e, this.columns, this.table.columns);
    },
  },
}
</script>
<style>
.col-table-popper {
  padding: 12px !important;
  padding-right: 0 !important;
}
</style>
<style scoped>
.popover >>> .el-checkbox .el-checkbox__label {
  font-size: 14px;
}
.col-table {
  position: relative;
}
.popover-btn {
  position: absolute;
  top: -30px;
  right: 0;
  z-index: 8;
}
.popover-content {
  max-height: 280px;
  overflow: auto;
  padding-right: 8px;
  padding-top: 10px;
}
.popover-header {
  padding: 0 0 8px 0;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #ddd;
  font-size: 14px;
  margin-right: 12px;
}
.popover-header span {
  display: inline-block;
  padding-left: 12px;
  cursor: pointer;
  color: #00c8a4;
}
.popover-header span:hover {
  text-decoration: underline;
}
.check {
  display: block;
  line-height: 30px;
  text-align: left;
}
.check-group .el-checkbox {
  margin-right: 0 !important;
}
p.check-label {
  padding-left: 12px;
  line-height: 20px;
  color: #999;
  height: 20px;
  margin: 7px 0;
  font-size: 14px;
}
.ctl {
  margin: 0;
  float: right;
  display: none;
  position: absolute;
  right: 0;
  top: 5px;
}
.ctl span {
  margin: 0 2px;
}
.check:hover .ctl {
  display: inline-block;
}
</style>
