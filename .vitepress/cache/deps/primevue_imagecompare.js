import {
  script
} from "./chunk-TZ6HJ6Y6.js";
import "./chunk-3NBT74VZ.js";
import {
  BaseStyle
} from "./chunk-ZIUW5ZN6.js";
import {
  createBaseVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-5J2UBCUN.js";

// node_modules/primevue/imagecompare/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-imagecompare {\n    position: relative;\n    overflow: hidden;\n    width: 100%;\n    aspect-ratio: 16 / 9;\n}\n\n.p-imagecompare img {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n}\n\n.p-imagecompare img + img {\n    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);\n}\n\n.p-imagecompare:dir(rtl) img + img {\n    clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);\n}\n\n.p-imagecompare-slider {\n    position: relative;\n    -webkit-appearance: none;\n    width: calc(100% + ".concat(dt("imagecompare.handle.size"), ");\n    height: 100%;\n    margin-inline-start: calc(-1 * calc(").concat(dt("imagecompare.handle.size"), " / 2));\n    background-color: transparent;\n    outline: none;\n    transition: all ").concat(dt("imagecompare.handle.transition.duration"), ";\n}\n\n.p-imagecompare-slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    height: ").concat(dt("imagecompare.handle.size"), ";\n    width: ").concat(dt("imagecompare.handle.size"), ";\n    background: ").concat(dt("imagecompare.handle.background"), ";\n    border: ").concat(dt("imagecompare.handle.border.width"), " solid ").concat(dt("imagecompare.handle.border.color"), ";\n    border-radius: ").concat(dt("imagecompare.handle.border.radius"), ";\n    background-size: contain;\n    cursor: ew-resize;\n    transition: all ").concat(dt("imagecompare.handle.transition.duration"), ";\n}\n\n.p-imagecompare-slider::-moz-range-thumb {\n    height: ").concat(dt("imagecompare.handle.size"), ";\n    width: ").concat(dt("imagecompare.handle.size"), ";\n    background: ").concat(dt("imagecompare.handle.background"), ";\n    border: ").concat(dt("imagecompare.handle.border.width"), " ").concat(dt("imagecompare.handle.border.style"), " ").concat(dt("imagecompare.handle.border.color"), ";\n    border-radius: ").concat(dt("imagecompare.handle.border.radius"), ";\n    background-size: contain;\n    cursor: ew-resize;\n}\n\n.p-imagecompare-slider:focus-visible::-webkit-slider-thumb {\n    box-shadow: ").concat(dt("imagecompare.handle.focus.ring.shadow"), ";\n    outline: ").concat(dt("imagecompare.handle.focus.ring.width"), " ").concat(dt("imagecompare.handle.focus.ring.style"), " ").concat(dt("imagecompare.handle.focus.ring.color"), ";\n    outline-offset: ").concat(dt("imagecompare.handle.focus.ring.offset"), ";\n}\n\n.p-imagecompare-slider:focus-visible::-moz-range-thumb {\n    box-shadow: ").concat(dt("imagecompare.handle.focus.ring.shadow"), ";\n    outline: ").concat(dt("imagecompare.handle.focus.ring.width"), " ").concat(dt("imagecompare.handle.focus.ring.style"), " ").concat(dt("imagecompare.handle.focus.ring.color"), ";\n    outline-offset: ").concat(dt("imagecompare.handle.focus.ring.offset"), ";\n}\n\n.p-imagecompare-slider:hover {\n    width: calc(100% + ").concat(dt("imagecompare.handle.hover.size"), ");\n    margin-inline-start: calc(-1 * calc(").concat(dt("imagecompare.handle.hover.size"), " / 2));\n}\n\n.p-imagecompare-slider:hover::-webkit-slider-thumb {\n    background: ").concat(dt("imagecompare.handle.hover.background"), ";\n    border-color: ").concat(dt("imagecompare.handle.hover.border.color"), ";\n    height: ").concat(dt("imagecompare.handle.hover.size"), ";\n    width: ").concat(dt("imagecompare.handle.hover.size"), ";\n}\n\n.p-imagecompare-slider:hover::-moz-range-thumb {\n    background: ").concat(dt("imagecompare.handle.hover.background"), ";\n    border-color: ").concat(dt("imagecompare.handle.hover.border.color"), ";\n    height: ").concat(dt("imagecompare.handle.hover.size"), ";\n    width: ").concat(dt("imagecompare.handle.hover.size"), ";\n}\n");
};
var classes = {
  root: "p-imagecompare",
  slider: "p-imagecompare-slider"
};
var ImageCompareStyle = BaseStyle.extend({
  name: "imagecompare",
  theme,
  classes
});

// node_modules/primevue/imagecompare/index.mjs
var script$1 = {
  name: "BaseImageCompare",
  "extends": script,
  props: {
    tabindex: {
      type: Number,
      "default": 0
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: ImageCompareStyle,
  provide: function provide() {
    return {
      $pcImageCompare: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "ImageCompare",
  "extends": script$1,
  mutationObserver: null,
  data: function data() {
    return {
      isRTL: false
    };
  },
  beforeUnmount: function beforeUnmount() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  },
  mounted: function mounted() {
    this.updateDirection();
    this.observeDirectionChanges();
  },
  methods: {
    onSlide: function onSlide(event) {
      var value = event.target.value;
      var image = event.target.previousElementSibling;
      if (this.isRTL) {
        image.style.clipPath = "polygon(".concat(100 - value, "% 0, 100% 0, 100% 100%, ").concat(100 - value, "% 100%)");
      } else {
        image.style.clipPath = "polygon(0 0, ".concat(value, "% 0, ").concat(value, "% 100%, 0 100%)");
      }
    },
    updateDirection: function updateDirection() {
      this.isRTL = !!this.$el.closest('[dir="rtl"]');
    },
    observeDirectionChanges: function observeDirectionChanges() {
      var _this = this;
      var targetNode = document.documentElement;
      var config = {
        attributes: true,
        attributeFilter: ["dir"]
      };
      this.mutationObserver = new MutationObserver(function() {
        _this.updateDirection();
      });
      this.mutationObserver.observe(targetNode, config);
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "left"), renderSlot(_ctx.$slots, "right"), createBaseVNode("input", mergeProps({
    type: "range",
    min: "0",
    max: "100",
    value: "50",
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onSlide && $options.onSlide.apply($options, arguments);
    }),
    "class": _ctx.cx("slider")
  }, _ctx.ptm("slider")), null, 16)], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_imagecompare.js.map
