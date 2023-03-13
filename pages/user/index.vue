<template>
	<view class="user-main">
		<button @tap="minProgramLogin">获取dd</button>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const { state, getters, dispatch } = useStore();

const userInfo = computed(() => getters.getUserInfo);

const login = () => {
	
	uni.showModal({
		title: '授权登陆',
		content: '是否授权登录微信小程序？',
		success: (e) => {
			console.log(e);
			if(e.confirm) {
				uni.getUserProfile({
					provider: 'weixin',
					desc: '登录后可同步数据',
					lang: 'zh_CN',
					success: (infoRes) => {
						console.log(infoRes)
						uni.login({
							provider: 'weixin',
							success: (loginRes) => {
								console.log(loginRes)
								uni.showToast({
									title: '您还未登录，请先登录',
									icon: 'none',
									duration: 2000
								  });
							}
						})
					}
				})
			}
		}
	})
}

const minProgramLogin = (res) => {
	console.log(res)
	uni.getProvider({
	  service: 'oauth',
	  success: (res) => {
		if (~res.provider.indexOf('weixin')) {
		  dispatch('loginAction', {userInfo});
		}
	  }
	});
}

</script>

<style lang="scss">
.user-main {
	font-size: 10px;
}
</style>
