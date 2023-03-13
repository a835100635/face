import store from '../store/index.js';
import { BASEURL, HTTP_STATUS } from '../constans/index.js';

const headerConfig = () => {
	return {
		'X-ProductName': 'Face',
		'content-type': 'application/x-www-form-urlencoded',
		'X-Auth-Token': store.getters.accessToken
	}
}

export const get = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASEURL}${url}`,
			data,
			method: 'GET',
			header: {
				...headerConfig(),
				...config,
			},
			success: (res) => {
				const { code, data } = res.data;
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
	})
}

export const post = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASEURL}${url}`,
			data,
			method: 'POST',
			header: {
				...headerConfig(),
				...config,
			},
			success: (res) => {
				const { code, data } = res.data;
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
	})
}