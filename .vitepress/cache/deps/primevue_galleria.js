import {
  script as script5,
  script2 as script6,
  script3 as script7
} from "./chunk-WFWIJYDN.js";
import {
  UniqueComponentId
} from "./chunk-KUST3VTD.js";
import {
  ZIndex
} from "./chunk-BATNEY45.js";
import {
  script as script3,
  script2 as script4
} from "./chunk-GQYXH2WY.js";
import {
  script as script2
} from "./chunk-QQEJEFKW.js";
import {
  Ripple
} from "./chunk-V7GEICFN.js";
import {
  BaseDirective
} from "./chunk-CIGLQQ3G.js";
import "./chunk-6ETBYVEO.js";
import {
  script
} from "./chunk-BEAQ6NNO.js";
import "./chunk-3NBT74VZ.js";
import {
  BaseStyle,
  addClass,
  blockBodyScroll,
  createElement,
  find,
  findSingle,
  focus,
  getAttribute,
  getFirstFocusableElement,
  getLastFocusableElement,
  isFocusableElement,
  isNotEmpty,
  localeComparator,
  removeClass,
  setAttribute,
  sort,
  unblockBodyScroll
} from "./chunk-M7TXSPCN.js";
import {
  Fragment,
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  mergeProps,
  openBlock,
  renderList,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  withCtx,
  withDirectives
} from "./chunk-5J2UBCUN.js";

// node_modules/primevue/focustrap/style/index.mjs
var FocusTrapStyle = BaseStyle.extend({
  name: "focustrap-directive"
});

// node_modules/primevue/focustrap/index.mjs
var BaseFocusTrap = BaseDirective.extend({
  style: FocusTrapStyle
});
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
var FocusTrap = BaseFocusTrap.extend("focustrap", {
  mounted: function mounted(el, binding) {
    var _ref = binding.value || {}, disabled = _ref.disabled;
    if (!disabled) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoElementFocus(el, binding);
    }
    el.setAttribute("data-pd-focustrap", true);
    this.$el = el;
  },
  updated: function updated(el, binding) {
    var _ref2 = binding.value || {}, disabled = _ref2.disabled;
    disabled && this.unbind(el);
  },
  unmounted: function unmounted(el) {
    this.unbind(el);
  },
  methods: {
    getComputedSelector: function getComputedSelector(selector) {
      return ':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(selector !== null && selector !== void 0 ? selector : "");
    },
    bind: function bind(el, binding) {
      var _this = this;
      var _ref3 = binding.value || {}, onFocusIn = _ref3.onFocusIn, onFocusOut = _ref3.onFocusOut;
      el.$_pfocustrap_mutationobserver = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
          if (mutation.type === "childList" && !el.contains(document.activeElement)) {
            var _findNextFocusableElement = function findNextFocusableElement(_el) {
              var focusableElement = isFocusableElement(_el) ? isFocusableElement(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : getFirstFocusableElement(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : getFirstFocusableElement(_el);
              return isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && _findNextFocusableElement(_el.nextSibling);
            };
            focus(_findNextFocusableElement(mutation.nextSibling));
          }
        });
      });
      el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_mutationobserver.observe(el, {
        childList: true
      });
      el.$_pfocustrap_focusinlistener = function(event) {
        return onFocusIn && onFocusIn(event);
      };
      el.$_pfocustrap_focusoutlistener = function(event) {
        return onFocusOut && onFocusOut(event);
      };
      el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
      el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
    },
    unbind: function unbind(el) {
      el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
      el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    },
    autoFocus: function autoFocus(options) {
      this.autoElementFocus(this.$el, {
        value: _objectSpread(_objectSpread({}, options), {}, {
          autoFocus: true
        })
      });
    },
    autoElementFocus: function autoElementFocus(el, binding) {
      var _ref4 = binding.value || {}, _ref4$autoFocusSelect = _ref4.autoFocusSelector, autoFocusSelector = _ref4$autoFocusSelect === void 0 ? "" : _ref4$autoFocusSelect, _ref4$firstFocusableS = _ref4.firstFocusableSelector, firstFocusableSelector = _ref4$firstFocusableS === void 0 ? "" : _ref4$firstFocusableS, _ref4$autoFocus = _ref4.autoFocus, autoFocus2 = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
      var focusableElement = getFirstFocusableElement(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
      autoFocus2 && !focusableElement && (focusableElement = getFirstFocusableElement(el, this.getComputedSelector(firstFocusableSelector)));
      focus(focusableElement);
    },
    onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
      var _this$$el;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? getFirstFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      focus(focusableElement);
    },
    onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
      var _this$$el2;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? getLastFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      focus(focusableElement);
    },
    createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
      var _this2 = this;
      var _ref5 = binding.value || {}, _ref5$tabIndex = _ref5.tabIndex, tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex, _ref5$firstFocusableS = _ref5.firstFocusableSelector, firstFocusableSelector = _ref5$firstFocusableS === void 0 ? "" : _ref5$firstFocusableS, _ref5$lastFocusableSe = _ref5.lastFocusableSelector, lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? "" : _ref5$lastFocusableSe;
      var createFocusableElement = function createFocusableElement2(onFocus) {
        return createElement("span", {
          "class": "p-hidden-accessible p-hidden-focusable",
          tabIndex,
          role: "presentation",
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus === null || onFocus === void 0 ? void 0 : onFocus.bind(_this2)
        });
      };
      var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
      var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
      firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
      firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
      firstFocusableElement.setAttribute("data-pc-section", "firstfocusableelement");
      lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
      lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
      lastFocusableElement.setAttribute("data-pc-section", "lastfocusableelement");
      el.prepend(firstFocusableElement);
      el.append(lastFocusableElement);
    }
  }
});

