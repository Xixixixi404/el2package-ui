const c = (t, n) => (t.install = (e) => {
  for (const o of [t, ...Object.values({})])
    e.component(o.name, o);
}, t);
export {
  c as withInstall
};
