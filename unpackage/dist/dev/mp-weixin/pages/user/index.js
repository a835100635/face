"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { state, getters, dispatch } = common_vendor.useStore();
    const userInfo = common_vendor.computed(() => getters.getUserInfo);
    const minProgramLogin = (res) => {
      console.log(res);
      common_vendor.index.getProvider({
        service: "oauth",
        success: (res2) => {
          if (~res2.provider.indexOf("weixin")) {
            dispatch("loginAction", { userInfo });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(minProgramLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lichunlin/code/gitHub/face/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
