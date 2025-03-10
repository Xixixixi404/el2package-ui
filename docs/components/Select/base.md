# Select 下拉选择组件

:::tip tips
继承所有 el-select 属性<br/>
`multiple` 为 `true` 时会自动添加全选选项
:::

### 单选

:::demo
Select/single
:::

### 多选

多选时会自动添加 `全选` 选项

:::demo
Select/multiple
:::

---

### 代码示例

```html
<El2Select
  placeholder="请选择工序"
  v-model="selectVlaue"
  :optionSource="state.stepList"
  valueKey="label"
  @change="selectChange"
/>
```

### Attributes

> 下拉选择组件（多选可使用全选功能）
> 继承所有 ElSelect 的属性。<br/>
> 详情可查看 [-> Element Plus Select](https://element-plus.org/zh-CN/component/select.html#select-api)

| 参数         | 说明                                                                       | 类型                           | 默认值  |
| :----------- | :------------------------------------------------------------------------- | :----------------------------- | :------ |
| v-model      | 绑定值                                                                     | boolean / string / 多选时any[] | 无      |
| multiple     | 是否多选                                                                   | Boolean                        | false   |
| optionSource | 仅在（multiple为true时）：下拉数据源                                       | Array                          | 无      |
| valueKey     | 仅在（multiple为true时）：传入的 option 数组中，要作为最终选择项的键值 key | String                         | 'key'   |
| labelKey     | 仅在（multiple为true时）：传入的 option 数组中，要作为显示项的键值名称     | String                         | 'label' |
