import { post, get } from './base.js';

// export const login = (data) => post('/api/login', data);
export const login = (data) => post('http://127.0.0.1:4523/m1/2428286-0-default/face/api/login', data);

export const getLoginUser = () => get('http://127.0.0.1:4523/m1/2428286-0-default/face/api/currentUser');

export const updataUserInfo = (data) => post('http://127.0.0.1:4523/m1/2428286-0-default/face/api/updataUserInfo', data);