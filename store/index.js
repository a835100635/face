// 页面路径：store/index.js 
import {
	createStore
} from 'vuex'
import { TOKEN_NAME, HAS_LOGIN_NAME, USER_INFO_NAME } from '../constans/index.js';
import { login, getLoginUser, updataUserInfo } from '../api/user.js';

import topic from './modules/topic.js';

const store = createStore({
	//存放状态
	state: {
		// 登录状态
		isLogin: false,
		userInfo: {
			name: '2'
		},
		accessToken: undefined
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
		loginAction({ commit }, params) {
			const {
				provider = 'weixin'
			} = params;
			uni.login({
				provider,
				success: (loginRes) => {
					const { code } = loginRes;
					// 执行登录
					login({ code }).then((r) => {
						commit('setAccessToken', r.accessToken)
						uni.setStorage({ key: TOKEN_NAME, data: r.accessToken });
						// 获取用户信息 远程
						getLoginUser().then((res) => {
							commit('setLoginStatus', true);
							commit('setUserInfo', res);
							// 更新用户库中用户信心
							const { gender, avatarUrl, city, country, province, nickName } = params.userInfo;
							updataUserInfo({
								nickName,
								avatarUrl,
								city,
								country,
								province,
								sex: gender,
							}).then((user) => {
								console.log('user', user)
								commit('setUserInfo', user);
								uni.setStorage({key: HAS_LOGIN_NAME, data: true});
								uni.setStorage({key: USER_INFO_NAME, data: user});
							})
						})
					});
				}
			})
		}
	},
	modules: {
		// 题目模块
		topic: topic, 
	}
})
export default store
