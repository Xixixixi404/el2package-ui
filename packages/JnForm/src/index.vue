<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-06-16 15:13:51
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2024-06-18 16:01:54
 * @FilePath: \jnf-ui\packages\JnForm\src\index.vue
 * @Description: 封装表单jnf-form
-->
<template>
  <el-form class="jnf-form" ref="form" v-if="modelValue" :model="modelValue" :rules="rules" v-bind="$attrs"
    :validate-on-rule-change="false">
    <el-row class="demo-autocomplete">
      <template v-for="(item, key) in formOpts" :key="key">
        <div v-if="item.type == 'title' && item.show" class="secondary-tit" :class="item.attrs?.className">
          <span v-html="item.label"></span>
          <el-button type="primary" v-if="item.attrs?.isShowExpand" @click="handleShow(key)" link>
            <el-icon>
              <ArrowDown v-if="!item.show" />
              <ArrowUp v-else />
            </el-icon>
            {{ !item.show ? '展开' : '收起' }}</el-button>
          <slot :name="key"></slot>
        </div>
        <slot v-else :name="key" :form-data="modelValue" :schema="{ ...item }">
          <el-col :span="item?.colSize" v-show="item.show">
            <el-form-item :prop="key" :label="item.label" :label-width="item.labelWidth">
              <template v-if="!item?.hasOwnProperty('children')">
                <component v-if="item.type !== 'upload' && item.type !== 'editor'" v-bind="cAttrs(item)"
                  :is="`el-${item.type}`" v-model="modelValue[key!]" :placeholder="item.placeholder"
                  v-on="cEvent(item)">
                </component>
                <el-upload v-if="item.type === 'upload'" v-bind="item.uploadAttrs" :on-preview="onPreview"
                  :on-remove="onRemove" :on-success="onSuccess" :on-error="onError" :on-progress="onProgress"
                  :on-change="onChange" :before-upload="beforeUpload" :before-remove="beforeRemove"
                  :http-request="httpRequest" :on-exceed="onExceed" class="m-el-upload">
                  <slot name="uploadArea"></slot>
                  <slot name="uploadTip"></slot>
                </el-upload>
              </template>
              <!-- :disabled="item.attrs?.disabled ?? props?.disabled" -->
              <component v-else :is="`el-${item.type}`" v-model="modelValue[key!]" :placeholder="item.placeholder"
                :disabled="props.disabled || item.attrs?.disabled" v-bind="cAttrs(item)" v-on="cEvent(item)">
                <!-- :disabled="child?.disabled ?? props?.disabled" -->
                <component v-if="compChildName(item)" :is="`el-${compChildName(item)}`"
                  v-for="(child, i) in item?.children" :key="child[item.attrs?.valueKey || 'value']"
                  :label="compChildLabel(item, child)" :value="compChildValue(item, child, i)"
                  :disabled="props.disabled || child?.disabled">{{
    child[item.attrs?.props?.label || 'label'] }}
                </component>
              </component>
            </el-form-item>
          </el-col>
        </slot>
      </template>
      <el-col :span="6">
        <slot name="searchAction" :form="form" :model="modelValue" :isShowExpand="isShowExpand"></slot>
      </el-col>
    </el-row>
    <!-- <el-form-item v-if="!isSearch">
      <slot name="action" :form="form" :model="modelValue"></slot>
    </el-form-item> -->
  </el-form>
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
  onBeforeUnmount,
} from 'vue'
import cloneDeep from 'lodash/cloneDeep'

