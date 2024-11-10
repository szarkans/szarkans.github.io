import {
  script as script2,
  script2 as script3
} from "./chunk-GQYXH2WY.js";
import "./chunk-QQEJEFKW.js";
import {
  Ripple
} from "./chunk-V7GEICFN.js";
import "./chunk-CIGLQQ3G.js";
import "./chunk-6ETBYVEO.js";
import {
  script
} from "./chunk-BEAQ6NNO.js";
import "./chunk-3NBT74VZ.js";
import {
  BaseStyle,
  findSingle,
  getHeight,
  getOffset,
  getOuterHeight,
  getOuterWidth,
  getWidth
} from "./chunk-M7TXSPCN.js";
import {
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot,
  resolveDirective,
  resolveDynamicComponent,
  withDirectives
} from "./chunk-5J2UBCUN.js";

// node_modules/primevue/tablist/style/index.mjs
var classes = {
  root: "p-tablist",
  content: function content(_ref) {
    var instance = _ref.instance;
    return ["p-tablist-content", {
      "p-tablist-viewport": instance.$pcTabs.scrollable
    }];
  },
  tabList: "p-tablist-tab-list",
  activeBar: "p-tablist-active-bar",
  prevButton: "p-tablist-prev-button p-tablist-nav-button",
  nextButton: "p-tablist-next-button p-tablist-nav-button"
};
var TabListStyle = BaseStyle.extend({
  name: "tablist",
  classes
});

