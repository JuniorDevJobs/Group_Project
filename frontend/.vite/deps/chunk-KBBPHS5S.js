import {
  DefaultPropsProvider_default,
  require_jsx_runtime,
  require_prop_types,
  useDefaultProps
} from "./chunk-VL2CEYW2.js";
import {
  __toESM,
  require_react
} from "./chunk-AY6LENDD.js";

// node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function DefaultPropsProvider(props) {
  return (0, import_jsx_runtime.jsx)(DefaultPropsProvider_default, {
    ...props
  });
}
true ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * @ignore
   */
  value: import_prop_types.default.object.isRequired
} : void 0;
function useDefaultProps2(params) {
  return useDefaultProps(params);
}

export {
  useDefaultProps2 as useDefaultProps
};
//# sourceMappingURL=chunk-KBBPHS5S.js.map
