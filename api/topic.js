import { get } from './base.js';

const api = 'http://localhost:8621';

export const getTopicList = async (params) => await get(`${api}/api/topic`, params);

export const getTopicDetail = async ({ topicId, checkType }) => await get(`${api}/api/topic/${topicId}`, {checkType})