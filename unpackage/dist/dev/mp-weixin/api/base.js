"use strict";
const common_vendor = require("../common/vendor.js");
const store_index = require("../store/index.js");
const constants_index = require("../constants/index.js");
const headerConfig = () => {
  return {
    "X-ProductName": "Face",
    "content-type": "application/x-www-form-urlencoded",
    "X-Face-Token": store_index.store.getters.accessToken
  };
};
const request = (method, url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${constants_index.BASEURL}${url}`,
      data,
      method,
      header: {
        ...headerConfig(),
        ...config
      },
      success: (res) => {
        console.log("request====>", res.data);
        const { statusCode } = res;
        const { code, data: data2 } = res.data;
        if (statusCode === 401) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "error",
            duration: 2e3
          });
          reject(data2 || res.data);
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: `/pages/user/index`
            });
          }, 2e3);
          return;
        }
        if (code === constants_index.HTTP_STATUS.SUCCESS) {
          resolve(data2);
        } else {
          reject(data2 || res.data);
        }
      },
      fail: (msg) => {
        reject(msg);
      }
    });
  });
};
const get = async (url, data, config = {}) => {
  return await request("GET", url, data, config);
};
const post = async (url, data, config = {}) => {
  return await request("POST", url, data, config);
};
exports.get = get;
exports.post = post;
