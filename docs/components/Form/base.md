# Form 表单组件

配置化表单组件，用以对 ElFrom 的配置化支持。

:::tip tips
继承 ElForm 所有属性 <br/>
:::

### 基础用法

传入一套 `formOpts` 配置即可生成一个表单。

:::demo
Form/base
:::

### title 表单内部标题

使用表单内部标题项可添加配置 `attrs` 内 `isShowExpand` 属性，控制是否显示展开按钮。

:::demo
Form/title
:::

### slot 自定义表单项

1. 如果配置中 Object 的 `key` 和 `slotName` 相同，如示例中的 `paramsSlot` 则不会默认生成对应的 `ElFormItem` 组件。

2. 如果配置中 Object 的 `key` 和 `slotName` 不同，如示例中的 `elementSlot` 则会默认生成对应的 `ElFormItem` 组件。此时可以配置对应的 `ElFormItem` 属性如：label...

3. 同样的 `title` 插槽内部也可以配置 `slot` 插槽来展示一些不一样的东西，你可以通过不同的 css 来展示不同的 title 效果。

   3.1 插槽同样支持各种类型：string、VNode、J/Tsx、any[Component]

4. 同样，组件也支持 [ElComponent] `slot` 插槽属性的配置。如示例中的 `ElInput` 组件在 attrs 中配置的 slot，详细目录可参考 [-> Slot](#slot)。

:::demo
Form/slot
:::

### formOpts config

除以下表格内所示属性外 配置在 `formOpts` 内的属性都会传递给 `el-form-item` 组件。
详情可见 [-> el-form-item](https://element-plus.org/zh-CN/component/form.html#formitem-api)

| 参数     | 说明                                          | 类型                                    | 默认值(ms) |
| :------- | :-------------------------------------------- | :-------------------------------------- | :--------- |
| [key]    | 表单唯一字段 对应 formData 内 key             | string                                  | -          |
| type     | 需要渲染的组件类型                            | title/slot/[ElComponents]               | -          |
| label    | 表单项 label                                  | string                                  | -          |
| slotName | 使用插槽名称                                  | string                                  | -          |
| required | 是否校验为必填项                              | boolean                                 | false      |
| colSize  | 组件所占rows内列宽                            | number                                  | 24         |
| attrs    | 继承至FormItem内部的组件属性 任意 el-plus组件 | typeof [ElComponents][详细说明](#attrs) | -          |

### attrs{#attrs}

同样支持一个返回所有配置的函数，对象内属性会传递给对应的组件。

除下表内属性，其他属性继承 [ElComponents] 所有属性。
例如: [-> ElInput](https://element-plus.org/zh-CN/component/input.html#attributes)

| 参数         | 说明                            | 类型                 | 默认值(ms) |
| :----------- | :------------------------------ | :------------------- | :--------- |
| attrs        | 插槽配置                        | Object / () => attrs | -          |
| slot         | 插槽配置 slot [详细说明](#slot) | slot                 | -          |
| className    | 自定义类名                      | string               | -          |
| isShowExpand | 是否显示展开按钮                | boolean              | false      |

### slot{#slot}

插槽属性配置

| 参数   | 说明                   | 类型                                 | 默认值(ms) |
| :----- | :--------------------- | :----------------------------------- | :--------- |
| name   | 插槽名                 | string                               | -          |
| render | 插槽内容：支持多种类型 | string、VNode、J/Tsx、any[Component] | -          |

### events{#events}

定义在组件类型上的事件:支持 [ElComponents] 上所有事件<br/>
例：change: ($event, val) => fn($event, val)

| 参数     | 说明                     | 类型       | 默认值(ms) |
| :------- | :----------------------- | :--------- | :--------- |
| [events] | 事件名 'blur' / 'change' | () => void | -          |
