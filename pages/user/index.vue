<template>
  <view class="user-main">
		<img :src="userInfo.avatarUrl" alt="" srcset="">
		{{ userInfo.nickName }}
    <button @click="minProgramLogin">获取dd</button>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const { state, getters, dispatch, commit } = useStore();

const userInfo = computed(() => getters.getUserInfo);

const minProgramLogin = (res) => {
  uni.showModal({
    title: "授权登陆",
    content: "是否授权登录微信小程序？",
    success: (e) => {
			uni.getProvider({
				service: "oauth",
				success: (res) => {
					if (~res.provider.indexOf("weixin")) {
						wx.getUserProfile({
							provider: "weixin",
							lang: "zh_CN",
							// 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
							desc: '展示用户信息', 
							success: (res) => {
								const { userInfo } = res;
								// 缓存用户信息
								commit('setUserInfo', res.userInfo);
								// 登录
								dispatch("loginAction", { userInfo });
							}
						})
						
					}
				},
			});
		}
	});
};
</script>

<style lang="scss">
.user-main {
  font-size: 10px;
}
</style>
