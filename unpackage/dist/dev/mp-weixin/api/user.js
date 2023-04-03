"use strict";
const api_base = require("./base.js");
const api = "http://localhost:8621";
const login = (data) => api_base.post(`${api}/api/login`, data);
const updateUserInfo = (data) => api_base.post(`${api}/api/user`, data);
exports.login = login;
exports.updateUserInfo = updateUserInfo;
