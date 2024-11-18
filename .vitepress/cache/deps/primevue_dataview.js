import {
  script5 as script2
} from "./chunk-QN5DYCHP.js";
import "./chunk-YKV73SQT.js";
import "./chunk-4IRK5OKQ.js";
import "./chunk-GJ4M5ZQI.js";
import "./chunk-YRUPXRC4.js";
import "./chunk-JL7KU7RS.js";
import "./chunk-CXETA7UJ.js";
import "./chunk-VHCN4E3L.js";
import "./chunk-IAH4HJXH.js";
import "./chunk-TAUDC576.js";
import "./chunk-U6KWIEK7.js";
import "./chunk-PCPF6MCG.js";
import {
  script
} from "./chunk-HJIV2PMA.js";
import "./chunk-3NBT74VZ.js";
import {
  BaseStyle,
  localeComparator,
  resolveFieldData,
  sort
} from "./chunk-FMDU42L7.js";
import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  mergeProps,
  normalizeClass,
  openBlock,
  renderSlot,
  resolveComponent,
  toDisplayString,
  withCtx
} from "./chunk-5J2UBCUN.js";

// node_modules/primevue/dataview/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-dataview {\n    border-color: ".concat(dt("dataview.border.color"), ";\n    border-width: ").concat(dt("dataview.border.width"), ";\n    border-style: solid;\n    border-radius: ").concat(dt("dataview.border.radius"), ";\n    padding: ").concat(dt("dataview.padding"), ";\n}\n\n.p-dataview-header {\n    background: ").concat(dt("dataview.header.background"), ";\n    color: ").concat(dt("dataview.header.color"), ";\n    border-color: ").concat(dt("dataview.header.border.color"), ";\n    border-width: ").concat(dt("dataview.header.border.width"), ";\n    border-style: solid;\n    padding: ").concat(dt("dataview.header.padding"), ";\n    border-radius: ").concat(dt("dataview.header.border.radius"), ";\n}\n\n.p-dataview-content {\n    background: ").concat(dt("dataview.content.background"), ";\n    border-color: ").concat(dt("dataview.content.border.color"), ";\n    border-width: ").concat(dt("dataview.content.border.width"), ";\n    border-style: solid;\n    color: ").concat(dt("dataview.content.color"), ";\n    padding: ").concat(dt("dataview.content.padding"), ";\n    border-radius: ").concat(dt("dataview.content.border.radius"), ";\n}\n\n.p-dataview-footer {\n    background: ").concat(dt("dataview.footer.background"), ";\n    color: ").concat(dt("dataview.footer.color"), ";\n    border-color: ").concat(dt("dataview.footer.border.color"), ";\n    border-width: ").concat(dt("dataview.footer.border.width"), ";\n    border-style: solid;\n    padding: ").concat(dt("dataview.footer.padding"), ";\n    border-radius: ").concat(dt("dataview.footer.border.radius"), ";\n}\n\n.p-dataview-paginator-top {\n    border-width: ").concat(dt("dataview.paginator.top.border.width"), ";\n    border-color: ").concat(dt("dataview.paginator.top.border.color"), ";\n    border-style: solid;\n}\n\n.p-dataview-paginator-bottom {\n    border-width: ").concat(dt("dataview.paginator.bottom.border.width"), ";\n    border-color: ").concat(dt("dataview.paginator.bottom.border.color"), ";\n    border-style: solid;\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props;
    return ["p-dataview p-component", {
      "p-dataview-list": props.layout === "list",
      "p-dataview-grid": props.layout === "grid"
    }];
  },
  header: "p-dataview-header",
  pcPaginator: function pcPaginator(_ref3) {
    var position = _ref3.position;
    return "p-dataview-paginator-" + position;
  },
  content: "p-dataview-content",
  emptyMessage: "p-dataview-empty-message",
  // TODO: remove?
  footer: "p-dataview-footer"
};
var DataViewStyle = BaseStyle.extend({
  name: "dataview",
  theme,
  classes
});

