"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  UserBanner();
}
const UserBanner = () => "../../components/userBanner.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { state, getters, dispatch, commit } = common_vendor.useStore();
    const userInfo = common_vendor.computed(() => getters.getUserInfo);
    const getUserGender = common_vendor.computed(() => {
      const { gender } = userInfo.value;
      switch (gender) {
        case 1:
          return "iconfont icon-nv";
        case 2:
          return "iconfont icon-nan";
        default:
          return "iconfont icon-wenhao-wuquan";
      }
    });
    const minProgramLogin = (res) => {
      if (common_vendor.index.getStorageSync("face_has_login")) {
        return;
      }
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
    minProgramLogin();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).avatarUrl
      }, common_vendor.unref(userInfo).avatarUrl ? {
        b: common_vendor.unref(userInfo).avatarUrl
      } : {}, {
        c: common_vendor.n(common_vendor.unref(getUserGender)),
        d: common_vendor.t(common_vendor.unref(userInfo).nickName || "未登录")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "I:/face/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
