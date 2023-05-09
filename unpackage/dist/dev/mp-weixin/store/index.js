"use strict";
const common_vendor = require("../common/vendor.js");
const constants_index = require("../constants/index.js");
const api_user = require("../api/user.js");
const store_modules_topic = require("./modules/topic.js");
const store = common_vendor.createStore({
  //存放状态
  state: {
    // 登录状态
    isLogin: common_vendor.index.getStorageSync(constants_index.HAS_LOGIN_NAME) || false,
    // 用户信息
    userInfo: common_vendor.index.getStorageSync(constants_index.USER_INFO_NAME) || {},
    // token
    accessToken: common_vendor.index.getStorageSync(constants_index.TOKEN_NAME) || ""
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
    accessToken: (state) => {
      if (state.accessToken) {
        return state.accessToken;
      }
      return common_vendor.index.getStorageSync(constants_index.TOKEN_NAME);
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
    async loginAction({ commit, dispatch: dispatch2 }, params) {
      console.log("-登录参数", params);
      const {
        provider = "weixin",
        userInfo
      } = params;
      try {
        const uniLogin = await common_vendor.index.login({ provider });
        const loginData = await api_user.login({ code: uniLogin.code });
        const { token } = loginData;
        commit("setAccessToken", token);
        common_vendor.index.setStorage({ key: constants_index.TOKEN_NAME, data: token });
        const { gender, avatarUrl, city, country, province, nickName } = userInfo;
        const newUserInfo = await api_user.updateUserInfo({
          nickName,
          avatarUrl,
          city,
          country,
          province,
          gender
        });
        commit("setLoginStatus", true);
        common_vendor.index.setStorage({ key: constants_index.HAS_LOGIN_NAME, data: true });
        dispatch2("updateUserInfoAction", newUserInfo);
        dispatch2("refreshPage");
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
    },
    /**
     * 退出登录
     */
    async logoutAction({ commit }) {
      commit("setLoginStatus", false);
      commit("setUserInfo", {});
      commit("setAccessToken", "");
      common_vendor.index.removeStorageSync(constants_index.HAS_LOGIN_NAME);
      common_vendor.index.removeStorageSync(constants_index.TOKEN_NAME);
      common_vendor.index.removeStorageSync(constants_index.USER_INFO_NAME);
      common_vendor.index.showToast({
        title: "退出成功",
        icon: "none"
      });
      dispatch("refreshPage");
    },
    /**
     * 更新用户信息
     */
    async updateUserInfoAction({ commit }, params) {
      console.log("=updateUserInfoAction", params);
      commit("setUserInfo", params);
      common_vendor.index.setStorage({ key: constants_index.USER_INFO_NAME, data: params });
    },
    /**
     * 刷新页面
     */
    refreshPage() {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 1];
      if (prevPage.refreshData) {
        prevPage.refreshData();
      }
    }
  },
  modules: {
    // 题目模块
    topic: store_modules_topic.topic
  }
});
exports.store = store;
