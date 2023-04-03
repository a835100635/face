"use strict";
const common_vendor = require("../common/vendor.js");
const constans_index = require("../constans/index.js");
const api_user = require("../api/user.js");
const store_modules_topic = require("./modules/topic.js");
const store = common_vendor.createStore({
  //存放状态
  state: {
    // 登录状态
    isLogin: false,
    userInfo: {},
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
    async loginAction({ commit }, params) {
      const {
        provider = "weixin",
        userInfo
      } = params;
      try {
        const uniLogin = await common_vendor.index.login({ provider });
        const loginData = await api_user.login({ code: uniLogin.code });
        const { token } = loginData;
        commit("setAccessToken", token);
        common_vendor.index.setStorage({ key: constans_index.TOKEN_NAME, data: token });
        const { gender, avatarUrl, city, country, province, nickName } = userInfo;
        const newUserInfo = await api_user.updateUserInfo({
          nickName,
          avatarUrl,
          city,
          country,
          province,
          gender
        });
        commit("setUserInfo", newUserInfo);
        commit("setLoginStatus", true);
        common_vendor.index.setStorage({ key: constans_index.HAS_LOGIN_NAME, data: true });
        common_vendor.index.setStorage({ key: constans_index.USER_INFO_NAME, data: newUserInfo });
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success",
          duration: 1e3
        });
      } catch (error) {
        console.log("-登录失败", error);
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "error",
          duration: 2e3
        });
      }
    }
  },
  modules: {
    // 题目模块
    topic: store_modules_topic.topic
  }
});
exports.store = store;
