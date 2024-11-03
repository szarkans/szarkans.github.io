import {
  script as script2
} from "./chunk-ETTLIRZH.js";
import {
  Ripple
} from "./chunk-PWZQFEJH.js";
import {
  script
} from "./chunk-AVMHXGPB.js";
import "./chunk-6UAIVZT4.js";
import {
  BaseStyle,
  findSingle,
  getHeight,
  getOffset,
  getOuterHeight,
  getOuterWidth,
  getWidth
} from "./chunk-3QCNEV3V.js";
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
} from "./chunk-XYSSNQS4.js";

// node_modules/@primevue/icons/chevronleft/index.mjs
var script3 = {
  name: "ChevronLeftIcon",
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
    d: "M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script3.render = render;

// node_modules/@primevue/icons/chevronright/index.mjs
var script4 = {
  name: "ChevronRightIcon",
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
    d: "M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script4.render = render2;

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
var script5 = {
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
    ChevronLeftIcon: script3,
    ChevronRightIcon: script4
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1 = ["aria-label", "tabindex"];
var _hoisted_2 = ["aria-orientation"];
var _hoisted_3 = ["aria-label", "tabindex"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
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
script5.render = render3;
export {
  script5 as default
};
//# sourceMappingURL=primevue_tablist.js.map
