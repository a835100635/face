import { get } from './base.js';

const api = 'http://localhost:8621';

export const getCategory = async (params) => await get(`${api}/api/category`, params);