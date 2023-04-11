"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { state, getters, dispatch, commit } = common_vendor.useStore();
    const userInfo = common_vendor.computed(() => getters.getUserInfo);
    const minProgramLogin = (res) => {
      common_vendor.index.showModal({
        title: "授权登陆",
        content: "是否授权登录微信小程序？",
        success: (e) => {
          common_vendor.index.getProvider({
            service: "oauth",
            success: (res2) => {
              if (~res2.provider.indexOf("weixin")) {
                common_vendor.wx$1.getUserProfile({
                  provider: "weixin",
                  lang: "zh_CN",
                  // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                  desc: "展示用户信息",
                  success: (res3) => {
                    const { userInfo: userInfo2 } = res3;
                    commit("setUserInfo", res3.userInfo);
                    dispatch("loginAction", { userInfo: userInfo2 });
                  }
                });
              }
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userInfo).avatarUrl,
        b: common_vendor.t(common_vendor.unref(userInfo).nickName),
        c: common_vendor.o(minProgramLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "I:/face/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
