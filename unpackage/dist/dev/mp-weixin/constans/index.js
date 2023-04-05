"use strict";
const TOKEN_NAME = "face_access_token";
const HAS_LOGIN_NAME = "face_has_login";
const USER_INFO_NAME = "face_user_info";
const BASEURL = "";
const HTTP_STATUS = {
  // 成功
  SUCCESS: 200,
  // 失败
  ERROR: -1e3
};
const TOPIC_TYPE = {
  // 选择
  SELECT: 1,
  // 判断
  JUDGE: 3,
  // 填空
  VACANT: 2,
  // 开放
  OPEN: 4
};
const LEARNING_TYPE = {
  // 查看
  VIEW: 0,
  // 考试
  TEST: 1
};
const CHECK_TYPE = {
  // 查看
  READ: 0,
  // 考试
  TEST: 1,
  // 完整
  ALL: 2
};
const LIKE_STATUS = {
  LIKE: "LIKE",
  DISLIKE: "DISLIKE"
};
const LIKE_TYPE = {
  // 题目
  TOPIC: "topic",
  // 评论
  COMMENT: "comment"
};
exports.BASEURL = BASEURL;
exports.CHECK_TYPE = CHECK_TYPE;
exports.HAS_LOGIN_NAME = HAS_LOGIN_NAME;
exports.HTTP_STATUS = HTTP_STATUS;
exports.LEARNING_TYPE = LEARNING_TYPE;
exports.LIKE_STATUS = LIKE_STATUS;
exports.LIKE_TYPE = LIKE_TYPE;
exports.TOKEN_NAME = TOKEN_NAME;
exports.TOPIC_TYPE = TOPIC_TYPE;
exports.USER_INFO_NAME = USER_INFO_NAME;