// node_modules/primevue/tablist/index.mjs
var script$1 = {
  name: "BaseTabList",
  "extends": script,
  props: {},
  style: TabListStyle,
  provide: function provide() {
    return {
      $pcTabList: this,
      $parentInstance: this
    };
  }
};
var script4 = {
  name: "TabList",
  "extends": script$1,
  inheritAttrs: false,
  inject: ["$pcTabs"],
  mutationObserver: null,
  data: function data() {
    return {
      isPrevButtonEnabled: false,
      isNextButtonEnabled: true,
      isRTL: false
    };
  },
  resizeObserver: void 0,
  watch: {
    showNavigators: function showNavigators(newValue) {
      newValue ? this.bindResizeObserver() : this.unbindResizeObserver();
    },
    activeValue: {
      flush: "post",
      handler: function handler() {
        this.updateInkBar();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.$nextTick(function() {
      _this.updateInkBar();
    });
    if (this.showNavigators) {
      this.updateButtonState();
      this.bindResizeObserver();
    }
    this.updateDirection();
    this.observeDirectionChanges();
  },
  updated: function updated() {
    this.showNavigators && this.updateButtonState();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeObserver();
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  },
  methods: {
    onScroll: function onScroll(event) {
      this.showNavigators && this.updateButtonState();
      event.preventDefault();
    },
    onPrevButtonClick: function onPrevButtonClick() {
      var content2 = this.$refs.content;
      var width = getWidth(content2);
      var pos;
      if (this.isRTL) {
        pos = content2.scrollLeft + width;
      } else {
        pos = content2.scrollLeft - width;
      }
      content2.scrollLeft = pos <= 0 ? 0 : pos;
    },
    onNextButtonClick: function onNextButtonClick() {
      var content2 = this.$refs.content;
      var width = getWidth(content2) - this.getVisibleButtonWidths();
      var pos, lastPos;
      if (this.isRTL) {
        pos = content2.scrollLeft - width;
        lastPos = content2.scrollWidth + width;
      } else {
        pos = content2.scrollLeft + width;
        lastPos = content2.scrollWidth - width;
      }
      content2.scrollLeft = pos >= lastPos ? lastPos : pos;
    },
    bindResizeObserver: function bindResizeObserver() {
      var _this2 = this;
      this.resizeObserver = new ResizeObserver(function() {
        return _this2.updateButtonState();
      });
      this.resizeObserver.observe(this.$refs.list);
    },
    unbindResizeObserver: function unbindResizeObserver() {
      var _this$resizeObserver;
      (_this$resizeObserver = this.resizeObserver) === null || _this$resizeObserver === void 0 || _this$resizeObserver.unobserve(this.$refs.list);
      this.resizeObserver = void 0;
    },
    updateInkBar: function updateInkBar() {
      var _this$$refs = this.$refs, content2 = _this$$refs.content, inkbar = _this$$refs.inkbar, tabs = _this$$refs.tabs;
      var activeTab = findSingle(content2, '[data-pc-name="tab"][data-p-active="true"]');
      if (this.$pcTabs.isVertical()) {
        inkbar.style.height = getOuterHeight(activeTab) + "px";
        inkbar.style.top = getOffset(activeTab).top - getOffset(tabs).top + "px";
      } else {
        inkbar.style.width = getOuterWidth(activeTab) + "px";
        inkbar.style.left = getOffset(activeTab).left - getOffset(tabs).left + "px";
      }
    },
    updateButtonState: function updateButtonState() {
      var _this$$refs2 = this.$refs, list = _this$$refs2.list, content2 = _this$$refs2.content;
      var scrollLeft = content2.scrollLeft, scrollTop = content2.scrollTop, scrollWidth = content2.scrollWidth, scrollHeight = content2.scrollHeight, offsetWidth = content2.offsetWidth, offsetHeight = content2.offsetHeight;
      var _ref = [getWidth(content2), getHeight(content2)], width = _ref[0], height = _ref[1];
      if (this.$pcTabs.isVertical()) {
        this.isPrevButtonEnabled = scrollTop !== 0;
        this.isNextButtonEnabled = list.offsetHeight >= offsetHeight && parseInt(scrollTop) !== scrollHeight - height;
      } else {
        this.isPrevButtonEnabled = scrollLeft !== 0;
        this.isNextButtonEnabled = list.offsetWidth >= offsetWidth && parseInt(scrollLeft) !== scrollWidth - width;
      }
    },
    getVisibleButtonWidths: function getVisibleButtonWidths() {
      var _this$$refs3 = this.$refs, prevBtn = _this$$refs3.prevBtn, nextBtn = _this$$refs3.nextBtn;
      return [prevBtn, nextBtn].reduce(function(acc, el) {
        return el ? acc + getWidth(el) : acc;
      }, 0);
    },
    updateDirection: function updateDirection() {
      this.isRTL = !!this.$el.closest('[dir="rtl"]');
    },
    observeDirectionChanges: function observeDirectionChanges() {
      var _this3 = this;
      var targetNode = document.documentElement;
      var config = {
        attributes: true,
        attributeFilter: ["dir"]
      };
      this.mutationObserver = new MutationObserver(function() {
        _this3.updateDirection();
      });
      this.mutationObserver.observe(targetNode, config);
    }
  },
  computed: {
    templates: function templates() {
      return this.$pcTabs.$slots;
    },
    activeValue: function activeValue() {
      return this.$pcTabs.d_value;
    },
    showNavigators: function showNavigators2() {
      return this.$pcTabs.scrollable && this.$pcTabs.showNavigators;
    },
    prevButtonAriaLabel: function prevButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.previous : void 0;
    },
    nextButtonAriaLabel: function nextButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.next : void 0;
    }
  },
  components: {
    ChevronLeftIcon: script2,
    ChevronRightIcon: script3
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1 = ["aria-label", "tabindex"];
var _hoisted_2 = ["aria-orientation"];
var _hoisted_3 = ["aria-label", "tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "list",
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [$options.showNavigators && $data.isPrevButtonEnabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    ref: "prevButton",
    "class": _ctx.cx("prevButton"),
    "aria-label": $options.prevButtonAriaLabel,
    tabindex: $options.$pcTabs.tabindex,
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.onPrevButtonClick && $options.onPrevButtonClick.apply($options, arguments);
    })
  }, _ctx.ptm("prevButton"), {
    "data-pc-group-section": "navigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($options.templates.previcon || "ChevronLeftIcon"), mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm("prevIcon")), null, 16))], 16, _hoisted_1)), [[_directive_ripple]]) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    ref: "content",
    "class": _ctx.cx("content"),
    onScroll: _cache[1] || (_cache[1] = function() {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    })
  }, _ctx.ptm("content")), [createBaseVNode("div", mergeProps({
    ref: "tabs",
    "class": _ctx.cx("tabList"),
    role: "tablist",
    "aria-orientation": $options.$pcTabs.orientation || "horizontal"
  }, _ctx.ptm("tabList")), [renderSlot(_ctx.$slots, "default"), createBaseVNode("span", mergeProps({
    ref: "inkbar",
    "class": _ctx.cx("activeBar"),
    role: "presentation",
    "aria-hidden": "true"
  }, _ctx.ptm("activeBar")), null, 16)], 16, _hoisted_2)], 16), $options.showNavigators && $data.isNextButtonEnabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 1,
    ref: "nextButton",
    "class": _ctx.cx("nextButton"),
    "aria-label": $options.nextButtonAriaLabel,
    tabindex: $options.$pcTabs.tabindex,
    onClick: _cache[2] || (_cache[2] = function() {
      return $options.onNextButtonClick && $options.onNextButtonClick.apply($options, arguments);
    })
  }, _ctx.ptm("nextButton"), {
    "data-pc-group-section": "navigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($options.templates.nexticon || "ChevronRightIcon"), mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm("nextIcon")), null, 16))], 16, _hoisted_3)), [[_directive_ripple]]) : createCommentVNode("", true)], 16);
}
script4.render = render;
export {
  script4 as default
};
//# sourceMappingURL=primevue_tablist.js.map
