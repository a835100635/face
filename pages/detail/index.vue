<template>
	<view class="detail-main">
		<view class="topic">
			1、{{ data.topic }}
		</view>
		<view class="content">
			<view class="tip">
				<i class="iconfont icon-cankaodaan"></i> 答案解析
			</view>
			<slect-component :data="data"></slect-component>
		</view>
		<view class="footer">
			<view class="button pre">
				上一题
			</view>
			<view class="button next">
				下一题
			</view>
		</view>
	</view>
</template>

<script>
import { getTopicDetail } from '@/api/topic.js';
import SlectComponent from './components/select.vue';
import { TOPIC_TYPE, LEARNING_TYPE } from '@/constans/index.js';
export default {
	components: {
		SlectComponent
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title: e.topic
		})
		this.options = e;
		this.fetchData();
	},
	data() {
		return {
			options: null,
			data: {}
		}
	},
	computed: {
		// 是否选项 选择 判断
		isOption({ data }) {
			const { type } = data;
			const { SELECT, JUDGE } = TOPIC_TYPE;
			return [SELECT, JUDGE].includes(type)
		}
	},
	methods: {
		async fetchData() {
			const result = await getTopicDetail(this.options.id);
			this.data = result;
			console.log('result==>', this.data )
		}
	}
}
</script>

<style lang="scss">
.detail-main {
	padding: 5px;
	background-color: #f6f6f6;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
	.topic{
		background-color: white;
		padding: 10px 5px;
		border-radius: 6px;
		box-sizing: border-box;
	}
	.content {
		background-color: white;
		padding: 10px 5px;
		margin-top: 20px;
		flex: 1;
		border-radius: 6px;
		box-sizing: border-box;
		.tip {
			display: flex;
			align-items: center;
			font-weight: 600;
			.iconfont {
				font-weight: 500;
				margin-right: 8px;
			}
		}
		.answer {
			margin-top: 10px;
			padding: 0 10px;
			line-height: 1.8;
		}
	}
	.footer {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		box-sizing: border-box;
		margin-top: 10px;
		background-color: white;
		border-radius: 6px;
		.button {
			width: 100px;
			height: 36px;
			border-radius: 18px;
			background-color: #5298ff;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
		}
	}
}
</style>
