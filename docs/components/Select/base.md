# Select 下拉选择组件

:::tip tips
继承所有 el-select 属性
:::

### 单选

:::demo
Select/single
:::

### 多选

:::demo
Select/multiple
:::

---

### 代码示例

> 下拉选择组件（多选可使用全选功能）

```html
<El2-select
  placeholder="请选择工序"
  v-model="selectVlaue"
  :optionSource="state.stepList"
  valueKey="label"
  @change="selectChange"
/>
```

### Attributes

继承所有 el-select 属性

| 参数         | 说明                                             | 类型                           | 默认值  |
| :----------- | :----------------------------------------------- | :----------------------------- | :------ |
| v-model      | 绑定值                                           | boolean / string / 多选时any[] | 无      |
| multiple     | 是否多选                                         | Boolean                        | false   |
| optionSource | 下拉数据源                                       | Array                          | 无      |
| valueKey     | 传入的 option 数组中，要作为最终选择项的键值 key | String                         | 'key'   |
| labelKey     | 传入的 option 数组中，要作为显示项的键值名称     | String                         | 'label' |
