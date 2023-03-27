import { get } from './base.js';

const api = 'http://localhost:8621';

export const getTopicList = async (params) => await get(`${api}/api/topic`, params);

export const getTopicDetail = async (id) => await get(`${api}/api/topic/${id}`)