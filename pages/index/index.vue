<template>
	<view class="container">
		<img :src="avatarUrl" alt="" srcset="">
		<button @click="getUserInfo">获取</button>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const { state, commit } = useStore()
const avatarUrl = computed(() => state?.userInfo?.userInfo?.avatarUrl)

const getUserInfo = () => {
	// uni.login({
	// 	provider: 'weixin',
	// 	success: (res) => {
	// 		uni.getUserProfile({
	// 			lang: 'zh_CN',
	// 			desc:'获取用户信息',
	// 			provider: 'weixin',
	// 			success: (res) => {
	// 				console.log('getUserInfo', res)
	// 				commit('setUserInfo', res)
	// 			}
	// 		})
	// 	}
	// })
	 uni.getUserProfile({  
	        lang: 'zh_CN',
	        desc:'获取用户信息',
	        success: userInfo=> {
	            console.log(userInfo,'userInfo');
	            uni.login({
	                provider: 'weixin',
	                success: loginInfo=> {
	                    console.log(loginInfo,'loginInfo');     
	                }
	            });
	         },
	        fail:err=>{
	            console.log(err,'err')
	        }
	    });
}

</script>

<style>
	.container {
		font-size: 100px;
	}
</style>
