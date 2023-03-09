"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { state, commit } = common_vendor.useStore();
    const avatarUrl = common_vendor.computed(() => {
      var _a, _b;
      return (_b = (_a = state == null ? void 0 : state.userInfo) == null ? void 0 : _a.userInfo) == null ? void 0 : _b.avatarUrl;
    });
    const getUserInfo = () => {
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "获取用户信息",
        success: (userInfo) => {
          console.log(userInfo, "userInfo");
          common_vendor.index.login({
            provider: "weixin",
            success: (loginInfo) => {
              console.log(loginInfo, "loginInfo");
            }
          });
        },
        fail: (err) => {
          console.log(err, "err");
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.o(getUserInfo)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lichunlin/code/gitHub/face/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
