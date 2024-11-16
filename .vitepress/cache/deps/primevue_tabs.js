import {
  UniqueComponentId
} from "./chunk-JL7KU7RS.js";
import "./chunk-CXETA7UJ.js";
import "./chunk-VHCN4E3L.js";
import {
  script
} from "./chunk-HJIV2PMA.js";
import "./chunk-3NBT74VZ.js";
import {
  BaseStyle
} from "./chunk-FMDU42L7.js";
import {
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-5J2UBCUN.js";

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
