<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-19 11:45:27
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2024-04-10 16:52:03
 * @FilePath: \jnf-ui-master\docs\examples\JnForm\base.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <t-layout-page>
    <t-layout-page-item>
      <jn-table-search
        :searchParamet="formOptions"
        :rowsTotal="1"
        @search="search"
        :formData="searchValue"
        />
      <!-- :formData="searchValue" -->
      <jn-button @click="dialogSelectEnt = true">搜索</jn-button>
      <el-dialog
        :title="'212123'"
        width="70%"
        v-model="dialogSelectEnt"
        draggable
      >
        <jn-button @click="dialogSelectEntASA = true">搜索1</jn-button>
        <jn-table-search
          :searchParamet="formOptions"
          :rowsTotal="1"
          @search="search"
          :formData="searchValue"
        />
        <!-- <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSelectEnt = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </template> -->
      </el-dialog>
      <el-dialog
        :title="'212123'"
        width="70%"
        v-model="dialogSelectEntASA"
        draggable
      >
        <jn-table-search
          :searchParamet="formOptions"
          :rowsTotal="1"
          @search="search"
        />
        <!-- <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSelectEnt = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </template> -->
      </el-dialog>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { formOptions } from './config'
const dialogSelectEnt = ref(false)
const dialogSelectEntASA = ref(false)
const changeSaleOrg = (e, row) => {
  console.log(e, row, 'eqeqwwq')
  row.saleCountry = '31312321'
  row.saleGroup = e
}
const searchValue = ref({
  saleGroup: '13213232',
  saleCountry: '31312321',
  saleDept: '11',
  saleDeptCode: '111',
})
const formOptions = ref({
  saleOrg: {
    type: 'select',
    label: '销售组织',
    placeholder: '请输入销售组织',
    required: true,
    rules: [],
    // colSize: 24,
    attrs: {
      clearable: true,
      multiple: true,
    },
    events: {
      change: ($event, val) => changeSaleOrg($event, val),
      // selected: ($event, val) => changeSaleOrg($event, val),
      // focus: ($event, row) => focus($event, row),
      // blur: ($event, row) => blur($event, row),
    },
    // dictType: 'customer_file_organization',
    children: [
      {
        label: '前纺一车间',
        value: 'W1',
      },
      {
        label: '前纺二车间',
        value: 'W2',
      },
      {
        label: '前纺三车间',
        value: 'W3',
      },
    ],
  },
  saleDeptCode: {
    type: 'select',
    label: '销售部门代码',
    placeholder: '请输入销售部门代码',
    rules: [],
    // colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true,
      props: {
        label: 'saleDeptCode',
        value: 'saleDeptCode',
      },
    },
    events: {
      change: null,
    },
    children: [],
  },
  saleDept: {
    type: 'input',
    label: '销售部门描述',
    placeholder: '请输入销售部门描述',
    rules: [],
    // colSize: 24,
    attrs: (row) => {
      return {
        disabled:
          row.saleDeptCode == null || row.saleDeptCode == '' ? true : false,
        // colProp: 24,
      }
    },
  },
  saleGroupCode: {
    type: 'select',
    label: '销售组代码',
    placeholder: '请输入销售组代码',
    rules: [],
    // colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
      filterable: true,
      allowCreate: true,
      defaultFirstOption: true,
      props: {
        label: 'saleGroupCode',
        value: 'saleGroupCode',
      },
    },
    events: {
      change: null,
    },
    children: [],
  },
  saleGroup: {
    type: 'input',
    label: '销售组描述',
    placeholder: '请输入销售组描述',
    rules: [],
    // colSize: 24,
    attrs: {
      clearable: true,
    },
  },
  saleCountry: {
    type: 'select',
    label: '行政区划',
    placeholder: '请输入行政区划',
    // required: true,
    rules: [],
    // colSize: 24,
    attrs: {
      childType: 'option',
      clearable: true,
      props: {
        label: 'name',
        value: 'name',
      },
    },
    children: [],
  },
})
/**
 * 条件查询参数
 */
function search(params) {
  console.log(params, '条件查询参数')
}
</script>
