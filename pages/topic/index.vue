<template>
	<view class="topic-main">
		<view class="title">
			共{{total}}道
		</view>
		<view class="main">
			<view class="item" v-for="(item,index) in 60" :key="index" @click="handleSelect(item, index)">
				<span class="needs">{{ index+1 }}、</span>
				<span class="content">阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿</span>
				<i class="iconfont icon-youjiantou"></i>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		uni.setNavigationBarTitle({
			title:e.title
		})
		console.log(e)
	}
}
</script>

<script setup>
	import { ref } from 'vue';
	const total = ref(99);  
	
	const handleSelect = (item, index) => {
		console.log(item, index);
		uni.navigateTo({
			url:'/pages/detail/index'
		})
	}
	
</script>

<style lang="scss">
	.topic-main {
		padding: 10px;
		background-color: #f6f6f6;
		min-height: 100vh;
		.title {
			font-size: 14px;
			font-weight: 600;
		}
		.main {
			background-color: white;
			padding: 0 14px;
			border-radius: 6px;
			overflow: hidden;
			margin-top: 10px;
			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 12px 0;
				color: #333;
				font-size: 14px;
				.content {
					flex: 11;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.iconfont {
					margin-left: 6px;
				}
			}
			.item + .item {
					border-top: 1px solid #ccc;
			}
		}
	}
</style>