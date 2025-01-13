import { defineComponent as o, ref as m, resolveComponent as a, openBlock as u, createBlock as p, mergeProps as f, withCtx as _, renderSlot as d } from "vue";
const k = o({
  name: "El2Button"
}), T = /* @__PURE__ */ o({
  ...k,
  props: {
    time: {
      type: Number,
      default: 1e3
    }
  },
  emits: ["click"],
  setup(n, { emit: l }) {
    const c = n, r = l, t = m(0), s = () => {
      (/* @__PURE__ */ new Date()).getTime() - t.value > c.time && r("click"), t.value = (/* @__PURE__ */ new Date()).getTime();
    };
    return (e, w) => {
      const i = a("el-button");
      return u(), p(i, f(e.$attrs, { onClick: s }), {
        default: _(() => [
          d(e.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  T as default
};
