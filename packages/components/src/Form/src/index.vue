<template>
  <el-form
    v-if="modelValue"
    ref="form"
    class="el2-form"
    :model="modelValue"
    :rules="rules"
    v-bind="$attrs"
    :validate-on-rule-change="false"
  >
    <template
      v-for="(list, index) in formOptsCopy"
      :key="index"
    >
      <div
        v-show="list[0] ? (list[0].config ? !list[0].config?.hidden : true) : true"
        :class="isShowInfo ? 'item-row' : ''"
      >
        <el-row>
          <template v-for="items in list">
            <template
              v-for="(item, key) in items"
              :key="key"
            >
              <div
                v-if="item.type == 'title'"
                class="secondary-tit"
                :class="item.attrs?.className"
              >
                <span v-html="item.label"></span>
                <el-button
                  v-if="item.attrs?.isShowExpand"
                  type="primary"
                  link
                  @click="handleShow(key)"
                >
                  <el-icon>
                    <ArrowDown v-if="!item.show" />
                    <ArrowUp v-else />
                  </el-icon>
                  {{ !item.show ? '展开' : '收起' }}
                </el-button>
                <slot
                  :name="item.slotName || key"
                  :scope="item"
                ></slot>
              </div>
              <el-col
                v-else
                v-show="item.show"
                :span="item?.colSize || 24"
              >
                <slot
                  :name="item.slotName || key"
                  :form-data="modelValue"
                  :schema="{ ...item }"
                >
                  <el-form-item
                    :prop="key"
                    :label="item.label"
                    :label-width="item.labelWidth"
                  >
                    <template v-if="!item?.hasOwnProperty('children')">
                      <slot
                        v-if="item.type === 'slot'"
                        :name="item.ItemSlotName || item.slotName"
                        :scope="item"
                      ></slot>
                      <component
                        v-bind="cAttrs(item)"
                        :is="`el-${item.type}`"
                        v-model="modelValue[key!]"
                        :placeholder="item.placeholder"
                        v-on="cEvent(item)"
                      >
                        <template #[item?.attrs?.slot?.name]>
                          <component :is="item?.attrs?.slot?.render"></component>
                        </template>
                      </component>
                    </template>
                    <component
                      :is="`el-${item.type}`"
                      v-else
                      v-model="modelValue[key!]"
                      :placeholder="item.placeholder"
                      :disabled="props.disabled || item.attrs?.disabled"
                      v-bind="cAttrs(item)"
                      v-on="cEvent(item)"
                    >
                      <template v-if="compChildName(item)">
                        <component
                          :is="`el-${compChildName(item)}`"
                          v-for="child in item?.children"
                          :key="child[item.attrs?.valueKey || 'value']"
                          :label="compChildLabel(item, child)"
                          :value="compChildValue(item, child)"
                          :disabled="props.disabled || child?.disabled"
                        >
                          {{ child[item.attrs?.props?.label || 'label'] }}
                        </component>
                      </template>
                    </component>
                  </el-form-item>
                </slot>
              </el-col>
            </template>
          </template>
          <el-col
            v-if="isSearch"
            :span="6"
          >
            <slot
              name="searchAction"
              :form="form"
              :model="modelValue"
              :isShowExpand="isShowExpand"
            ></slot>
          </el-col>
        </el-row>
      </div>
    </template>
  </el-form>
</template>

