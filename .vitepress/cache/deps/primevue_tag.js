import {
  script
} from "./chunk-HJIV2PMA.js";
import "./chunk-3NBT74VZ.js";
import {
  BaseStyle
} from "./chunk-FMDU42L7.js";
import {
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString
} from "./chunk-5J2UBCUN.js";

// node_modules/primevue/tag/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-tag {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    background: ".concat(dt("tag.primary.background"), ";\n    color: ").concat(dt("tag.primary.color"), ";\n    font-size: ").concat(dt("tag.font.size"), ";\n    font-weight: ").concat(dt("tag.font.weight"), ";\n    padding: ").concat(dt("tag.padding"), ";\n    border-radius: ").concat(dt("tag.border.radius"), ";\n    gap: ").concat(dt("tag.gap"), ";\n}\n\n.p-tag-icon {\n    font-size: ").concat(dt("tag.icon.size"), ";\n    width: ").concat(dt("tag.icon.size"), ";\n    height:").concat(dt("tag.icon.size"), ";\n}\n\n.p-tag-rounded {\n    border-radius: ").concat(dt("tag.rounded.border.radius"), ";\n}\n\n.p-tag-success {\n    background: ").concat(dt("tag.success.background"), ";\n    color: ").concat(dt("tag.success.color"), ";\n}\n\n.p-tag-info {\n    background: ").concat(dt("tag.info.background"), ";\n    color: ").concat(dt("tag.info.color"), ";\n}\n\n.p-tag-warn {\n    background: ").concat(dt("tag.warn.background"), ";\n    color: ").concat(dt("tag.warn.color"), ";\n}\n\n.p-tag-danger {\n    background: ").concat(dt("tag.danger.background"), ";\n    color: ").concat(dt("tag.danger.color"), ";\n}\n\n.p-tag-secondary {\n    background: ").concat(dt("tag.secondary.background"), ";\n    color: ").concat(dt("tag.secondary.color"), ";\n}\n\n.p-tag-contrast {\n    background: ").concat(dt("tag.contrast.background"), ";\n    color: ").concat(dt("tag.contrast.color"), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props;
    return ["p-tag p-component", {
      "p-tag-info": props.severity === "info",
      "p-tag-success": props.severity === "success",
      "p-tag-warn": props.severity === "warn",
      "p-tag-danger": props.severity === "danger",
      "p-tag-secondary": props.severity === "secondary",
      "p-tag-contrast": props.severity === "contrast",
      "p-tag-rounded": props.rounded
    }];
  },
  icon: "p-tag-icon",
  label: "p-tag-label"
};
var TagStyle = BaseStyle.extend({
  name: "tag",
  theme,
  classes
});

// node_modules/primevue/tag/index.mjs
var script$1 = {
  name: "BaseTag",
  "extends": script,
  props: {
    value: null,
    severity: null,
    rounded: Boolean,
    icon: String
  },
  style: TagStyle,
  provide: function provide() {
    return {
      $pcTag: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Tag",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [_ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
    key: 0,
    "class": _ctx.cx("icon")
  }, _ctx.ptm("icon")), null, 16, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": [_ctx.cx("icon"), _ctx.icon]
  }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true), _ctx.value != null || _ctx.$slots["default"] ? renderSlot(_ctx.$slots, "default", {
    key: 2
  }, function() {
    return [createBaseVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, _ctx.ptm("label")), toDisplayString(_ctx.value), 17)];
  }) : createCommentVNode("", true)], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_tag.js.map