let props = defineProps({
  modelValue: {
    type: Object,
  },
  value: {
    type: Object,
    default: null, // return object
  },
  formData: {
    type: Object,
    default: null,
    // default: () => ({}), // return object
  },
  //表单配置项
  // options: {
  //   type: Array as PropType<BaseForm.FormOptions[]>,
  //   required: true,
  // },
  formOpts: {
    type: Object,
    default: () => ({}),
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
  /**
   * 是否禁用该表单
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为搜索表单
   */
  isSearch: {
    type: Boolean,
    default: false,
  },
  rowsTotal: {
    type: Number,
    default: 999999,
  },

  // 是否为详情表单
  isDetail: {
    type: Boolean,
    default: false,
  },
})

let emits = defineEmits([
  'update:modelValue',
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed',
])
const sum = ref(6)
// 定义showCol方法
const isShowExpand = ref(false)
const showCol = (col) => {
  sum.value += col ?? 12
  // 判断sum是否大于24并返回结果
  return sum.value <= 24 * props.rowsTotal
}
// 创建一个响应式变量来保存屏幕宽度
const screenWidth = ref(window.innerWidth)
// 创建一个函数来处理屏幕宽度的变化
function handleScreenWidthChange() {
  // 更新屏幕宽度
  screenWidth.value = window.innerWidth
}
// 监听 resize 事件，并在事件触发时执行 handleScreenWidthChange 函数
window.addEventListener('resize', handleScreenWidthChange)
const getCol = () => {
  if (screenWidth.value < 576) {
    return 24
  } else if (screenWidth.value >= 576 && screenWidth.value < 768) {
    return 12
  } else if (screenWidth.value >= 768 && screenWidth.value < 992) {
    return 8
  } else if (screenWidth.value >= 992 && screenWidth.value < 1200) {
    return 8
  } else {
    return 6
  }
}
const calculateShowCol = (expand: boolean) => {
  for (const key in props.formOpts) {
    const item = props.formOpts[key]
    if (item.attrs) {
      item.colSize = props.isSearch ? computed(getCol) : item?.colSize ?? 12
    }
    let state = props.isSearch
      ? expand
        ? expand
        : showCol(item?.colSize)
      : item.hasOwnProperty('show')
        ? item.show
        : true
    item.show = state
  }
  isShowExpand.value = expand ? !expand : sum.value <= 24 * props.rowsTotal
  sum.value = 6
}
/** 展开与否 */
const handleShow = (startFrom) => {
  // 定义一个标志，表示当前是否处于要修改的区域
  let isBetweenTitle1AndTitle2 = false
  // 遍历对象的属性
  for (const key in props.formOpts) {
    let item = props.formOpts[key]
    if (key === startFrom) {
      isBetweenTitle1AndTitle2 = true
    } else if (item.type === 'title') {
      isBetweenTitle1AndTitle2 = false
    }
    if (isBetweenTitle1AndTitle2) {
      item.show = !item.show
    }
  }
}
// const formModel = ref(props.value || {})
// let model = ref<any>(props.value || {})
// watch(
//   () => props.value,
//   (val) => {
//     if (initType.value) {
//       console.log('新组件。。。。')
//       model.value = val
//     }
//   },
//   { deep: true }
// )
// const initType = ref(undefined)

let rules = ref<any>({})
const schema = ref<any>({})
// BaseForm.FormInstance |
let form = ref<any>()
let editorVal = ref('')

let isMethodCalled = ref(false)
/**
 * @description: 初始化菜单
 * @param {*} fromData : 表单绑定的数据
 * @return {*}
 */
const initForm = async ({ formData: data = {}, type }) => {
  // initType.value = type

  if (isMethodCalled.value) {
    // console.log('方法已经被调用过！')
    return
  } else {
    // console.log('方法第一次被调用！')
    isMethodCalled.value = true
  }
  const formSchema = props.formOpts
  Object.keys(formSchema).forEach((key) => {
    rules.value[key] = [
      {
        trigger: 'blur',
        required: props.disabled ? false : formSchema[key].required,
        message: (formSchema[key].label || '此项') + '是必填项',
      },
      ...(formSchema[key].rules || []),
    ]
  })
  if (!type) {
    emits('update:modelValue', data)
  }
  // if (props.value) {
  //   model.value = props.value
  // } else if (props.formData) {
  //   model.value = props.formData
  // } else {
  //   model.value = data
  // }
  await nextTick()
  form.value!.clearValidate()
  calculateShowCol(false)
  isMethodCalled.value = false
}
onMounted(() => {
  setTimeout(() => {
    if (!isMethodCalled.value) {
      initForm({ type: 'itself' })
    }
  })
})
onBeforeUnmount(() => {
  isMethodCalled.value = false
})
// watch(
//   () => props.formData,
//   (val) => {
//     // if (!initType.value) {
//     console.log('老组件。。。。')
//     emits('update:modelValue', val)
//     // }
//   },
//   { deep: true }
// )
// const initForm = ({ schema: formSchema = {}, formData: data = {} }) => {
//   schema.value = Object.keys(formSchema).reduce(
//     (pre, key) => ({
//       ...pre,
//       [key]: {
//         ...formSchema[key],
//       },
//     }),
//     {}
//   )
//   Object.keys(schema.value).forEach((key) => {
//     rules.value[key] = [
//       {
//         trigger: 'change',
//         required: props.disabled ? true : schema.value[key].required,
//         message: (schema.value[key].label || '此项') + '是必填项',
//       },
//       ...(schema.value[key].rules || []),
//     ]
//   })
//   model.value = cloneDeep(data)
//   calculateShowCol(false)
// }
// 子组件名称
const compChildName = computed(() => {
  return (opt: any) => {
    switch (opt.type) {
      case 'select':
        return 'option'
      case 'checkbox-group':
        return 'checkbox'
      case 'radio-group':
        return 'radio'
      default:
        return null
    }
  }
})
// 子子组件value
const compChildValue = computed(() => {
  return (opt: any, child, key) => {
    switch (opt.type) {
      case 'select':
        if (opt.attrs?.valueKey) return child
      default:
        return child[opt.attrs?.props?.value || 'value']
    }
  }
})
// 子子组件label
const compChildLabel = computed(() => {
  return (opt: any, child) => {
    switch (opt.type) {
      case 'radio-group':
        return child[opt.attrs?.props?.value || 'value']
      // case 'select':
      // case 'checkbox-group':
      //   return child[opt.attrs?.props.label || 'label']
      default:
        return child[opt.attrs?.props?.label || 'label']
    }
  }
})
// 子子组件文字展示
// const compChildShowLabel = computed(() => {
//   return (opt: any, child) => {
//     switch (opt.type) {
//       case 'checkbox-group':
//       case 'radio-group':
//         return child.label
//       // case 'select':
//       //   return child[opt.attrs?.props?.label || 'label']
//       default:
//         return child[opt.attrs?.props?.label || 'label']
//     }
//   }
// })
// 参数配置
const cAttrs = computed(() => {
  return (item: any) => {
    const itemAttrs =
      typeof item.attrs == 'function'
        ? {
          ...item.attrs(props.modelValue),
          disabled: props?.disabled
            ? true
            : item.attrs(props.modelValue)?.disabled,
        }
        : {
          clearable: true,
          filterable: true,
          // disabled: item.attrs?.disabled ?? props?.disabled,
          // ...$attrs,
          ...item.attrs,
          disabled: props.disabled || item.attrs?.disabled,
        }
    return itemAttrs
  }
})
// 事件
const cEvent = computed(() => {
  return (opt: any) => {
    let event = { ...opt.events }
    let changeEvent = {}
    Object.keys(event).forEach((v) => {
      changeEvent[v] = (e) => {
        if (e) {
          event[v] && event[v](e, props.modelValue)
        } else {
          event[v] && event[v](props.modelValue)
        }
      }
    })
    return { ...changeEvent }
  }
})
const resetFields = () => {
  //重置表单
  form.value!.resetFields()
  // props.modelValue = {}
}
//表单验证的方法
const validate = () => {
  return form.value!.validate
}
//获取表单数据
const getFormData = () => {
  return props.modelValue
}
defineExpose({
  initForm,
  resetFields,
  validate,
  getFormData,
  model: props.modelValue,
  // props.modelValue,
  calculateShowCol,
  isShowExpand,
})

// watch(
//   () => props.options,
//   () => {
//     initForm(model.value);
//   },
//   { deep: true }
// );

// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  // let uploadItem = props.options.find((item) => item.type === 'upload')!
  // model.value[uploadItem.prop!] = { response, file, fileList }
  // emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
</script>

<style scoped lang="scss">
// @import "@/assets/styles/common.scss";

.el-upload {
  flex-direction: column !important;
}
</style>
<style lang="scss">
.jnf-form {

  .el-input,
  .el-cascader,
  .el-select,
  .el-input-number {
    width: 100% !important;
  }
}

.jnf-form {
  background: #fff;
  width: 100%;
  padding-bottom: 10px;

  // 新版title样式
  .secondary-tit {
    width: 100%;
    padding: 8px 5px;
    font-size: 18px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #1e2124;
    // font-weight: 900;
    // background: #f2f2f2;
    margin-bottom: 10px;
    position: relative;
  }

  .secondary-tit::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 50%;
    position: absolute;
    left: -10px;
    top: 50%;
    /* 上边缘距离父容器顶部的百分比 */
    transform: translate(0%, -50%);
    /* 通过负值的偏移来居中元素 */
    background: linear-gradient(#4a84fe 0%, #1665ff 20%);
  }

  .el-form-item {
    width: 100%;
    padding-right: 32px !important;
    margin-right: unset !important;
    // margin: auto;
  }

  .el-form-item--default .el-form-item__label {
    line-height: normal;
    display: flex;
    align-items: center;
  }

  // .el-form-item--default {
  //   padding-right: 32px !important;
  // }
}
</style>
