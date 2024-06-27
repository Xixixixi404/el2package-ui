<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-08 11:43:23
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2023-09-22 10:50:17
 * @FilePath: \zr_szhpt_web\src\views\test\lb-render.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RenderCol",
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render(ctx) {
    const params: any = {
      row: ctx.row,
      index: ctx.index,
    };
    if (ctx.column) params.column = ctx.column;
    return ctx.render(ctx?.row[ctx?.column?.prop], ctx.row, ctx.index);
  },
});
</script>
