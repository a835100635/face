"use strict";
const api_base = require("./base.js");
const login = (data) => api_base.post("http://127.0.0.1:4523/m1/2428286-0-default/face/api/login", data);
const getLoginUser = () => api_base.get("http://127.0.0.1:4523/m1/2428286-0-default/face/api/currentUser");
const updataUserInfo = (data) => api_base.post("http://127.0.0.1:4523/m1/2428286-0-default/face/api/updataUserInfo", data);
exports.getLoginUser = getLoginUser;
exports.login = login;
exports.updataUserInfo = updataUserInfo;
