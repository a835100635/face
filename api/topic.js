import { get, post } from './base.js';

const api = 'http://localhost:8621';

// 题目列表
export const getTopicList = async (params) => await get(`${api}/api/topic`, params);
// 题目详情
export const getTopicDetail = async ({ topicId, checkType }) => await get(`${api}/api/topic/${topicId}`, {checkType})
// 点赞状态
export const changeLikeStatus = async (data) => await post(`${api}/api/topic/like`, data);
// 取消点赞
export const unlikeStatus = async (data) => await post(`${api}/api/topic/unlike`, data);