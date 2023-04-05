import store from '../store/index.js';
import { BASEURL, HTTP_STATUS } from '../constans/index.js';

const headerConfig = () => {
	return {
		'X-ProductName': 'Face',
		'content-type': 'application/x-www-form-urlencoded',
		'X-Face-Token': store.getters.accessToken
	}
}

const request = (method, url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASEURL}${url}`,
			data,
			method,
			header: {
				...headerConfig(),
				...config,
			},
			success: (res) => {
				const { statusCode } = res;
				const { code, data } = res.data;
				if (statusCode === 401) {
					uni.showToast({
						title: '请先登录',
						icon: 'error',
						duration: 2000
					});
					reject( data || res.data);
					setTimeout(() => {
						uni.switchTab({
							url:`/pages/user/index`
						});
					}, 2000)
					return;
				}
				if (code === HTTP_STATUS.SUCCESS) {
					resolve(data);
				} else {
					reject( data || res.data);
				}
			},
			fail: (msg) => {
				reject(msg);
			}
		})
	});
}

export const get = async (url, data, config = {}) => {
	return await request('GET', url, data, config);
}
export const post = async (url, data, config = {}) => {
	return await request('POST', url, data, config);
}
