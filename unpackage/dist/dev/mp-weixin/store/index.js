"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  //存放状态
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      console.log(userInfo);
      state.userInfo = userInfo;
    }
  },
  actions: {}
});
exports.store = store;