// node_modules/primevue/galleria/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-galleria {\n    overflow: hidden;\n    border-style: solid;\n    border-width: ".concat(dt("galleria.border.width"), ";\n    border-color: ").concat(dt("galleria.border.color"), ";\n    border-radius: ").concat(dt("galleria.border.radius"), ";\n}\n\n.p-galleria-content {\n    display: flex;\n    flex-direction: column;\n}\n\n.p-galleria-items-container {\n    display: flex;\n    flex-direction: column;\n    position: relative;\n}\n\n.p-galleria-items {\n    position: relative;\n    display: flex;\n    height: 100%;\n}\n\n.p-galleria-nav-button {\n    position: absolute !important;\n    top: 50%;\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    background: ").concat(dt("galleria.nav.button.background"), ";\n    color: ").concat(dt("galleria.nav.button.color"), ";\n    width: ").concat(dt("galleria.nav.button.size"), ";\n    height: ").concat(dt("galleria.nav.button.size"), ";\n    transition: background ").concat(dt("galleria.transition.duration"), ", color ").concat(dt("galleria.transition.duration"), ", outline-color ").concat(dt("galleria.transition.duration"), ", box-shadow ").concat(dt("galleria.transition.duration"), ";\n    margin: calc(-1 * calc(").concat(dt("galleria.nav.button.size"), ") / 2) ").concat(dt("galleria.nav.button.gutter"), " 0 ").concat(dt("galleria.nav.button.gutter"), ";\n    padding: 0;\n    user-select: none;\n    border: 0 none;\n    cursor: pointer;\n    outline-color: transparent;\n}\n\n.p-galleria-nav-button:not(.p-disabled):hover {\n    background: ").concat(dt("galleria.nav.button.hover.background"), ";\n    color: ").concat(dt("galleria.nav.button.hover.color"), ";\n}\n\n.p-galleria-nav-button:not(.p-disabled):focus-visible {\n    box-shadow: ").concat(dt("galleria.nav.button.focus.ring.shadow"), ";\n    outline: ").concat(dt("galleria.nav.button.focus.ring.width"), " ").concat(dt("galleria.nav.button.focus.ring.style"), " ").concat(dt("galleria.nav.button.focus.ring.color"), ";\n    outline-offset: ").concat(dt("galleria.nav.button.focus.ring.offset"), ";\n}\n\n.p-galleria-next-icon,\n.p-galleria-prev-icon {\n    font-size: ").concat(dt("galleria.nav.icon.size"), ";\n    width: ").concat(dt("galleria.nav.icon.size"), ";\n    height: ").concat(dt("galleria.nav.icon.size"), ";\n}\n\n.p-galleria-prev-button {\n    border-radius: ").concat(dt("galleria.nav.button.prev.border.radius"), ";\n    left: 0;\n}\n\n.p-galleria-next-button {\n    border-radius: ").concat(dt("galleria.nav.button.next.border.radius"), ";\n    right: 0;\n}\n\n.p-galleria-prev-button:dir(rtl) {\n    left: auto;\n    right: 0;\n    transform: rotate(180deg);\n}\n\n.p-galleria-next-button:dir(rtl) {\n    right: auto;\n    left: 0;\n    transform: rotate(180deg);\n}\n\n.p-galleria-item {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n}\n\n.p-galleria-hover-navigators .p-galleria-nav-button {\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity ").concat(dt("galleria.transition.duration"), " ease-in-out;\n}\n\n.p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button {\n    pointer-events: all;\n    opacity: 1;\n}\n\n.p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button.p-disabled {\n    pointer-events: none;\n}\n\n.p-galleria-caption {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    background: ").concat(dt("galleria.caption.background"), ";\n    color: ").concat(dt("galleria.caption.color"), ";\n    padding: ").concat(dt("galleria.caption.padding"), ";\n}\n\n.p-galleria-thumbnails {\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n    flex-shrink: 0;\n}\n\n.p-galleria-thumbnail-nav-button {\n    align-self: center;\n    flex: 0 0 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n    margin: 0 ").concat(dt("galleria.thumbnail.nav.button.gutter"), ";\n    padding: 0;\n    border: none;\n    user-select: none;\n    cursor: pointer;\n    background: transparent;\n    color: ").concat(dt("galleria.thumbnail.nav.button.color"), ";\n    width: ").concat(dt("galleria.thumbnail.nav.button.size"), ";\n    height: ").concat(dt("galleria.thumbnail.nav.button.size"), ";\n    transition: background ").concat(dt("galleria.transition.duration"), ", color ").concat(dt("galleria.transition.duration"), ", outline-color ").concat(dt("galleria.transition.duration"), ";\n    outline-color: transparent;\n    border-radius: ").concat(dt("galleria.thumbnail.nav.button.border.radius"), ";\n}\n\n.p-galleria-thumbnail-nav-button:hover {\n    background: ").concat(dt("galleria.thumbnail.nav.button.hover.background"), ";\n    color: ").concat(dt("galleria.thumbnail.nav.button.hover.color"), ";\n}\n\n.p-galleria-thumbnail-nav-button:focus-visible {\n    box-shadow: ").concat(dt("galleria.thumbnail.nav.button.focus.ring.shadow"), ";\n    outline: ").concat(dt("galleria.thumbnail.nav.button.focus.ring.width"), " ").concat(dt("galleria.thumbnail.nav.button.focus.ring.style"), " ").concat(dt("galleria.thumbnail.nav.button.focus.ring.color"), ";\n    outline-offset: ").concat(dt("galleria.thumbnail.nav.button.focus.ring.offset"), ";\n}\n\n.p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,\n.p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {\n    font-size: ").concat(dt("galleria.thumbnail.nav.button.icon.size"), ";\n    width: ").concat(dt("galleria.thumbnail.nav.button.icon.size"), ";\n    height: ").concat(dt("galleria.thumbnail.nav.button.icon.size"), ";\n}\n\n.p-galleria-thumbnails-content {\n    display: flex;\n    flex-direction: row;\n    background: ").concat(dt("galleria.thumbnails.content.background"), ";\n    padding: ").concat(dt("galleria.thumbnails.content.padding"), ";\n}\n\n.p-galleria-thumbnails-viewport {\n    overflow: hidden;\n    width: 100%;\n}\n\n.p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-prev-button:dir(rtl),\n.p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-next-button:dir(rtl) {\n    transform: rotate(180deg);\n}\n\n.p-galleria-thumbnail-items {\n    display: flex;\n}\n\n.p-galleria-thumbnail-item {\n    overflow: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    opacity: 0.5;\n}\n\n.p-galleria-thumbnail {\n    outline-color: transparent;\n}\n\n.p-galleria-thumbnail-item:hover {\n    opacity: 1;\n    transition: opacity 0.3s;\n}\n\n.p-galleria-thumbnail-item-current {\n    opacity: 1;\n}\n\n.p-galleria-thumbnails-left .p-galleria-content,\n.p-galleria-thumbnails-right .p-galleria-content {\n    flex-direction: row;\n}\n\n.p-galleria-thumbnails-left .p-galleria-items-container,\n.p-galleria-thumbnails-right .p-galleria-items-container {\n    flex-direction: row;\n}\n\n.p-galleria-thumbnails-left .p-galleria-items-container,\n.p-galleria-thumbnails-top .p-galleria-items-container {\n    order: 2;\n}\n\n.p-galleria-thumbnails-left .p-galleria-thumbnails,\n.p-galleria-thumbnails-top .p-galleria-thumbnails {\n    order: 1;\n}\n\n.p-galleria-thumbnails-left .p-galleria-thumbnails-content,\n.p-galleria-thumbnails-right .p-galleria-thumbnails-content {\n    flex-direction: column;\n    flex-grow: 1;\n}\n\n.p-galleria-thumbnails-left .p-galleria-thumbnail-items,\n.p-galleria-thumbnails-right .p-galleria-thumbnail-items {\n    flex-direction: column;\n    height: 100%;\n}\n\n.p-galleria-indicator-list {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: ").concat(dt("galleria.indicator.list.padding"), ";\n    gap: ").concat(dt("galleria.indicator.list.gap"), ";\n    margin: 0;\n    list-style: none;\n}\n\n.p-galleria-indicator-button {\n    display: inline-flex;\n    align-items: center;\n    background: ").concat(dt("galleria.indicator.button.background"), ";\n    width: ").concat(dt("galleria.indicator.button.width"), ";\n    height: ").concat(dt("galleria.indicator.button.height"), ";\n    transition: background ").concat(dt("galleria.transition.duration"), ", color ").concat(dt("galleria.transition.duration"), ", outline-color ").concat(dt("galleria.transition.duration"), ", box-shadow ").concat(dt("galleria.transition.duration"), ";\n    outline-color: transparent;\n    border-radius: ").concat(dt("galleria.indicator.button.border.radius"), ";\n    margin: 0;\n    padding: 0;\n    border: none;\n    user-select: none;\n    cursor: pointer;\n}\n\n.p-galleria-indicator-button:hover {\n    background: ").concat(dt("galleria.indicator.button.hover.background"), ";\n}\n\n.p-galleria-indicator-button:focus-visible {\n    box-shadow: ").concat(dt("galleria.indicator.button.focus.ring.shadow"), ";\n    outline: ").concat(dt("galleria.indicator.button.focus.ring.width"), " ").concat(dt("galleria.indicator.button.focus.ring.style"), " ").concat(dt("galleria.indicator.button.focus.ring.color"), ";\n    outline-offset: ").concat(dt("galleria.indicator.button.focus.ring.offset"), ";\n}\n\n.p-galleria-indicator-active .p-galleria-indicator-button {\n    background: ").concat(dt("galleria.indicator.button.active.background"), ";\n}\n\n.p-galleria-indicators-left .p-galleria-items-container,\n.p-galleria-indicators-right .p-galleria-items-container {\n    flex-direction: row;\n    align-items: center;\n}\n\n.p-galleria-indicators-left .p-galleria-items,\n.p-galleria-indicators-top .p-galleria-items {\n    order: 2;\n}\n\n.p-galleria-indicators-left .p-galleria-indicator-list,\n.p-galleria-indicators-top .p-galleria-indicator-list {\n    order: 1;\n}\n\n.p-galleria-indicators-left .p-galleria-indicator-list,\n.p-galleria-indicators-right .p-galleria-indicator-list {\n    flex-direction: column;\n}\n\n.p-galleria-inset-indicators .p-galleria-indicator-list {\n    position: absolute;\n    display: flex;\n    z-index: 1;\n    background: ").concat(dt("galleria.inset.indicator.list.background"), ";\n}\n\n.p-galleria-inset-indicators .p-galleria-indicator-button {\n    background: ").concat(dt("galleria.inset.indicator.button.background"), ";\n}\n\n.p-galleria-inset-indicators .p-galleria-indicator-button:hover {\n    background: ").concat(dt("galleria.inset.indicator.button.hover.background"), ";\n}\n\n.p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {\n    background: ").concat(dt("galleria.inset.indicator.button.active.background"), ";\n}\n\n.p-galleria-inset-indicators.p-galleria-indicators-top .p-galleria-indicator-list {\n    top: 0;\n    left: 0;\n    width: 100%;\n    align-items: flex-start;\n}\n\n.p-galleria-inset-indicators.p-galleria-indicators-right .p-galleria-indicator-list {\n    right: 0;\n    top: 0;\n    height: 100%;\n    align-items: flex-end;\n}\n\n.p-galleria-inset-indicators.p-galleria-indicators-bottom .p-galleria-indicator-list {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    align-items: flex-end;\n}\n\n.p-galleria-inset-indicators.p-galleria-indicators-left .p-galleria-indicator-list {\n    left: 0;\n    top: 0;\n    height: 100%;\n    align-items: flex-start;\n}\n\n.p-galleria-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-galleria-close-button {\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    margin: ").concat(dt("galleria.close.button.gutter"), ";\n    background: ").concat(dt("galleria.close.button.background"), ";\n    color: ").concat(dt("galleria.close.button.color"), ";\n    width: ").concat(dt("galleria.close.button.size"), ";\n    height: ").concat(dt("galleria.close.button.size"), ";\n    padding: 0;\n    border: none;\n    user-select: none;\n    cursor: pointer;\n    border-radius: ").concat(dt("galleria.close.button.border.radius"), ";\n    outline-color: transparent;\n    transition: background ").concat(dt("galleria.transition.duration"), ", color ").concat(dt("galleria.transition.duration"), ", outline-color ").concat(dt("galleria.transition.duration"), ";\n}\n\n.p-galleria-close-icon {\n    font-size: ").concat(dt("galleria.close.button.icon.size"), ";\n    width: ").concat(dt("galleria.close.button.icon.size"), ";\n    height: ").concat(dt("galleria.close.button.icon.size"), ";\n}\n\n.p-galleria-close-button:hover {\n    background: ").concat(dt("galleria.close.button.hover.background"), ";\n    color: ").concat(dt("galleria.close.button.hover.color"), ";\n}\n\n.p-galleria-close-button:focus-visible {\n    box-shadow: ").concat(dt("galleria.close.button.focus.ring.shadow"), ";\n    outline: ").concat(dt("galleria.close.button.focus.ring.width"), " ").concat(dt("galleria.close.button.focus.ring.style"), " ").concat(dt("galleria.close.button.focus.ring.color"), ";\n    outline-offset: ").concat(dt("galleria.close.button.focus.ring.offset"), ";\n}\n\n.p-galleria-mask .p-galleria-nav-button {\n    position: fixed;\n    top: 50%;\n}\n\n.p-galleria-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-galleria-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.p-galleria-enter-from,\n.p-galleria-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n\n.p-galleria-enter-active .p-galleria-nav-button {\n    opacity: 0;\n}\n\n.p-items-hidden .p-galleria-thumbnail-item {\n    visibility: hidden;\n}\n\n.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {\n    visibility: visible;\n}\n");
};
var classes = {
  mask: "p-galleria-mask p-overlay-mask p-overlay-mask-enter",
  root: function root(_ref2) {
    var instance = _ref2.instance;
    var thumbnailsPosClass = instance.$attrs.showThumbnails && instance.getPositionClass("p-galleria-thumbnails", instance.$attrs.thumbnailsPosition);
    var indicatorPosClass = instance.$attrs.showIndicators && instance.getPositionClass("p-galleria-indicators", instance.$attrs.indicatorsPosition);
    return ["p-galleria p-component", {
      "p-galleria-fullscreen": instance.$attrs.fullScreen,
      "p-galleria-inset-indicators": instance.$attrs.showIndicatorsOnItem,
      "p-galleria-hover-navigators": instance.$attrs.showItemNavigatorsOnHover && !instance.$attrs.fullScreen
    }, thumbnailsPosClass, indicatorPosClass];
  },
  closeButton: "p-galleria-close-button",
  closeIcon: "p-galleria-close-icon",
  header: "p-galleria-header",
  content: "p-galleria-content",
  footer: "p-galleria-footer",
  itemsContainer: "p-galleria-items-container",
  items: "p-galleria-items",
  prevButton: function prevButton(_ref3) {
    var instance = _ref3.instance;
    return ["p-galleria-prev-button p-galleria-nav-button", {
      "p-disabled": instance.isNavBackwardDisabled()
    }];
  },
  prevIcon: "p-galleria-prev-icon",
  item: "p-galleria-item",
  nextButton: function nextButton(_ref4) {
    var instance = _ref4.instance;
    return ["p-galleria-next-button p-galleria-nav-button", {
      "p-disabled": instance.isNavForwardDisabled()
    }];
  },
  nextIcon: "p-galleria-next-icon",
  caption: "p-galleria-caption",
  indicatorList: "p-galleria-indicator-list",
  indicator: function indicator(_ref5) {
    var instance = _ref5.instance, index = _ref5.index;
    return ["p-galleria-indicator", {
      "p-galleria-indicator-active": instance.isIndicatorItemActive(index)
    }];
  },
  indicatorButton: "p-galleria-indicator-button",
  thumbnails: "p-galleria-thumbnails",
  thumbnailContent: "p-galleria-thumbnails-content",
  thumbnailPrevButton: function thumbnailPrevButton(_ref6) {
    var instance = _ref6.instance;
    return ["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button", {
      "p-disabled": instance.isNavBackwardDisabled()
    }];
  },
  thumbnailPrevIcon: "p-galleria-thumbnail-prev-icon",
  thumbnailsViewport: "p-galleria-thumbnails-viewport",
  thumbnailItems: "p-galleria-thumbnail-items",
  thumbnailItem: function thumbnailItem(_ref7) {
    var instance = _ref7.instance, index = _ref7.index, activeIndex2 = _ref7.activeIndex;
    return ["p-galleria-thumbnail-item", {
      "p-galleria-thumbnail-item-current": activeIndex2 === index,
      "p-galleria-thumbnail-item-active": instance.isItemActive(index),
      "p-galleria-thumbnail-item-start": instance.firstItemAciveIndex() === index,
      "p-galleria-thumbnail-item-end": instance.lastItemActiveIndex() === index
    }];
  },
  thumbnail: "p-galleria-thumbnail",
  thumbnailNextButton: function thumbnailNextButton(_ref8) {
    var instance = _ref8.instance;
    return ["p-galleria-thumbnail-next-button p-galleria-thumbnail-nav-button", {
      "p-disabled": instance.isNavForwardDisabled()
    }];
  },
  thumbnailNextIcon: "p-galleria-thumbnail-next-icon"
};
var GalleriaStyle = BaseStyle.extend({
  name: "galleria",
  theme,
  classes
});