<script setup lang="ts">
  let props = defineProps({
    modelValue: {
      type: Object
    },
    formData: {
      type: Object,
      default: null
    },
    formOpts: {
      type: Object,
      default: () => ({})
    },
    /**
     * 是否禁用该表单
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否为搜索表单
     */
    isSearch: {
      type: Boolean,
      default: false
    },
    rowsTotal: {
      type: Number,
      default: 999999
    },
    // 是否为详情表单
    isDetail: {
      type: Boolean,
      default: false
    },
    customCol: {
      type: Boolean,
      default: false
    }
  })

  let emits = defineEmits(['update:modelValue'])
  const sum = ref(6)

  let rules = ref<any>({})
  let form = ref<any>()
  let formOptsCopy = ref<any>([])

  let isShowInfo = ref(false)
  let isMethodCalled = ref(false)

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

  /**
   * @description: 计算每行显示的col值，默认为24 占一整列
   * @param {type} expand:
   * @return {type}
   */
  const calculateShowCol = (expand: boolean) => {
    for (const key in props.formOpts) {
      const item = props.formOpts[key]
      if (!props.customCol) {
        item.colSize = props.isSearch ? computed(getCol).value : (item?.colSize ?? 24)
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

  /**
   * @description: 初始化菜单
   * @param {*} fromData : 表单绑定的数据
   * @return {*}
   */
  const initForm = async ({ formData: data = {}, type }) => {
    if (isMethodCalled.value) {
      // console.log('方法已经被调用过！')
      return
    } else {
      // console.log('方法第一次被调用！')
      isMethodCalled.value = true
    }
    const formSchema = props.formOpts

    let newArr: any[] = [] // 临时数组
    Object.keys(formSchema).forEach((key, index) => {
      rules.value[key] = [
        {
          trigger: formSchema[key]?.type && formSchema[key]?.type.indexOf('input') > -1 ? 'blur' : 'change',
          required: props.disabled ? false : formSchema[key].required,
          message: (formSchema[key].label || '此项') + '是必填项'
        },
        ...(formSchema[key].rules || [])
      ]
      if (formSchema[key].type === 'title') {
        isShowInfo.value = true
        if (newArr.length > 0) {
          formOptsCopy.value.push(newArr)
          newArr = []
        }
        let newObj = {}
        newObj[key] = formSchema[key]

        // 如果title内配置了隐藏该列 则 新增一条配置项
        if (formSchema[key]?.hidden) {
          newArr.push({
            config: {
              hidden: true
            }
          })
        }
        newArr.push(newObj)
      } else {
        let newObj = {}
        newObj[key] = formSchema[key]
        newArr.push(newObj)
        if (Object.keys(formSchema).length === index + 1) {
          formOptsCopy.value.push(newArr)
        }
      }
    })

    if (!type) {
      emits('update:modelValue', data)
    }
    await nextTick()
    form.value?.clearValidate()

    // 计算每行显示的列数
    calculateShowCol(false)
    isMethodCalled.value = false
  }

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
    return (opt: any, child) => {
      switch (opt.type) {
        // case 'select':
        //   return child
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
        default:
          return child[opt.attrs?.props?.label || 'label']
      }
    }
  })

  // 参数配置
  const cAttrs = computed(() => {
    return (item: any) => {
      const itemAttrs =
        typeof item.attrs == 'function'
          ? {
              ...item.attrs(props.modelValue),
              disabled: props?.disabled ? true : item.attrs(props.modelValue)?.disabled
            }
          : {
              clearable: true,
              filterable: true,
              // disabled: item.attrs?.disabled ?? props?.disabled,
              // ...$attrs,
              ...item.attrs,
              disabled: props.disabled || item.attrs?.disabled
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
        changeEvent[v] = (e = undefined) => {
          event[v] && event[v](e, props.modelValue, props.formOpts)
        }
      })
      return { ...changeEvent }
    }
  })

  const resetFields = () => {
    //重置表单
    form.value!.resetFields()
  }

  //表单验证的方法
  const validate = () => {
    return form.value!.validate
  }

  //获取表单数据
  const getFormData = () => {
    return props.modelValue
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

  defineExpose({
    initForm,
    resetFields,
    validate,
    getFormData,
    model: props.modelValue,
    calculateShowCol,
    isShowExpand
  })
</script>

<style lang="scss" scoped>
  .el2-form {
    .el-input,
    .el-cascader,
    .el-select,
    .el-input-number {
      width: 100% !important;
    }
  }

  .el2-form {
    width: 100%;

    // 新版title样式
    .secondary-tit {
      width: 100%;
      padding: 0 12px;
      margin-bottom: 15px;
      font-size: 16px;
      line-height: 42px;
      font-family:
        PingFang SC-Heavy,
        PingFang SC;
      color: var(--el-text-color-regular);
      background: rgba(154, 202, 255, 0.17);
    }

    .el-form-item {
      width: 100%;
      padding-right: 16px !important;
      margin-right: unset !important;
      // margin: auto;
    }

    .el-form-item--default .el-form-item__label {
      line-height: normal;
      display: flex;
      align-items: center;
    }

    .item-row {
      margin-bottom: 15px;
      border-radius: 4px;
    }
  }
</style>