// node_modules/primevue/dataview/index.mjs
var script$1 = {
  name: "BaseDataView",
  "extends": script,
  props: {
    value: {
      type: Array,
      "default": null
    },
    layout: {
      type: String,
      "default": "list"
    },
    rows: {
      type: Number,
      "default": 0
    },
    first: {
      type: Number,
      "default": 0
    },
    totalRecords: {
      type: Number,
      "default": 0
    },
    paginator: {
      type: Boolean,
      "default": false
    },
    paginatorPosition: {
      type: String,
      "default": "bottom"
    },
    alwaysShowPaginator: {
      type: Boolean,
      "default": true
    },
    paginatorTemplate: {
      type: String,
      "default": "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    },
    pageLinkSize: {
      type: Number,
      "default": 5
    },
    rowsPerPageOptions: {
      type: Array,
      "default": null
    },
    currentPageReportTemplate: {
      type: String,
      "default": "({currentPage} of {totalPages})"
    },
    sortField: {
      type: [String, Function],
      "default": null
    },
    sortOrder: {
      type: Number,
      "default": null
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    dataKey: {
      type: String,
      "default": null
    }
  },
  style: DataViewStyle,
  provide: function provide() {
    return {
      $pcDataView: this,
      $parentInstance: this
    };
  }
};
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
var script3 = {
  name: "DataView",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:first", "update:rows", "page"],
  data: function data() {
    return {
      d_first: this.first,
      d_rows: this.rows
    };
  },
  watch: {
    first: function first(newValue) {
      this.d_first = newValue;
    },
    rows: function rows(newValue) {
      this.d_rows = newValue;
    },
    sortField: function sortField() {
      this.resetPage();
    },
    sortOrder: function sortOrder() {
      this.resetPage();
    }
  },
  methods: {
    getKey: function getKey(item, index) {
      return this.dataKey ? resolveFieldData(item, this.dataKey) : index;
    },
    onPage: function onPage(event) {
      this.d_first = event.first;
      this.d_rows = event.rows;
      this.$emit("update:first", this.d_first);
      this.$emit("update:rows", this.d_rows);
      this.$emit("page", event);
    },
    sort: function sort$1() {
      var _this = this;
      if (this.value) {
        var value = _toConsumableArray(this.value);
        var comparer = localeComparator();
        value.sort(function(data1, data2) {
          var value1 = resolveFieldData(data1, _this.sortField);
          var value2 = resolveFieldData(data2, _this.sortField);
          return sort(value1, value2, _this.sortOrder, comparer);
        });
        return value;
      } else {
        return null;
      }
    },
    resetPage: function resetPage() {
      this.d_first = 0;
      this.$emit("update:first", this.d_first);
    }
  },
  computed: {
    getTotalRecords: function getTotalRecords() {
      if (this.totalRecords) return this.totalRecords;
      else return this.value ? this.value.length : 0;
    },
    empty: function empty() {
      return !this.value || this.value.length === 0;
    },
    emptyMessageText: function emptyMessageText() {
      var _this$$primevue$confi;
      return ((_this$$primevue$confi = this.$primevue.config) === null || _this$$primevue$confi === void 0 || (_this$$primevue$confi = _this$$primevue$confi.locale) === null || _this$$primevue$confi === void 0 ? void 0 : _this$$primevue$confi.emptyMessage) || "";
    },
    paginatorTop: function paginatorTop() {
      return this.paginator && (this.paginatorPosition !== "bottom" || this.paginatorPosition === "both");
    },
    paginatorBottom: function paginatorBottom() {
      return this.paginator && (this.paginatorPosition !== "top" || this.paginatorPosition === "both");
    },
    items: function items() {
      if (this.value && this.value.length) {
        var data2 = this.value;
        if (data2 && data2.length && this.sortField) {
          data2 = this.sort();
        }
        if (this.paginator) {
          var first2 = this.lazy ? 0 : this.d_first;
          return data2.slice(first2, first2 + this.d_rows);
        } else {
          return data2;
        }
      } else {
        return null;
      }
    }
  },
  components: {
    DVPaginator: script2
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DVPaginator = resolveComponent("DVPaginator");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [_ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("header")
  }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), $options.paginatorTop ? (openBlock(), createBlock(_component_DVPaginator, {
    key: 1,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.getTotalRecords,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx("pcPaginator", {
      position: "top"
    })),
    alwaysShow: _ctx.alwaysShowPaginator,
    onPage: _cache[0] || (_cache[0] = function($event) {
      return $options.onPage($event);
    }),
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm("pcPaginator")
  }, createSlots({
    _: 2
  }, [_ctx.$slots.paginatorcontainer ? {
    name: "container",
    fn: withCtx(function(slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorcontainer", {
        first: slotProps.first,
        last: slotProps.last,
        rows: slotProps.rows,
        page: slotProps.page,
        pageCount: slotProps.pageCount,
        totalRecords: slotProps.totalRecords,
        firstPageCallback: slotProps.firstPageCallback,
        lastPageCallback: slotProps.lastPageCallback,
        prevPageCallback: slotProps.prevPageCallback,
        nextPageCallback: slotProps.nextPageCallback,
        rowChangeCallback: slotProps.rowChangeCallback
      })];
    }),
    key: "0"
  } : void 0, _ctx.$slots.paginatorstart ? {
    name: "start",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "1"
  } : void 0, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "2"
  } : void 0]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("content")
  }, _ctx.ptm("content")), [!$options.empty ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [_ctx.$slots.list && _ctx.layout === "list" ? renderSlot(_ctx.$slots, "list", {
    key: 0,
    items: $options.items
  }) : createCommentVNode("", true), _ctx.$slots.grid && _ctx.layout === "grid" ? renderSlot(_ctx.$slots, "grid", {
    key: 1,
    items: $options.items
  }) : createCommentVNode("", true)], 64)) : (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx("emptyMessage")
  }, _ctx.ptm("emptyMessage")), [renderSlot(_ctx.$slots, "empty", {
    layout: _ctx.layout
  }, function() {
    return [createTextVNode(toDisplayString($options.emptyMessageText), 1)];
  })], 16))], 16), $options.paginatorBottom ? (openBlock(), createBlock(_component_DVPaginator, {
    key: 2,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.getTotalRecords,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx("pcPaginator", {
      position: "bottom"
    })),
    alwaysShow: _ctx.alwaysShowPaginator,
    onPage: _cache[1] || (_cache[1] = function($event) {
      return $options.onPage($event);
    }),
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm("pcPaginator")
  }, createSlots({
    _: 2
  }, [_ctx.$slots.paginatorcontainer ? {
    name: "container",
    fn: withCtx(function(slotProps) {
      return [renderSlot(_ctx.$slots, "paginatorcontainer", {
        first: slotProps.first,
        last: slotProps.last,
        rows: slotProps.rows,
        page: slotProps.page,
        pageCount: slotProps.pageCount,
        totalRecords: slotProps.totalRecords,
        firstPageCallback: slotProps.firstPageCallback,
        lastPageCallback: slotProps.lastPageCallback,
        prevPageCallback: slotProps.prevPageCallback,
        nextPageCallback: slotProps.nextPageCallback,
        rowChangeCallback: slotProps.rowChangeCallback
      })];
    }),
    key: "0"
  } : void 0, _ctx.$slots.paginatorstart ? {
    name: "start",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "1"
  } : void 0, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "2"
  } : void 0]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : createCommentVNode("", true), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 3,
    "class": _ctx.cx("footer")
  }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 16);
}
script3.render = render;
export {
  script3 as default
};
//# sourceMappingURL=primevue_dataview.js.map
