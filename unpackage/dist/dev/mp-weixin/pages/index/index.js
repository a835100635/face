"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_category = require("../../api/category.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../constans/index.js");
require("../../api/user.js");
require("../../store/modules/topic.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  _easycom_uni_badge2();
}
const _easycom_uni_badge = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_badge + fuiCol + fuiRow)();
}
const fuiRow = () => "../../components/firstui/fui-row/fui-row.js";
const fuiCol = () => "../../components/firstui/fui-col/fui-col.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isRefresher = common_vendor.ref(false);
    const data = common_vendor.ref([
      {
        label: "前端",
        type: 0,
        child: []
      },
      {
        label: "后端",
        type: 1,
        child: []
      }
    ]);
    const categoryList = async () => {
      const result = await api_category.getCategory();
      Object.keys(result).forEach((key) => {
        const _ = data.value.find((i) => i.type == key);
        _.child = result[key];
      });
    };
    categoryList();
    const category = common_vendor.computed(() => {
      return data.value.filter((_) => _.child.length > 1);
    });
    const handleSelect = (main, child) => {
      common_vendor.index.navigateTo({
        url: `/pages/topic/index?categoryId=${child.categoryId}&title=${child.categoryName}`
      });
    };
    const onPulling = (e) => {
      console.log("onPulling", e);
      isRefresher.value = true;
    };
    const onRefresh = (e) => {
      console.log("onRefresh", e);
      setTimeout(() => {
        isRefresher.value = false;
      }, 1e3);
    };
    const onRestore = (e) => {
      console.log("onRestore", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.p({
          text: "1"
        }),
        c: common_vendor.p({
          text: "2",
          type: "success"
        }),
        d: common_vendor.p({
          text: "3",
          type: "primary",
          inverted: true
        }),
        e: common_vendor.f(common_vendor.unref(category), (item, index, i0) => {
          return {
            a: common_vendor.f(item.child, (child, child_index, i1) => {
              return {
                a: common_vendor.n(`iconfont ${child.icon}`),
                b: common_vendor.t(child.categoryName),
                c: common_vendor.t(child.count),
                d: child.categoryId,
                e: common_vendor.o(($event) => handleSelect(item, child), child.categoryId),
                f: "1cf27b2a-4-" + i0 + "-" + i1 + "," + ("1cf27b2a-3-" + i0)
              };
            }),
            b: "1cf27b2a-3-" + i0,
            c: index
          };
        }),
        f: common_vendor.p({
          span: 12
        }),
        g: isRefresher.value,
        h: common_vendor.o(onPulling),
        i: common_vendor.o(onRefresh),
        j: common_vendor.o(onRestore)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/lichunlin/code/gitHub/face/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
