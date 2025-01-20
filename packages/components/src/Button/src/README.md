# El2Button 参数配置

## 按钮组件

### 1.代码示例：

```html
<el2-button
  :time="time"
  type="primary"
  round
  @click="clickFn"
>
  Primary
</el2-button>
```

### 2. 配置参数（Attributes）

> 继承所有 ElButton 的属性
> 详情可查看 [Element Plus Button](https://element-plus.org/zh-CN/component/button.html#button-%E5%B1%9E%E6%80%A7)

| 参数 | 说明               | 类型   | 可选值 | 默认值 |
| ---- | ------------------ | ------ | ------ | ------ |
| time | 按钮点击后禁用时间 | number | -      | 1000   |
