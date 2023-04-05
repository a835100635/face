import { post, get } from './base.js';

const api = 'http://localhost:8621';

export const login = (data) => post(`${api}/api/login`, data);

export const getLoginUser = () => get(`${api}/api/user`);

export const updateUserInfo = (data) => post(`${api}/api/user`, data);