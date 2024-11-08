import {
  UniqueComponentId
} from "./chunk-KI4UNW25.js";
import "./chunk-BATNEY45.js";
import {
  script as script2
} from "./chunk-IZV5ZA7Q.js";
import {
  Ripple
} from "./chunk-LAYGNASV.js";
import "./chunk-M3Z2YNOL.js";
import {
  script
} from "./chunk-6LRDN5RD.js";
import {
  BaseStyle
} from "./chunk-ATOVSKCZ.js";
import {
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  mergeProps,
  normalizeClass,
  openBlock,
  renderSlot,
  resolveDirective,
  resolveDynamicComponent,
  toDisplayString,
  vShow,
  withCtx,
  withDirectives
} from "./chunk-5J2UBCUN.js";

// node_modules/@primevue/icons/minus/index.mjs
var script3 = {
  name: "MinusIcon",
  "extends": script2
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _cache[0] || (_cache[0] = [createBaseVNode("path", {
    d: "M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script3.render = render;

// node_modules/@primevue/icons/plus/index.mjs
var script4 = {
  name: "PlusIcon",
  "extends": script2
};
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _cache[0] || (_cache[0] = [createBaseVNode("path", {
    d: "M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script4.render = render2;

// node_modules/primevue/fieldset/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-fieldset {\n    background: ".concat(dt("fieldset.background"), ";\n    border: 1px solid ").concat(dt("fieldset.border.color"), ";\n    border-radius: ").concat(dt("fieldset.border.radius"), ";\n    color: ").concat(dt("fieldset.color"), ";\n    padding: ").concat(dt("fieldset.padding"), ";\n    margin: 0;\n}\n\n.p-fieldset-legend {\n    background: ").concat(dt("fieldset.legend.background"), ";\n    border-radius: ").concat(dt("fieldset.legend.border.radius"), ";\n    border-width: ").concat(dt("fieldset.legend.border.width"), ";\n    border-style: solid;\n    border-color: ").concat(dt("fieldset.legend.border.color"), ";\n    padding: ").concat(dt("fieldset.legend.padding"), ";\n    transition: background ").concat(dt("fieldset.transition.duration"), ", color ").concat(dt("fieldset.transition.duration"), ", outline-color ").concat(dt("fieldset.transition.duration"), ", box-shadow ").concat(dt("fieldset.transition.duration"), ";\n}\n\n.p-fieldset-toggleable > .p-fieldset-legend {\n    padding: 0;\n}\n\n.p-fieldset-toggle-button {\n    cursor: pointer;\n    user-select: none;\n    overflow: hidden;\n    position: relative;\n    text-decoration: none;\n    display: flex;\n    gap: ").concat(dt("fieldset.legend.gap"), ";\n    align-items: center;\n    justify-content: center;\n    padding: ").concat(dt("fieldset.legend.padding"), ";\n    background: transparent;\n    border: 0 none;\n    border-radius: ").concat(dt("fieldset.legend.border.radius"), ";\n    transition: background ").concat(dt("fieldset.transition.duration"), ", color ").concat(dt("fieldset.transition.duration"), ", outline-color ").concat(dt("fieldset.transition.duration"), ", box-shadow ").concat(dt("fieldset.transition.duration"), ";\n    outline-color: transparent;\n}\n\n.p-fieldset-legend-label {\n    font-weight: ").concat(dt("fieldset.legend.font.weight"), ";\n}\n\n.p-fieldset-toggle-button:focus-visible {\n    box-shadow: ").concat(dt("fieldset.legend.focus.ring.shadow"), ";\n    outline: ").concat(dt("fieldset.legend.focus.ring.width"), " ").concat(dt("fieldset.legend.focus.ring.style"), " ").concat(dt("fieldset.legend.focus.ring.color"), ";\n    outline-offset: ").concat(dt("fieldset.legend.focus.ring.offset"), ";\n}\n\n.p-fieldset-toggleable > .p-fieldset-legend:hover {\n    color: ").concat(dt("fieldset.legend.hover.color"), ";\n    background: ").concat(dt("fieldset.legend.hover.background"), ";\n}\n\n.p-fieldset-toggle-icon {\n    color: ").concat(dt("fieldset.toggle.icon.color"), ";\n    transition: color ").concat(dt("fieldset.transition.duration"), ";\n}\n\n.p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {\n    color: ").concat(dt("fieldset.toggle.icon.hover.color"), ";\n}\n\n.p-fieldset .p-fieldset-content {\n    padding: ").concat(dt("fieldset.content.padding"), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props;
    return ["p-fieldset p-component", {
      "p-fieldset-toggleable": props.toggleable
    }];
  },
  legend: "p-fieldset-legend",
  legendLabel: "p-fieldset-legend-label",
  toggleButton: "p-fieldset-toggle-button",
  toggleIcon: "p-fieldset-toggle-icon",
  contentContainer: "p-fieldset-content-container",
  content: "p-fieldset-content"
};
var FieldsetStyle = BaseStyle.extend({
  name: "fieldset",
  theme,
  classes
});

// node_modules/primevue/fieldset/index.mjs
var script$1 = {
  name: "BaseFieldset",
  "extends": script,
  props: {
    legend: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: null,
      "default": null
    }
  },
  style: FieldsetStyle,
  provide: function provide() {
    return {
      $pcFieldset: this,
      $parentInstance: this
    };
  }
};
var script5 = {
  name: "Fieldset",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:collapsed", "toggle"],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_collapsed: this.collapsed
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    collapsed: function collapsed(newValue) {
      this.d_collapsed = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
  },
  methods: {
    toggle: function toggle(event) {
      this.d_collapsed = !this.d_collapsed;
      this.$emit("update:collapsed", this.d_collapsed);
      this.$emit("toggle", {
        originalEvent: event,
        value: this.d_collapsed
      });
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") {
        this.toggle(event);
        event.preventDefault();
      }
    }
  },
  computed: {
    buttonAriaLabel: function buttonAriaLabel() {
      return this.toggleButtonProps && this.toggleButtonProps.ariaLabel ? this.toggleButtonProps.ariaLabel : this.legend;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    PlusIcon: script4,
    MinusIcon: script3
  }
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "aria-controls", "aria-expanded", "aria-label"];
var _hoisted_3 = ["id", "aria-labelledby"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("fieldset", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [createBaseVNode("legend", mergeProps({
    "class": _ctx.cx("legend")
  }, _ctx.ptm("legend")), [renderSlot(_ctx.$slots, "legend", {
    toggleCallback: $options.toggle
  }, function() {
    return [!_ctx.toggleable ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      id: $data.id + "_header",
      "class": _ctx.cx("legendLabel")
    }, _ctx.ptm("legendLabel")), toDisplayString(_ctx.legend), 17, _hoisted_1)) : createCommentVNode("", true), _ctx.toggleable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
      key: 1,
      id: $data.id + "_header",
      type: "button",
      "aria-controls": $data.id + "_content",
      "aria-expanded": !$data.d_collapsed,
      "aria-label": $options.buttonAriaLabel,
      "class": _ctx.cx("toggleButton"),
      onClick: _cache[0] || (_cache[0] = function() {
        return $options.toggle && $options.toggle.apply($options, arguments);
      }),
      onKeydown: _cache[1] || (_cache[1] = function() {
        return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
      })
    }, _objectSpread(_objectSpread({}, _ctx.toggleButtonProps), _ctx.ptm("toggleButton"))), [renderSlot(_ctx.$slots, _ctx.$slots.toggleicon ? "toggleicon" : "togglericon", {
      collapsed: $data.d_collapsed,
      "class": normalizeClass(_ctx.cx("toggleIcon"))
    }, function() {
      return [(openBlock(), createBlock(resolveDynamicComponent($data.d_collapsed ? "PlusIcon" : "MinusIcon"), mergeProps({
        "class": _ctx.cx("toggleIcon")
      }, _ctx.ptm("toggleIcon")), null, 16, ["class"]))];
    }), createBaseVNode("span", mergeProps({
      "class": _ctx.cx("legendLabel")
    }, _ctx.ptm("legendLabel")), toDisplayString(_ctx.legend), 17)], 16, _hoisted_2)), [[_directive_ripple]]) : createCommentVNode("", true)];
  })], 16), createVNode(Transition, mergeProps({
    name: "p-toggleable-content"
  }, _ctx.ptm("transition")), {
    "default": withCtx(function() {
      return [withDirectives(createBaseVNode("div", mergeProps({
        id: $data.id + "_content",
        "class": _ctx.cx("contentContainer"),
        role: "region",
        "aria-labelledby": $data.id + "_header"
      }, _ctx.ptm("contentContainer")), [createBaseVNode("div", mergeProps({
        "class": _ctx.cx("content")
      }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16)], 16, _hoisted_3), [[vShow, !$data.d_collapsed]])];
    }),
    _: 3
  }, 16)], 16);
}
script5.render = render3;
export {
  script5 as default
};
//# sourceMappingURL=primevue_fieldset.js.map
