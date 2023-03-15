"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  onLoad(e) {
    common_vendor.index.setNavigationBarTitle({
      title: e.title
    });
    console.log(e);
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  setup(__props) {
    const total = common_vendor.ref(99);
    const handleSelect = (item, index) => {
      console.log(item, index);
      common_vendor.index.navigateTo({
        url: "/pages/detail/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(total.value),
        b: common_vendor.f(60, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: index,
            c: common_vendor.o(($event) => handleSelect(item, index), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lichunlin/code/gitHub/face/pages/topic/index.vue"]]);
wx.createPage(MiniProgramPage);
