"use strict";
const common_vendor = require("../common/vendor.js");
const constans_index = require("../constans/index.js");
const api_user = require("../api/user.js");
const store = common_vendor.createStore({
  //存放状态
  state: {
    // 登录状态
    isLogin: false,
    userInfo: {
      name: "2"
    },
    accessToken: void 0
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
    accessToken: (state) => {
      if (state.accessToken) {
        return state.accessToken;
      }
      return common_vendor.index.getStorageSync(constans_index.TOKEN_NAME);
    },
    checkLogin: (state) => {
      return state.isLogin;
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setLoginStatus(state, status) {
      state.isLogin = status;
    }
  },
  actions: {
    /**
     * 登录
     * @param {Object} state
     * @param {Object} params
     */
    loginAction({ commit }, params) {
      const {
        provider = "weixin"
      } = params;
      common_vendor.index.login({
        provider,
        success: (loginRes) => {
          const { code } = loginRes;
          api_user.login({ code }).then((r) => {
            commit("setAccessToken", r.accessToken);
            common_vendor.index.setStorage({ key: constans_index.TOKEN_NAME, data: r.accessToken });
            api_user.getLoginUser().then((res) => {
              commit("setLoginStatus", true);
              commit("setUserInfo", res);
              const { gender, avatarUrl, city, country, province, nickName } = params.userInfo;
              api_user.updataUserInfo({
                nickName,
                avatarUrl,
                city,
                country,
                province,
                sex: gender
              }).then((user) => {
                console.log("user", user);
                commit("setUserInfo", user);
                common_vendor.index.setStorage({ key: constans_index.HAS_LOGIN_NAME, data: true });
                common_vendor.index.setStorage({ key: constans_index.USER_INFO_NAME, data: user });
              });
            });
          });
        }
      });
    }
  }
});
exports.store = store;
