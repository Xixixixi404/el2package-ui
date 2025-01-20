# TableSearch 组件

常规条件查询组件，支持自定义搜索条件。

:::tip tips
继承el-form所有属性 <br/> 同时支持`自定义`搜索条件
:::

### 基础用法

只需要传入 `searchParamet` 配置对象和查询所绑定的 `formData` 对象即可生成一个搜索表单。

:::demo
TableSearch/base
:::

### 搜索条件的展开和收起

`rowsTotal` 属性用于控制搜索条件的行数。

当传入 `rowsTotal` 属性时，搜索条件会默认收起，点击展开按钮可以展开所有搜索条件。所有按钮可通过 `time` 属性来配置按钮的防抖时间。

:::demo
TableSearch/rowsTotal
:::

### 自定义列宽

不使用 `customCol` 时，搜索条件会根据屏幕宽度自动分配列宽默认为 `ElCol` span 为 6，即每行展示 4 项搜索条件。

关于 `ElCol` 可以查看 [-> Element Plus ElCol](https://element-plus.org/zh-CN/component/layout.html#col-attributes)

当 `customCol` 为 `true` 时，列宽将根据 `searchParamet` 配置内的 `colSize` 属性来分配列宽。未写入 `colSize` 时默认为 24。

操作按钮的列宽始终占据 6 列。

:::demo
TableSearch/customCol
:::

### 自定义插槽的使用

TableSearch 也支持自定义插槽的使用，通过配置文件中的 `type` 属性和 `slotName` 属性来配置使用插槽。

插槽的使用包含两种模式：

1. 如果配置中 Object 的 `key` 和 `slotName` 相同，如示例中的 `paramsSlot` 则不会默认生成对应的 `ElFormItem` 组件。

2. 如果配置中 Object 的 `key` 和 `slotName` 不同，如示例中的 `paramsSlotForItemSlot` 则会默认生成对应的 `ElFormItem` 组件。此时可以配置对应的 `ElFormItem` 属性如：label...

:::demo
TableSearch/slot
:::

### Attributes

> 同时继承所有 El2Form 的属性。<br/>
> 详情可查看 [-> El2Form](/components/Form/base.md)

| 参数          | 说明                                                        | 类型    | 默认值(ms) |
| :------------ | :---------------------------------------------------------- | :------ | :--------- |
| searchParamet | 同 El2Form 配置 查看 [-> El2Form](/components/Form/base.md) | Option  | -          |
| time          | 防抖时间                                                    | number  | 0          |
| rowsTotal     | 默认展示搜索条件行数                                        | number  | -          |
| customCol     | 是否自定义列宽                                              | boolean | false      |

### Events

> 事件
> 通过 TableSearch 的 ref 对象来调用

| 事件名          | 说明                             | 回调参数 |
| :-------------- | :------------------------------- | :------- |
| search          | 点击搜索按钮触发                 | formData |
| reset           | 点击重置按钮(重置表单后)触发回调 | -        |
| resetSearchForm | 重置TableSearch表单              | formData |
