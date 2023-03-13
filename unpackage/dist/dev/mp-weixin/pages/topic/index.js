"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad(e) {
    common_vendor.index.setNavigationBarTitle({
      title: e.title
    });
    console.log(e);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "I:/face/pages/topic/index.vue"]]);
wx.createPage(MiniProgramPage);
