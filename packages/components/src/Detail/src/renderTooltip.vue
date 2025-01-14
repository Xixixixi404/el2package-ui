<script lang="ts">
export default defineComponent({
  name: 'RenderTooltip',
  props: {
    render: Function,
    item: Object
  },
  render(ctx) {
    console.log('ctx', ctx)
    return ctx.render(ctx?.item)
  },
})
</script>