// node_modules/@primevue/icons/chevronup/index.mjs
var script8 = {
  name: "ChevronUpIcon",
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
    d: "M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script8.render = render;

// node_modules/primevue/galleria/index.mjs
var script$4 = {
  name: "BaseGalleria",
  "extends": script,
  props: {
    id: {
      type: String,
      "default": null
    },
    value: {
      type: Array,
      "default": null
    },
    activeIndex: {
      type: Number,
      "default": 0
    },
    fullScreen: {
      type: Boolean,
      "default": false
    },
    visible: {
      type: Boolean,
      "default": false
    },
    numVisible: {
      type: Number,
      "default": 3
    },
    responsiveOptions: {
      type: Array,
      "default": null
    },
    showItemNavigators: {
      type: Boolean,
      "default": false
    },
    showThumbnailNavigators: {
      type: Boolean,
      "default": true
    },
    showItemNavigatorsOnHover: {
      type: Boolean,
      "default": false
    },
    changeItemOnIndicatorHover: {
      type: Boolean,
      "default": false
    },
    circular: {
      type: Boolean,
      "default": false
    },
    autoPlay: {
      type: Boolean,
      "default": false
    },
    transitionInterval: {
      type: Number,
      "default": 4e3
    },
    showThumbnails: {
      type: Boolean,
      "default": true
    },
    thumbnailsPosition: {
      type: String,
      "default": "bottom"
    },
    verticalThumbnailViewPortHeight: {
      type: String,
      "default": "300px"
    },
    showIndicators: {
      type: Boolean,
      "default": false
    },
    showIndicatorsOnItem: {
      type: Boolean,
      "default": false
    },
    indicatorsPosition: {
      type: String,
      "default": "bottom"
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    maskClass: {
      type: String,
      "default": null
    },
    containerStyle: {
      type: null,
      "default": null
    },
    containerClass: {
      type: null,
      "default": null
    },
    containerProps: {
      type: null,
      "default": null
    },
    prevButtonProps: {
      type: null,
      "default": null
    },
    nextButtonProps: {
      type: null,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    ariaRoledescription: {
      type: String,
      "default": null
    }
  },
  style: GalleriaStyle,
  provide: function provide() {
    return {
      $pcGalleria: this,
      $parentInstance: this
    };
  }
};
function _toConsumableArray$1(r) {
  return _arrayWithoutHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$1(r) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}
function _iterableToArray$1(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$1(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$1(r);
}
function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var script$3 = {
  name: "GalleriaItem",
  hostName: "Galleria",
  "extends": script,
  emits: ["start-slideshow", "stop-slideshow", "update:activeIndex"],
  props: {
    circular: {
      type: Boolean,
      "default": false
    },
    activeIndex: {
      type: Number,
      "default": 0
    },
    value: {
      type: Array,
      "default": null
    },
    showItemNavigators: {
      type: Boolean,
      "default": true
    },
    showIndicators: {
      type: Boolean,
      "default": true
    },
    slideShowActive: {
      type: Boolean,
      "default": true
    },
    changeItemOnIndicatorHover: {
      type: Boolean,
      "default": true
    },
    autoPlay: {
      type: Boolean,
      "default": false
    },
    templates: {
      type: null,
      "default": null
    },
    id: {
      type: String,
      "default": null
    }
  },
  mounted: function mounted2() {
    if (this.autoPlay) {
      this.$emit("start-slideshow");
    }
  },
  methods: {
    getIndicatorPTOptions: function getIndicatorPTOptions(index) {
      return {
        context: {
          highlighted: this.activeIndex === index
        }
      };
    },
    next: function next() {
      var nextItemIndex = this.activeIndex + 1;
      var activeIndex2 = this.circular && this.value.length - 1 === this.activeIndex ? 0 : nextItemIndex;
      this.$emit("update:activeIndex", activeIndex2);
    },
    prev: function prev() {
      var prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
      var activeIndex2 = this.circular && this.activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
      this.$emit("update:activeIndex", activeIndex2);
    },
    stopSlideShow: function stopSlideShow() {
      if (this.slideShowActive && this.stopSlideShow) {
        this.$emit("stop-slideshow");
      }
    },
    navBackward: function navBackward(e) {
      this.stopSlideShow();
      this.prev();
      if (e && e.cancelable) {
        e.preventDefault();
      }
    },
    navForward: function navForward(e) {
      this.stopSlideShow();
      this.next();
      if (e && e.cancelable) {
        e.preventDefault();
      }
    },
    onIndicatorClick: function onIndicatorClick(index) {
      this.stopSlideShow();
      this.$emit("update:activeIndex", index);
    },
    onIndicatorMouseEnter: function onIndicatorMouseEnter(index) {
      if (this.changeItemOnIndicatorHover) {
        this.stopSlideShow();
        this.$emit("update:activeIndex", index);
      }
    },
    onIndicatorKeyDown: function onIndicatorKeyDown(event, index) {
      switch (event.code) {
        case "Enter":
        case "NumpadEnter":
        case "Space":
          this.stopSlideShow();
          this.$emit("update:activeIndex", index);
          event.preventDefault();
          break;
        case "ArrowRight":
          this.onRightKey();
          break;
        case "ArrowLeft":
          this.onLeftKey();
          break;
        case "Home":
          this.onHomeKey();
          event.preventDefault();
          break;
        case "End":
          this.onEndKey();
          event.preventDefault();
          break;
        case "Tab":
          this.onTabKey();
          break;
        case "ArrowDown":
        case "ArrowUp":
        case "PageUp":
        case "PageDown":
          event.preventDefault();
          break;
      }
    },
    onRightKey: function onRightKey() {
      var indicators = _toConsumableArray$1(find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, activeIndex2 + 1 === indicators.length ? indicators.length - 1 : activeIndex2 + 1);
    },
    onLeftKey: function onLeftKey() {
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, activeIndex2 - 1 <= 0 ? 0 : activeIndex2 - 1);
    },
    onHomeKey: function onHomeKey() {
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, 0);
    },
    onEndKey: function onEndKey() {
      var indicators = _toConsumableArray$1(find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, indicators.length - 1);
    },
    onTabKey: function onTabKey() {
      var indicators = _toConsumableArray$1(find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var highlightedIndex = indicators.findIndex(function(ind) {
        return getAttribute(ind, "data-p-active") === true;
      });
      var activeIndicator = findSingle(this.$refs.indicatorContent, '[data-pc-section="indicator"] > button[tabindex="0"]');
      var activeIndex2 = indicators.findIndex(function(ind) {
        return ind === activeIndicator.parentElement;
      });
      indicators[activeIndex2].children[0].tabIndex = "-1";
      indicators[highlightedIndex].children[0].tabIndex = "0";
    },
    findFocusedIndicatorIndex: function findFocusedIndicatorIndex() {
      var indicators = _toConsumableArray$1(find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var activeIndicator = findSingle(this.$refs.indicatorContent, '[data-pc-section="indicator"] > button[tabindex="0"]');
      return indicators.findIndex(function(ind) {
        return ind === activeIndicator.parentElement;
      });
    },
    changedFocusedIndicator: function changedFocusedIndicator(prevInd, nextInd) {
      var indicators = _toConsumableArray$1(find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      indicators[prevInd].children[0].tabIndex = "-1";
      indicators[nextInd].children[0].tabIndex = "0";
      indicators[nextInd].children[0].focus();
    },
    isIndicatorItemActive: function isIndicatorItemActive(index) {
      return this.activeIndex === index;
    },
    isNavBackwardDisabled: function isNavBackwardDisabled() {
      return !this.circular && this.activeIndex === 0;
    },
    isNavForwardDisabled: function isNavForwardDisabled() {
      return !this.circular && this.activeIndex === this.value.length - 1;
    },
    ariaSlideNumber: function ariaSlideNumber(value) {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g, value) : void 0;
    },
    ariaPageLabel: function ariaPageLabel(value) {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : void 0;
    }
  },
  computed: {
    activeItem: function activeItem() {
      return this.value[this.activeIndex];
    },
    ariaSlideLabel: function ariaSlideLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slide : void 0;
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
var _hoisted_1$3 = ["disabled"];
var _hoisted_2$2 = ["id", "aria-label", "aria-roledescription"];
var _hoisted_3$2 = ["disabled"];
var _hoisted_4$1 = ["aria-label", "aria-selected", "aria-controls", "onClick", "onMouseenter", "onKeydown", "data-p-active"];
var _hoisted_5 = ["tabindex"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("itemsContainer")
  }, _ctx.ptm("itemsContainer")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("items")
  }, _ctx.ptm("items")), [$props.showItemNavigators ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    type: "button",
    "class": _ctx.cx("prevButton"),
    onClick: _cache[0] || (_cache[0] = function($event) {
      return $options.navBackward($event);
    }),
    disabled: $options.isNavBackwardDisabled()
  }, _ctx.ptm("prevButton"), {
    "data-pc-group-section": "itemnavigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.templates.previousitemicon || "ChevronLeftIcon"), mergeProps({
    "class": _ctx.cx("prevIcon")
  }, _ctx.ptm("prevIcon")), null, 16, ["class"]))], 16, _hoisted_1$3)), [[_directive_ripple]]) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    id: $props.id + "_item_" + $props.activeIndex,
    "class": _ctx.cx("item"),
    role: "group",
    "aria-label": $options.ariaSlideNumber($props.activeIndex + 1),
    "aria-roledescription": $options.ariaSlideLabel
  }, _ctx.ptm("item")), [$props.templates.item ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
    key: 0,
    item: $options.activeItem
  }, null, 8, ["item"])) : createCommentVNode("", true)], 16, _hoisted_2$2), $props.showItemNavigators ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 1,
    type: "button",
    "class": _ctx.cx("nextButton"),
    onClick: _cache[1] || (_cache[1] = function($event) {
      return $options.navForward($event);
    }),
    disabled: $options.isNavForwardDisabled()
  }, _ctx.ptm("nextButton"), {
    "data-pc-group-section": "itemnavigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.templates.nextitemicon || "ChevronRightIcon"), mergeProps({
    "class": _ctx.cx("nextIcon")
  }, _ctx.ptm("nextIcon")), null, 16, ["class"]))], 16, _hoisted_3$2)), [[_directive_ripple]]) : createCommentVNode("", true), $props.templates["caption"] ? (openBlock(), createElementBlock("div", mergeProps({
    key: 2,
    "class": _ctx.cx("caption")
  }, _ctx.ptm("caption")), [$props.templates.caption ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.caption), {
    key: 0,
    item: $options.activeItem
  }, null, 8, ["item"])) : createCommentVNode("", true)], 16)) : createCommentVNode("", true)], 16), $props.showIndicators ? (openBlock(), createElementBlock("ul", mergeProps({
    key: 0,
    ref: "indicatorContent",
    "class": _ctx.cx("indicatorList")
  }, _ctx.ptm("indicatorList")), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.value, function(item, index) {
    return openBlock(), createElementBlock("li", mergeProps({
      key: "p-galleria-indicator-".concat(index),
      "class": _ctx.cx("indicator", {
        index
      }),
      "aria-label": $options.ariaPageLabel(index + 1),
      "aria-selected": $props.activeIndex === index,
      "aria-controls": $props.id + "_item_" + index,
      onClick: function onClick($event) {
        return $options.onIndicatorClick(index);
      },
      onMouseenter: function onMouseenter($event) {
        return $options.onIndicatorMouseEnter(index);
      },
      onKeydown: function onKeydown($event) {
        return $options.onIndicatorKeyDown($event, index);
      },
      ref_for: true
    }, _ctx.ptm("indicator", $options.getIndicatorPTOptions(index)), {
      "data-p-active": $options.isIndicatorItemActive(index)
    }), [!$props.templates["indicator"] ? (openBlock(), createElementBlock("button", mergeProps({
      key: 0,
      type: "button",
      tabindex: $props.activeIndex === index ? "0" : "-1",
      "class": _ctx.cx("indicatorButton"),
      ref_for: true
    }, _ctx.ptm("indicatorButton", $options.getIndicatorPTOptions(index))), null, 16, _hoisted_5)) : createCommentVNode("", true), $props.templates.indicator ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.indicator), {
      key: 1,
      index
    }, null, 8, ["index"])) : createCommentVNode("", true)], 16, _hoisted_4$1);
  }), 128))], 16)) : createCommentVNode("", true)], 16);
}
script$3.render = render$3;
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
var script$2 = {
  name: "GalleriaThumbnails",
  hostName: "Galleria",
  "extends": script,
  emits: ["stop-slideshow", "update:activeIndex"],
  props: {
    containerId: {
      type: String,
      "default": null
    },
    value: {
      type: Array,
      "default": null
    },
    numVisible: {
      type: Number,
      "default": 3
    },
    activeIndex: {
      type: Number,
      "default": 0
    },
    isVertical: {
      type: Boolean,
      "default": false
    },
    slideShowActive: {
      type: Boolean,
      "default": false
    },
    circular: {
      type: Boolean,
      "default": false
    },
    responsiveOptions: {
      type: Array,
      "default": null
    },
    contentHeight: {
      type: String,
      "default": "300px"
    },
    showThumbnailNavigators: {
      type: Boolean,
      "default": true
    },
    templates: {
      type: null,
      "default": null
    },
    prevButtonProps: {
      type: null,
      "default": null
    },
    nextButtonProps: {
      type: null,
      "default": null
    }
  },
  startPos: null,
  thumbnailsStyle: null,
  sortedResponsiveOptions: null,
  data: function data() {
    return {
      d_numVisible: this.numVisible,
      d_oldNumVisible: this.numVisible,
      d_activeIndex: this.activeIndex,
      d_oldActiveItemIndex: this.activeIndex,
      totalShiftedItems: 0,
      page: 0
    };
  },
  watch: {
    numVisible: function numVisible(newValue, oldValue) {
      this.d_numVisible = newValue;
      this.d_oldNumVisible = oldValue;
    },
    activeIndex: function activeIndex(newValue, oldValue) {
      this.d_activeIndex = newValue;
      this.d_oldActiveItemIndex = oldValue;
    }
  },
  mounted: function mounted3() {
    this.createStyle();
    this.calculatePosition();
    if (this.responsiveOptions) {
      this.bindDocumentListeners();
    }
  },
  updated: function updated2() {
    var totalShiftedItems = this.totalShiftedItems;
    if (this.d_oldNumVisible !== this.d_numVisible || this.d_oldActiveItemIndex !== this.d_activeIndex) {
      if (this.d_activeIndex <= this.getMedianItemIndex()) {
        totalShiftedItems = 0;
      } else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this.d_activeIndex) {
        totalShiftedItems = this.d_numVisible - this.value.length;
      } else if (this.value.length - this.d_numVisible < this.d_activeIndex && this.d_numVisible % 2 === 0) {
        totalShiftedItems = this.d_activeIndex * -1 + this.getMedianItemIndex() + 1;
      } else {
        totalShiftedItems = this.d_activeIndex * -1 + this.getMedianItemIndex();
      }
      if (totalShiftedItems !== this.totalShiftedItems) {
        this.totalShiftedItems = totalShiftedItems;
      }
      this.$refs.itemsContainer.style.transform = this.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
      if (this.d_oldActiveItemIndex !== this.d_activeIndex) {
        document.body.setAttribute("data-p-items-hidden", "false");
        !this.isUnstyled && removeClass(this.$refs.itemsContainer, "p-items-hidden");
        this.$refs.itemsContainer.style.transition = "transform 500ms ease 0s";
      }
      this.d_oldActiveItemIndex = this.d_activeIndex;
      this.d_oldNumVisible = this.d_numVisible;
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.responsiveOptions) {
      this.unbindDocumentListeners();
    }
    if (this.thumbnailsStyle) {
      this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
    }
  },
  methods: {
    step: function step(dir) {
      var totalShiftedItems = this.totalShiftedItems + dir;
      if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > this.value.length - 1) {
        totalShiftedItems = this.d_numVisible - this.value.length;
      } else if (dir > 0 && totalShiftedItems > 0) {
        totalShiftedItems = 0;
      }
      if (this.circular) {
        if (dir < 0 && this.value.length - 1 === this.d_activeIndex) {
          totalShiftedItems = 0;
        } else if (dir > 0 && this.d_activeIndex === 0) {
          totalShiftedItems = this.d_numVisible - this.value.length;
        }
      }
      if (this.$refs.itemsContainer) {
        document.body.setAttribute("data-p-items-hidden", "false");
        !this.isUnstyled && removeClass(this.$refs.itemsContainer, "p-items-hidden");
        this.$refs.itemsContainer.style.transform = this.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
        this.$refs.itemsContainer.style.transition = "transform 500ms ease 0s";
      }
      this.totalShiftedItems = totalShiftedItems;
    },
    stopSlideShow: function stopSlideShow2() {
      if (this.slideShowActive && this.stopSlideShow) {
        this.$emit("stop-slideshow");
      }
    },
    getMedianItemIndex: function getMedianItemIndex() {
      var index = Math.floor(this.d_numVisible / 2);
      return this.d_numVisible % 2 ? index : index - 1;
    },
    navBackward: function navBackward2(e) {
      this.stopSlideShow();
      var prevItemIndex = this.d_activeIndex !== 0 ? this.d_activeIndex - 1 : 0;
      var diff = prevItemIndex + this.totalShiftedItems;
      if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
        this.step(1);
      }
      var activeIndex2 = this.circular && this.d_activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
      this.$emit("update:activeIndex", activeIndex2);
      if (e.cancelable) {
        e.preventDefault();
      }
    },
    navForward: function navForward2(e) {
      this.stopSlideShow();
      var nextItemIndex = this.d_activeIndex === this.value.length - 1 ? this.value.length - 1 : this.d_activeIndex + 1;
      if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
        this.step(-1);
      }
      var activeIndex2 = this.circular && this.value.length - 1 === this.d_activeIndex ? 0 : nextItemIndex;
      this.$emit("update:activeIndex", activeIndex2);
      if (e.cancelable) {
        e.preventDefault();
      }
    },
    onItemClick: function onItemClick(index) {
      this.stopSlideShow();
      var selectedItemIndex = index;
      if (selectedItemIndex !== this.d_activeIndex) {
        var diff = selectedItemIndex + this.totalShiftedItems;
        var dir = 0;
        if (selectedItemIndex < this.d_activeIndex) {
          dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();
          if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
            this.step(dir);
          }
        } else {
          dir = this.getMedianItemIndex() - diff;
          if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
            this.step(dir);
          }
        }
        this.$emit("update:activeIndex", selectedItemIndex);
      }
    },
    onThumbnailKeydown: function onThumbnailKeydown(event, index) {
      if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") {
        this.onItemClick(index);
        event.preventDefault();
      }
      switch (event.code) {
        case "ArrowRight":
          this.onRightKey();
          break;
        case "ArrowLeft":
          this.onLeftKey();
          break;
        case "Home":
          this.onHomeKey();
          event.preventDefault();
          break;
        case "End":
          this.onEndKey();
          event.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          break;
        case "Tab":
          this.onTabKey();
          break;
      }
    },
    onRightKey: function onRightKey2() {
      var indicators = find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]');
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, activeIndex2 + 1 === indicators.length ? indicators.length - 1 : activeIndex2 + 1);
    },
    onLeftKey: function onLeftKey2() {
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, activeIndex2 - 1 <= 0 ? 0 : activeIndex2 - 1);
    },
    onHomeKey: function onHomeKey2() {
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, 0);
    },
    onEndKey: function onEndKey2() {
      var indicators = find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]');
      var activeIndex2 = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex2, indicators.length - 1);
    },
    onTabKey: function onTabKey2() {
      var indicators = _toConsumableArray(find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]'));
      var highlightedIndex = indicators.findIndex(function(ind) {
        return getAttribute(ind, "data-p-active") === true;
      });
      var activeIndicator = findSingle(this.$refs.itemsContainer, '[tabindex="0"]');
      var activeIndex2 = indicators.findIndex(function(ind) {
        return ind === activeIndicator.parentElement;
      });
      indicators[activeIndex2].children[0].tabIndex = "-1";
      indicators[highlightedIndex].children[0].tabIndex = "0";
    },
    findFocusedIndicatorIndex: function findFocusedIndicatorIndex2() {
      var indicators = _toConsumableArray(find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]'));
      var activeIndicator = findSingle(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');
      return indicators.findIndex(function(ind) {
        return ind === activeIndicator.parentElement;
      });
    },
    changedFocusedIndicator: function changedFocusedIndicator2(prevInd, nextInd) {
      var indicators = find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]');
      indicators[prevInd].children[0].tabIndex = "-1";
      indicators[nextInd].children[0].tabIndex = "0";
      indicators[nextInd].children[0].focus();
    },
    onTransitionEnd: function onTransitionEnd(e) {
      if (this.$refs.itemsContainer && e.propertyName === "transform") {
        document.body.setAttribute("data-p-items-hidden", "true");
        !this.isUnstyled && addClass(this.$refs.itemsContainer, "p-items-hidden");
        this.$refs.itemsContainer.style.transition = "";
      }
    },
    onTouchStart: function onTouchStart(e) {
      var touchobj = e.changedTouches[0];
      this.startPos = {
        x: touchobj.pageX,
        y: touchobj.pageY
      };
    },
    onTouchMove: function onTouchMove(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
    },
    onTouchEnd: function onTouchEnd(e) {
      var touchobj = e.changedTouches[0];
      if (this.isVertical) {
        this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
      } else {
        this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
      }
    },
    changePageOnTouch: function changePageOnTouch(e, diff) {
      if (diff < 0) {
        this.navForward(e);
      } else {
        this.navBackward(e);
      }
    },
    getTotalPageNumber: function getTotalPageNumber() {
      return this.value.length > this.d_numVisible ? this.value.length - this.d_numVisible + 1 : 0;
    },
    createStyle: function createStyle() {
      if (!this.thumbnailsStyle) {
        var _this$$primevue;
        this.thumbnailsStyle = document.createElement("style");
        this.thumbnailsStyle.type = "text/css";
        setAttribute(this.thumbnailsStyle, "nonce", (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
        document.body.appendChild(this.thumbnailsStyle);
      }
      var innerHTML = "\n                #".concat(this.containerId, ' [data-pc-section="thumbnailitem"] {\n                    flex: 1 0 ').concat(100 / this.d_numVisible, "%\n                }\n            ");
      if (this.responsiveOptions && !this.isUnstyled) {
        this.sortedResponsiveOptions = _toConsumableArray(this.responsiveOptions);
        var comparer = localeComparator();
        this.sortedResponsiveOptions.sort(function(data1, data22) {
          var value1 = data1.breakpoint;
          var value2 = data22.breakpoint;
          return sort(value1, value2, -1, comparer);
        });
        for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
          var res = this.sortedResponsiveOptions[i];
          innerHTML += "\n                        @media screen and (max-width: ".concat(res.breakpoint, ") {\n                            #").concat(this.containerId, " .p-galleria-thumbnail-item {\n                                flex: 1 0 ").concat(100 / res.numVisible, "%\n                            }\n                        }\n                    ");
        }
      }
      this.thumbnailsStyle.innerHTML = innerHTML;
    },
    calculatePosition: function calculatePosition() {
      if (this.$refs.itemsContainer && this.sortedResponsiveOptions) {
        var windowWidth = window.innerWidth;
        var matchedResponsiveData = {
          numVisible: this.numVisible
        };
        for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
          var res = this.sortedResponsiveOptions[i];
          if (parseInt(res.breakpoint, 10) >= windowWidth) {
            matchedResponsiveData = res;
          }
        }
        if (this.d_numVisible !== matchedResponsiveData.numVisible) {
          this.d_numVisible = matchedResponsiveData.numVisible;
        }
      }
    },
    bindDocumentListeners: function bindDocumentListeners() {
      var _this = this;
      if (!this.documentResizeListener) {
        this.documentResizeListener = function() {
          _this.calculatePosition();
        };
        window.addEventListener("resize", this.documentResizeListener);
      }
    },
    unbindDocumentListeners: function unbindDocumentListeners() {
      if (this.documentResizeListener) {
        window.removeEventListener("resize", this.documentResizeListener);
        this.documentResizeListener = null;
      }
    },
    isNavBackwardDisabled: function isNavBackwardDisabled2() {
      return !this.circular && this.d_activeIndex === 0 || this.value.length <= this.d_numVisible;
    },
    isNavForwardDisabled: function isNavForwardDisabled2() {
      return !this.circular && this.d_activeIndex === this.value.length - 1 || this.value.length <= this.d_numVisible;
    },
    firstItemAciveIndex: function firstItemAciveIndex() {
      return this.totalShiftedItems * -1;
    },
    lastItemActiveIndex: function lastItemActiveIndex() {
      return this.firstItemAciveIndex() + this.d_numVisible - 1;
    },
    isItemActive: function isItemActive(index) {
      return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    },
    ariaPageLabel: function ariaPageLabel2(value) {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : void 0;
    }
  },
  computed: {
    ariaPrevButtonLabel: function ariaPrevButtonLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.prevPageLabel : void 0;
    },
    ariaNextButtonLabel: function ariaNextButtonLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.nextPageLabel : void 0;
    }
  },
  components: {
    ChevronLeftIcon: script3,
    ChevronRightIcon: script4,
    ChevronUpIcon: script8,
    ChevronDownIcon: script7
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1$2 = ["disabled", "aria-label"];
var _hoisted_2$1 = ["data-p-active", "aria-selected", "aria-controls", "onKeydown", "data-p-galleria-thumbnail-item-current", "data-p-galleria-thumbnail-item-active", "data-p-galleria-thumbnail-item-start", "data-p-galleria-thumbnail-item-end"];
var _hoisted_3$1 = ["tabindex", "aria-label", "aria-current", "onClick"];
var _hoisted_4 = ["disabled", "aria-label"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("thumbnails")
  }, _ctx.ptm("thumbnails")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("thumbnailContent")
  }, _ctx.ptm("thumbnailContent")), [$props.showThumbnailNavigators ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    "class": _ctx.cx("thumbnailPrevButton"),
    disabled: $options.isNavBackwardDisabled(),
    type: "button",
    "aria-label": $options.ariaPrevButtonLabel,
    onClick: _cache[0] || (_cache[0] = function($event) {
      return $options.navBackward($event);
    })
  }, _objectSpread$2(_objectSpread$2({}, $props.prevButtonProps), _ctx.ptm("thumbnailPrevButton")), {
    "data-pc-group-section": "thumbnailnavigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.templates.previousthumbnailicon || ($props.isVertical ? "ChevronUpIcon" : "ChevronLeftIcon")), mergeProps({
    "class": _ctx.cx("thumbnailPrevIcon")
  }, _ctx.ptm("thumbnailPrevIcon")), null, 16, ["class"]))], 16, _hoisted_1$2)), [[_directive_ripple]]) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("thumbnailsViewport"),
    style: {
      height: $props.isVertical ? $props.contentHeight : ""
    }
  }, _ctx.ptm("thumbnailsViewport")), [createBaseVNode("div", mergeProps({
    ref: "itemsContainer",
    "class": _ctx.cx("thumbnailItems"),
    role: "tablist",
    onTransitionend: _cache[1] || (_cache[1] = function($event) {
      return $options.onTransitionEnd($event);
    }),
    onTouchstart: _cache[2] || (_cache[2] = function($event) {
      return $options.onTouchStart($event);
    }),
    onTouchmove: _cache[3] || (_cache[3] = function($event) {
      return $options.onTouchMove($event);
    }),
    onTouchend: _cache[4] || (_cache[4] = function($event) {
      return $options.onTouchEnd($event);
    })
  }, _ctx.ptm("thumbnailItems")), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.value, function(item, index) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: "p-galleria-thumbnail-item-".concat(index),
      "class": _ctx.cx("thumbnailItem", {
        index,
        activeIndex: $props.activeIndex
      }),
      role: "tab",
      "data-p-active": $props.activeIndex === index,
      "aria-selected": $props.activeIndex === index,
      "aria-controls": $props.containerId + "_item_" + index,
      onKeydown: function onKeydown($event) {
        return $options.onThumbnailKeydown($event, index);
      },
      ref_for: true
    }, _ctx.ptm("thumbnailItem"), {
      "data-p-galleria-thumbnail-item-current": $props.activeIndex === index,
      "data-p-galleria-thumbnail-item-active": $options.isItemActive(index),
      "data-p-galleria-thumbnail-item-start": $options.firstItemAciveIndex() === index,
      "data-p-galleria-thumbnail-item-end": $options.lastItemActiveIndex() === index
    }), [createBaseVNode("div", mergeProps({
      "class": _ctx.cx("thumbnail"),
      tabindex: $props.activeIndex === index ? "0" : "-1",
      "aria-label": $options.ariaPageLabel(index + 1),
      "aria-current": $props.activeIndex === index ? "page" : void 0,
      onClick: function onClick($event) {
        return $options.onItemClick(index);
      },
      ref_for: true
    }, _ctx.ptm("thumbnail")), [$props.templates.thumbnail ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.thumbnail), {
      key: 0,
      item
    }, null, 8, ["item"])) : createCommentVNode("", true)], 16, _hoisted_3$1)], 16, _hoisted_2$1);
  }), 128))], 16)], 16), $props.showThumbnailNavigators ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 1,
    "class": _ctx.cx("thumbnailNextButton"),
    disabled: $options.isNavForwardDisabled(),
    type: "button",
    "aria-label": $options.ariaNextButtonLabel,
    onClick: _cache[5] || (_cache[5] = function($event) {
      return $options.navForward($event);
    })
  }, _objectSpread$2(_objectSpread$2({}, $props.nextButtonProps), _ctx.ptm("thumbnailNextButton")), {
    "data-pc-group-section": "thumbnailnavigator"
  }), [(openBlock(), createBlock(resolveDynamicComponent($props.templates.nextthumbnailicon || ($props.isVertical ? "ChevronDownIcon" : "ChevronRightIcon")), mergeProps({
    "class": _ctx.cx("thumbnailNextIcon")
  }, _ctx.ptm("thumbnailNextIcon")), null, 16, ["class"]))], 16, _hoisted_4)), [[_directive_ripple]]) : createCommentVNode("", true)], 16)], 16);
}
script$2.render = render$2;
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$1 = {
  name: "GalleriaContent",
  hostName: "Galleria",
  "extends": script,
  inheritAttrs: false,
  interval: null,
  emits: ["activeitem-change", "mask-hide"],
  data: function data2() {
    return {
      id: this.$attrs.id || UniqueComponentId(),
      activeIndex: this.$attrs.activeIndex,
      numVisible: this.$attrs.numVisible,
      slideShowActive: false
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    "$attrs.value": function $attrsValue(newVal) {
      if (newVal && newVal.length < this.numVisible) {
        this.numVisible = newVal.length;
      }
    },
    "$attrs.activeIndex": function $attrsActiveIndex(newVal) {
      this.activeIndex = newVal;
    },
    "$attrs.numVisible": function $attrsNumVisible(newVal) {
      this.numVisible = newVal;
    },
    "$attrs.autoPlay": function $attrsAutoPlay(newVal) {
      newVal ? this.startSlideShow() : this.stopSlideShow();
    }
  },
  mounted: function mounted4() {
    this.id = this.id || UniqueComponentId();
  },
  updated: function updated3() {
    this.$emit("activeitem-change", this.activeIndex);
  },
  beforeUnmount: function beforeUnmount2() {
    if (this.slideShowActive) {
      this.stopSlideShow();
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        props: _objectSpread$1(_objectSpread$1({}, this.$attrs), {}, {
          pt: this.pt,
          unstyled: this.unstyled
        })
      });
    },
    isAutoPlayActive: function isAutoPlayActive() {
      return this.slideShowActive;
    },
    startSlideShow: function startSlideShow() {
      var _this = this;
      this.interval = setInterval(function() {
        var activeIndex2 = _this.$attrs.circular && _this.$attrs.value.length - 1 === _this.activeIndex ? 0 : _this.activeIndex + 1;
        _this.activeIndex = activeIndex2;
      }, this.$attrs.transitionInterval);
      this.slideShowActive = true;
    },
    stopSlideShow: function stopSlideShow3() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.slideShowActive = false;
    },
    getPositionClass: function getPositionClass(preClassName, position) {
      var positions = ["top", "left", "bottom", "right"];
      var pos = positions.find(function(item) {
        return item === position;
      });
      return pos ? "".concat(preClassName, "-").concat(pos) : "";
    },
    isVertical: function isVertical() {
      return this.$attrs.thumbnailsPosition === "left" || this.$attrs.thumbnailsPosition === "right";
    }
  },
  computed: {
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    }
  },
  components: {
    GalleriaItem: script$3,
    GalleriaThumbnails: script$2,
    TimesIcon: script6
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1$1 = ["id", "aria-label", "aria-roledescription"];
var _hoisted_2 = ["aria-label"];
var _hoisted_3 = ["aria-live"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_GalleriaItem = resolveComponent("GalleriaItem");
  var _component_GalleriaThumbnails = resolveComponent("GalleriaThumbnails");
  var _directive_ripple = resolveDirective("ripple");
  return _ctx.$attrs.value && _ctx.$attrs.value.length > 0 ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    id: $data.id,
    role: "region",
    "class": [_ctx.cx("root"), _ctx.$attrs.containerClass],
    style: _ctx.$attrs.containerStyle,
    "aria-label": _ctx.$attrs.ariaLabel,
    "aria-roledescription": _ctx.$attrs.ariaRoledescription
  }, _objectSpread2(_objectSpread2({}, _ctx.$attrs.containerProps), $options.getPTOptions("root"))), [_ctx.$attrs.fullScreen ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    autofocus: "",
    type: "button",
    "class": _ctx.cx("closeButton"),
    "aria-label": $options.closeAriaLabel,
    onClick: _cache[0] || (_cache[0] = function($event) {
      return _ctx.$emit("mask-hide");
    })
  }, $options.getPTOptions("closeButton")), [(openBlock(), createBlock(resolveDynamicComponent(_ctx.$attrs.templates["closeicon"] || "TimesIcon"), mergeProps({
    "class": _ctx.cx("closeIcon")
  }, $options.getPTOptions("closeIcon")), null, 16, ["class"]))], 16, _hoisted_2)), [[_directive_ripple]]) : createCommentVNode("", true), _ctx.$attrs.templates && _ctx.$attrs.templates["header"] ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx("header")
  }, $options.getPTOptions("header")), [(openBlock(), createBlock(resolveDynamicComponent(_ctx.$attrs.templates["header"])))], 16)) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("content"),
    "aria-live": _ctx.$attrs.autoPlay ? "polite" : "off"
  }, $options.getPTOptions("content")), [createVNode(_component_GalleriaItem, {
    id: $data.id,
    activeIndex: $data.activeIndex,
    "onUpdate:activeIndex": _cache[1] || (_cache[1] = function($event) {
      return $data.activeIndex = $event;
    }),
    slideShowActive: $data.slideShowActive,
    "onUpdate:slideShowActive": _cache[2] || (_cache[2] = function($event) {
      return $data.slideShowActive = $event;
    }),
    value: _ctx.$attrs.value,
    circular: _ctx.$attrs.circular,
    templates: _ctx.$attrs.templates,
    showIndicators: _ctx.$attrs.showIndicators,
    changeItemOnIndicatorHover: _ctx.$attrs.changeItemOnIndicatorHover,
    showItemNavigators: _ctx.$attrs.showItemNavigators,
    autoPlay: _ctx.$attrs.autoPlay,
    onStartSlideshow: $options.startSlideShow,
    onStopSlideshow: $options.stopSlideShow,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, null, 8, ["id", "activeIndex", "slideShowActive", "value", "circular", "templates", "showIndicators", "changeItemOnIndicatorHover", "showItemNavigators", "autoPlay", "onStartSlideshow", "onStopSlideshow", "pt", "unstyled"]), _ctx.$attrs.showThumbnails ? (openBlock(), createBlock(_component_GalleriaThumbnails, {
    key: 0,
    activeIndex: $data.activeIndex,
    "onUpdate:activeIndex": _cache[3] || (_cache[3] = function($event) {
      return $data.activeIndex = $event;
    }),
    slideShowActive: $data.slideShowActive,
    "onUpdate:slideShowActive": _cache[4] || (_cache[4] = function($event) {
      return $data.slideShowActive = $event;
    }),
    containerId: $data.id,
    value: _ctx.$attrs.value,
    templates: _ctx.$attrs.templates,
    numVisible: $data.numVisible,
    responsiveOptions: _ctx.$attrs.responsiveOptions,
    circular: _ctx.$attrs.circular,
    isVertical: $options.isVertical(),
    contentHeight: _ctx.$attrs.verticalThumbnailViewPortHeight,
    showThumbnailNavigators: _ctx.$attrs.showThumbnailNavigators,
    prevButtonProps: _ctx.$attrs.prevButtonProps,
    nextButtonProps: _ctx.$attrs.nextButtonProps,
    onStopSlideshow: $options.stopSlideShow,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, null, 8, ["activeIndex", "slideShowActive", "containerId", "value", "templates", "numVisible", "responsiveOptions", "circular", "isVertical", "contentHeight", "showThumbnailNavigators", "prevButtonProps", "nextButtonProps", "onStopSlideshow", "pt", "unstyled"])) : createCommentVNode("", true)], 16, _hoisted_3), _ctx.$attrs.templates && _ctx.$attrs.templates["footer"] ? (openBlock(), createElementBlock("div", mergeProps({
    key: 2,
    "class": _ctx.cx("footer")
  }, $options.getPTOptions("footer")), [(openBlock(), createBlock(resolveDynamicComponent(_ctx.$attrs.templates["footer"])))], 16)) : createCommentVNode("", true)], 16, _hoisted_1$1)) : createCommentVNode("", true);
}
script$1.render = render$1;
var script9 = {
  name: "Galleria",
  "extends": script$4,
  inheritAttrs: false,
  emits: ["update:activeIndex", "update:visible"],
  container: null,
  mask: null,
  data: function data3() {
    return {
      containerVisible: this.visible
    };
  },
  updated: function updated4() {
    if (this.fullScreen && this.visible) {
      this.containerVisible = this.visible;
    }
  },
  beforeUnmount: function beforeUnmount3() {
    if (this.fullScreen) {
      unblockBodyScroll();
    }
    this.mask = null;
    if (this.container) {
      ZIndex.clear(this.container);
      this.container = null;
    }
  },
  methods: {
    onBeforeEnter: function onBeforeEnter(el) {
      ZIndex.set("modal", el, this.baseZIndex || this.$primevue.config.zIndex.modal);
    },
    onEnter: function onEnter(el) {
      this.mask.style.zIndex = String(parseInt(el.style.zIndex, 10) - 1);
      blockBodyScroll();
      this.focus();
    },
    onBeforeLeave: function onBeforeLeave() {
      !this.isUnstyled && addClass(this.mask, "p-overlay-mask-leave");
    },
    onAfterLeave: function onAfterLeave(el) {
      ZIndex.clear(el);
      this.containerVisible = false;
      unblockBodyScroll();
    },
    onActiveItemChange: function onActiveItemChange(index) {
      if (this.activeIndex !== index) {
        this.$emit("update:activeIndex", index);
      }
    },
    maskHide: function maskHide() {
      this.$emit("update:visible", false);
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    maskRef: function maskRef(el) {
      this.mask = el;
    },
    focus: function focus2() {
      var focusTarget = this.container.$el.querySelector("[autofocus]");
      if (focusTarget) {
        focusTarget.focus();
      }
    }
  },
  components: {
    GalleriaContent: script$1,
    Portal: script5
  },
  directives: {
    focustrap: FocusTrap
  }
};
var _hoisted_1 = ["aria-modal"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_GalleriaContent = resolveComponent("GalleriaContent");
  var _component_Portal = resolveComponent("Portal");
  var _directive_focustrap = resolveDirective("focustrap");
  return _ctx.fullScreen ? (openBlock(), createBlock(_component_Portal, {
    key: 0
  }, {
    "default": withCtx(function() {
      return [$data.containerVisible ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        ref: $options.maskRef,
        "class": [_ctx.cx("mask"), _ctx.maskClass],
        role: "dialog",
        "aria-modal": _ctx.fullScreen ? "true" : void 0
      }, _ctx.ptm("mask")), [createVNode(Transition, mergeProps({
        name: "p-galleria",
        onBeforeEnter: $options.onBeforeEnter,
        onEnter: $options.onEnter,
        onBeforeLeave: $options.onBeforeLeave,
        onAfterLeave: $options.onAfterLeave,
        appear: ""
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [_ctx.visible ? withDirectives((openBlock(), createBlock(_component_GalleriaContent, mergeProps({
            key: 0,
            ref: $options.containerRef,
            onMaskHide: $options.maskHide,
            templates: _ctx.$slots,
            onActiveitemChange: $options.onActiveItemChange,
            pt: _ctx.pt,
            unstyled: _ctx.unstyled
          }, _ctx.$props), null, 16, ["onMaskHide", "templates", "onActiveitemChange", "pt", "unstyled"])), [[_directive_focustrap]]) : createCommentVNode("", true)];
        }),
        _: 1
      }, 16, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onAfterLeave"])], 16, _hoisted_1)) : createCommentVNode("", true)];
    }),
    _: 1
  })) : (openBlock(), createBlock(_component_GalleriaContent, mergeProps({
    key: 1,
    templates: _ctx.$slots,
    onActiveitemChange: $options.onActiveItemChange,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, _ctx.$props), null, 16, ["templates", "onActiveitemChange", "pt", "unstyled"]));
}
script9.render = render2;
export {
  script9 as default
};
//# sourceMappingURL=primevue_galleria.js.map
