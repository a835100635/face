// 页面路径：store/index.js 
import { createStore } from 'vuex'

const store = createStore({
	//存放状态
	state: {
		userInfo: null
	},
	mutations: {
		setUserInfo(state, userInfo) {
			console.log(userInfo);
			state.userInfo = userInfo;
		}
	},
	actions: {
		
	}
})
export default store
