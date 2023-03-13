"use strict";
const common_vendor = require("../common/vendor.js");
const store_index = require("../store/index.js");
const constans_index = require("../constans/index.js");
const headerConfig = () => {
  return {
    "X-ProductName": "Face",
    "content-type": "application/x-www-form-urlencoded",
    "X-Auth-Token": store_index.store.getters.accessToken
  };
};
const get = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${constans_index.BASEURL}${url}`,
      data,
      method: "GET",
      header: {
        ...headerConfig(),
        ...config
      },
      success: (res) => {
        const { code, data: data2 } = res.data;
        if (code === constans_index.HTTP_STATUS.SUCCESS) {
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
const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${constans_index.BASEURL}${url}`,
      data,
      method: "POST",
      header: {
        ...headerConfig(),
        ...config
      },
      success: (res) => {
        const { code, data: data2 } = res.data;
        if (code === constans_index.HTTP_STATUS.SUCCESS) {
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
exports.get = get;
exports.post = post;
