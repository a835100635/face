"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_common = require("../../api/common.js");
const constants_index = require("../../constants/index.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../store/modules/topic.js");
require("../../api/topic.js");
if (!Math) {
  (UserBanner + fuiBottomPopup)();
}
const UserBanner = () => "../../components/userBanner.js";
const fuiBottomPopup = () => "../../components/firstui/fui-bottom-popup/fui-bottom-popup.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { state, getters, dispatch, commit } = common_vendor.useStore();
    const isLogin = common_vendor.computed(() => {
      return userInfo.value && getters.checkLogin;
    });
    const userInfo = common_vendor.computed(() => getters.getUserInfo);
    const avatar = common_vendor.computed(() => {
      const { avatarUrl, customAvatarUrl } = userInfo.value;
      if (customAvatarUrl) {
        return `${constants_index.QINIU_URL}/${customAvatarUrl}`;
      }
      return avatarUrl || "";
    });
    const userName = common_vendor.computed(
      () => userInfo.value.userName || userInfo.value.nickName
    );
    const wxAvatarUrl = common_vendor.computed(() => userInfo.value.avatarUrl);
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
    const joinGroup = () => {
    };
    const jumpPage = (url) => {
      console.log(url);
      common_vendor.index.navigateTo({
        url
      });
    };
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
    const showBottomPopup = common_vendor.ref(false);
    const changeAvatar = () => {
      showBottomPopup.value = true;
    };
    const closePopup = () => {
      showBottomPopup.value = false;
    };
    const selectAvatarType = (type) => {
      switch (type) {
        case "wx":
          handleWxAvatar();
          break;
        case "photo":
          handlePhoto();
          break;
        case "picture":
          handlePicture();
          break;
      }
      closePopup();
    };
    const handleWxAvatar = () => {
      try {
        common_vendor.index.showLoading({ title: "加载中" });
        api_user.updateUserInfo({
          customAvatarUrl: ""
        }).then((res) => {
          common_vendor.index.showToast({ title: "修改成功", icon: "none" });
          dispatch("updateUserInfoAction", res);
        });
      } catch (error) {
        common_vendor.index.showToast({ title: error.message, icon: "none" });
      }
    };
    const handlePhoto = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["album"],
        success: async (res) => {
          const filePath = res.tempFilePaths[0];
          common_vendor.index.showLoading({ title: "加载中" });
          handleUploadFileAction(filePath);
        }
      });
    };
    const handlePicture = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["camera"],
        success: (res) => {
          const filePath = res.tempFilePaths[0];
          common_vendor.index.showLoading({ title: "加载中" });
          handleUploadFileAction(filePath);
        }
      });
    };
    const handleUploadFileAction = (filePath) => {
      api_common.uploadFile(filePath).then((result) => {
        api_user.updateUserInfo({
          customAvatarUrl: result.data.url
        }).then((res) => {
          common_vendor.index.showToast({ title: "修改成功", icon: "none" });
          dispatch("updateUserInfoAction", res);
        });
      }).catch((err) => {
        common_vendor.index.showToast({ title: "上传失败", icon: "none" });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const logout = () => {
      dispatch("logoutAction");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(avatar)
      }, common_vendor.unref(avatar) ? {
        b: common_vendor.unref(avatar)
      } : {}, {
        c: common_vendor.n(common_vendor.unref(getUserGender)),
        d: common_vendor.o(changeAvatar),
        e: common_vendor.unref(userName)
      }, common_vendor.unref(userName) ? {
        f: common_vendor.t(common_vendor.unref(userName))
      } : {
        g: common_vendor.o(minProgramLogin)
      }, {
        h: common_vendor.t(common_vendor.unref(userInfo).score),
        i: common_vendor.t(common_vendor.unref(userInfo).slogan),
        j: common_vendor.o(joinGroup),
        k: common_vendor.o(($event) => jumpPage("/pages/user/views/changeUserInfo")),
        l: common_vendor.o(($event) => jumpPage("/pages/user/views/integralLog")),
        m: common_vendor.unref(isLogin)
      }, common_vendor.unref(isLogin) ? {
        n: common_vendor.o(logout)
      } : {}, {
        o: common_vendor.unref(wxAvatarUrl)
      }, common_vendor.unref(wxAvatarUrl) ? {
        p: common_vendor.unref(wxAvatarUrl)
      } : {}, {
        q: common_vendor.o(($event) => selectAvatarType("wx")),
        r: common_vendor.o(($event) => selectAvatarType("photo")),
        s: common_vendor.o(($event) => selectAvatarType("picture")),
        t: common_vendor.o(closePopup),
        v: common_vendor.p({
          show: showBottomPopup.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lichunlin/code/gitHub/face/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
