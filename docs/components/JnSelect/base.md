<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-04 23:53:52
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-28 09:45:20
 * @FilePath: \jnf-ui-master\docs\components\JnSelect\base.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# JnSelect 下拉选择组件

### 单选

:::demo
JnSelect/single
:::

### 多选

:::demo
JnSelect/multiple
:::

### JnSelect Attributes

---

### 1、代码示例

> `下拉选择组件————可实现单选多选（多选可使用全选功能）`

```html
<t-select
  placeholder="请选择工序"
  v-model="selectVlaue"
  :optionSource="state.stepList"
  valueKey="label"
  @change="selectChange"
/>
```

### 2、配置参数（Attributes）继承 el-select Attributes

| 参数         | 说明                                             | 类型                            |  默认值 |
| :----------- | :----------------------------------------------- | :------------------------------ | ------: |
| v-model      | 绑定值                                           | boolean / string / number/Array |      无 |
| multiple     | 是否多选                                         | Boolean                         |   false |
| optionSource | 下拉数据源                                       | Array                           |      无 |
| valueKey     | 传入的 option 数组中，要作为最终选择项的键值 key | String                          |   'key' |
| labelKey     | 传入的 option 数组中，要作为显示项的键值名称     | String                          | 'label' |

### 3、继承 el-select events
