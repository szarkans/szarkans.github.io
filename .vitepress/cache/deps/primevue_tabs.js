import "./chunk-TUHEKRCN.js";
import {
  script
} from "./chunk-U4XPCC5S.js";
import {
  BaseStyle,
  getScrollableParents,
  isNotEmpty,
  uuid
} from "./chunk-23NTEW4Y.js";
import {
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-5J2UBCUN.js";

// node_modules/@primevue/core/utils/index.mjs
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _classCallCheck$1(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$1(o.key), o);
  }
}
function _createClass$1(e, r, t) {
  return r && _defineProperties$1(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var ConnectedOverlayScrollHandler = function() {
  function ConnectedOverlayScrollHandler2(element) {
    var listener = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    _classCallCheck$1(this, ConnectedOverlayScrollHandler2);
    this.element = element;
    this.listener = listener;
  }
  return _createClass$1(ConnectedOverlayScrollHandler2, [{
    key: "bindScrollListener",
    value: function bindScrollListener() {
      this.scrollableParents = getScrollableParents(this.element);
      for (var i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollableParents) {
        for (var i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener("scroll", this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
}();
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e;
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
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var _default = function() {
  function _default2(_ref) {
    var init = _ref.init, type = _ref.type;
    _classCallCheck(this, _default2);
    _defineProperty(this, "helpers", void 0);
    _defineProperty(this, "type", void 0);
    this.helpers = new Set(init);
    this.type = type;
  }
  return _createClass(_default2, [{
    key: "add",
    value: function add(instance) {
      this.helpers.add(instance);
    }
  }, {
    key: "update",
    value: function update() {
    }
  }, {
    key: "delete",
    value: function _delete(instance) {
      this.helpers["delete"](instance);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.helpers.clear();
    }
  }, {
    key: "get",
    value: function get(parentInstance, slots) {
      var children = this._get(parentInstance, slots);
      var computed = children ? this._recursive(_toConsumableArray(this.helpers), children) : null;
      return isNotEmpty(computed) ? computed : null;
    }
  }, {
    key: "_isMatched",
    value: function _isMatched(instance, key) {
      var _parent$vnode;
      var parent = instance === null || instance === void 0 ? void 0 : instance.parent;
      return (parent === null || parent === void 0 || (_parent$vnode = parent.vnode) === null || _parent$vnode === void 0 ? void 0 : _parent$vnode.key) === key || parent && this._isMatched(parent, key) || false;
    }
  }, {
    key: "_get",
    value: function _get(parentInstance, slots) {
      var _ref2, _ref2$default;
      return ((_ref2 = slots || (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$slots)) === null || _ref2 === void 0 || (_ref2$default = _ref2["default"]) === null || _ref2$default === void 0 ? void 0 : _ref2$default.call(_ref2)) || null;
    }
  }, {
    key: "_recursive",
    value: function _recursive() {
      var _this = this;
      var helpers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var children = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      var components = [];
      children.forEach(function(child) {
        if (child.children instanceof Array) {
          components = components.concat(_this._recursive(components, child.children));
        } else if (child.type.name === _this.type) {
          components.push(child);
        } else if (isNotEmpty(child.key)) {
          components = components.concat(helpers.filter(function(c) {
            return _this._isMatched(c, child.key);
          }).map(function(c) {
            return c.vnode;
          }));
        }
      });
      return components;
    }
  }]);
}();
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  return uuid(prefix);
}

// node_modules/primevue/tabs/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-tabs {\n    display: flex;\n    flex-direction: column;\n}\n\n.p-tablist {\n    display: flex;\n    position: relative;\n}\n\n.p-tabs-scrollable > .p-tablist {\n    overflow: hidden;\n}\n\n.p-tablist-viewport {\n    overflow-x: auto;\n    overflow-y: hidden;\n    scroll-behavior: smooth;\n    scrollbar-width: none;\n    overscroll-behavior: contain auto;\n}\n\n.p-tablist-viewport::-webkit-scrollbar {\n    display: none;\n}\n\n.p-tablist-tab-list {\n    position: relative;\n    display: flex;\n    background: ".concat(dt("tabs.tablist.background"), ";\n    border-style: solid;\n    border-color: ").concat(dt("tabs.tablist.border.color"), ";\n    border-width: ").concat(dt("tabs.tablist.border.width"), ";\n}\n\n.p-tablist-content {\n    flex-grow: 1;\n}\n\n.p-tablist-nav-button {\n    all: unset;\n    position: absolute !important;\n    flex-shrink: 0;\n    inset-block-start: 0;\n    z-index: 2;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: ").concat(dt("tabs.nav.button.background"), ";\n    color: ").concat(dt("tabs.nav.button.color"), ";\n    width: ").concat(dt("tabs.nav.button.width"), ";\n    transition: color ").concat(dt("tabs.transition.duration"), ", outline-color ").concat(dt("tabs.transition.duration"), ", box-shadow ").concat(dt("tabs.transition.duration"), ";\n    box-shadow: ").concat(dt("tabs.nav.button.shadow"), ";\n    outline-color: transparent;\n    cursor: pointer;\n}\n\n.p-tablist-nav-button:focus-visible {\n    z-index: 1;\n    box-shadow: ").concat(dt("tabs.nav.button.focus.ring.shadow"), ";\n    outline: ").concat(dt("tabs.nav.button.focus.ring.width"), " ").concat(dt("tabs.nav.button.focus.ring.style"), " ").concat(dt("tabs.nav.button.focus.ring.color"), ";\n    outline-offset: ").concat(dt("tabs.nav.button.focus.ring.offset"), ";\n}\n\n.p-tablist-nav-button:hover {\n    color: ").concat(dt("tabs.nav.button.hover.color"), ";\n}\n\n.p-tablist-prev-button {\n    inset-inline-start: 0;\n}\n\n.p-tablist-next-button {\n    inset-inline-end: 0;\n}\n\n.p-tablist-prev-button:dir(rtl),\n.p-tablist-next-button:dir(rtl) {\n    transform: rotate(180deg);\n}\n\n\n.p-tab {\n    flex-shrink: 0;\n    cursor: pointer;\n    user-select: none;\n    position: relative;\n    border-style: solid;\n    white-space: nowrap;\n    background: ").concat(dt("tabs.tab.background"), ";\n    border-width: ").concat(dt("tabs.tab.border.width"), ";\n    border-color: ").concat(dt("tabs.tab.border.color"), ";\n    color: ").concat(dt("tabs.tab.color"), ";\n    padding: ").concat(dt("tabs.tab.padding"), ";\n    font-weight: ").concat(dt("tabs.tab.font.weight"), ";\n    transition: background ").concat(dt("tabs.transition.duration"), ", border-color ").concat(dt("tabs.transition.duration"), ", color ").concat(dt("tabs.transition.duration"), ", outline-color ").concat(dt("tabs.transition.duration"), ", box-shadow ").concat(dt("tabs.transition.duration"), ";\n    margin: ").concat(dt("tabs.tab.margin"), ";\n    outline-color: transparent;\n}\n\n.p-tab:not(.p-disabled):focus-visible {\n    z-index: 1;\n    box-shadow: ").concat(dt("tabs.tab.focus.ring.shadow"), ";\n    outline: ").concat(dt("tabs.tab.focus.ring.width"), " ").concat(dt("tabs.tab.focus.ring.style"), " ").concat(dt("tabs.tab.focus.ring.color"), ";\n    outline-offset: ").concat(dt("tabs.tab.focus.ring.offset"), ";\n}\n\n.p-tab:not(.p-tab-active):not(.p-disabled):hover {\n    background: ").concat(dt("tabs.tab.hover.background"), ";\n    border-color: ").concat(dt("tabs.tab.hover.border.color"), ";\n    color: ").concat(dt("tabs.tab.hover.color"), ";\n}\n\n.p-tab-active {\n    background: ").concat(dt("tabs.tab.active.background"), ";\n    border-color: ").concat(dt("tabs.tab.active.border.color"), ";\n    color: ").concat(dt("tabs.tab.active.color"), ";\n}\n\n.p-tabpanels {\n    background: ").concat(dt("tabs.tabpanel.background"), ";\n    color: ").concat(dt("tabs.tabpanel.color"), ";\n    padding: ").concat(dt("tabs.tabpanel.padding"), ";\n    outline: 0 none;\n}\n\n.p-tabpanel:focus-visible {\n    box-shadow: ").concat(dt("tabs.tabpanel.focus.ring.shadow"), ";\n    outline: ").concat(dt("tabs.tabpanel.focus.ring.width"), " ").concat(dt("tabs.tabpanel.focus.ring.style"), " ").concat(dt("tabs.tabpanel.focus.ring.color"), ";\n    outline-offset: ").concat(dt("tabs.tabpanel.focus.ring.offset"), ";\n}\n\n.p-tablist-active-bar {\n    z-index: 1;\n    display: block;\n    position: absolute;\n    inset-block-end: ").concat(dt("tabs.active.bar.bottom"), ";\n    height: ").concat(dt("tabs.active.bar.height"), ";\n    background: ").concat(dt("tabs.active.bar.background"), ";\n    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props;
    return ["p-tabs p-component", {
      "p-tabs-scrollable": props.scrollable
    }];
  }
};
var TabsStyle = BaseStyle.extend({
  name: "tabs",
  theme,
  classes
});

// node_modules/primevue/tabs/index.mjs
var script$1 = {
  name: "BaseTabs",
  "extends": script,
  props: {
    value: {
      type: [String, Number],
      "default": void 0
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    showNavigators: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    }
  },
  style: TabsStyle,
  provide: function provide() {
    return {
      $pcTabs: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Tabs",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:value"],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_value: this.value
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    value: function value(newValue) {
      this.d_value = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
  },
  methods: {
    updateValue: function updateValue(newValue) {
      if (this.d_value !== newValue) {
        this.d_value = newValue;
        this.$emit("update:value", newValue);
      }
    },
    isVertical: function isVertical() {
      return this.orientation === "vertical";
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_tabs.js.map
