// 页面路径：store/index.js 
import {
	createStore
} from 'vuex'
import {
	TOKEN_NAME,
	HAS_LOGIN_NAME,
	USER_INFO_NAME
} from '../constants/index.js';
import {
	login,
	updateUserInfo
} from '../api/user.js';

import topic from './modules/topic.js';

const store = createStore({
	//存放状态
	state: {
		// 登录状态
		isLogin: uni.getStorageSync(HAS_LOGIN_NAME) || false,
		// 用户信息
		userInfo: uni.getStorageSync(USER_INFO_NAME) || {},
		// token
		accessToken: uni.getStorageSync(TOKEN_NAME) || '',
	},
	getters: {
		getUserInfo: (state) => {
			return state.userInfo;
		},
		accessToken: (state) => {
			if (state.accessToken) {
				return state.accessToken;
			}
			return uni.getStorageSync(TOKEN_NAME);
		},
		checkLogin: (state) => {
			return state.isLogin;
		}
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setAccessToken(state, token) {
			state.accessToken = token;
		},
		setLoginStatus(state, status) {
			state.isLogin = status;
		}
	},
	actions: {
		/**
		 * 登录
		 * @param {Object} state
		 * @param {Object} params
		 */
		async loginAction({ commit, dispatch }, params) {
			console.log('-登录参数', params)
			const {
				provider = 'weixin',
				userInfo
			} = params;
			try {
				// 获取code
				const uniLogin = await uni.login({ provider });
				// 获取openid
				const loginData = await login({ code: uniLogin.code });
				const { token } = loginData;
				commit('setAccessToken', token);
				// 缓存本地openid
				uni.setStorage({ key: TOKEN_NAME, data: token });
				// 更新用户信息
				const { gender, avatarUrl, city, country, province, nickName } = userInfo;
				const newUserInfo = await updateUserInfo({
					nickName,
					avatarUrl,
					city,
					country,
					province,
					gender,
				});

				commit('setLoginStatus', true);
				uni.setStorage({ key: HAS_LOGIN_NAME, data: true });

				dispatch('updateUserInfoAction', newUserInfo)

				uni.showToast({
					title: '登录成功',
					icon: 'success',
					duration: 1000
				})
			} catch (error) {
				console.log('-登录失败', error)
				uni.showToast({
					title: '登录失败',
					icon: 'error',
					duration: 2000
				})
			}
		},
		// 更新用户信息
		async updateUserInfoAction({ commit }, params) {
			console.log('=updateUserInfoAction', params)
			commit('setUserInfo', params);
			uni.setStorage({ key: USER_INFO_NAME, data: params });
		}
	},
	modules: {
		// 题目模块
		topic: topic,
	}
})
export default store
