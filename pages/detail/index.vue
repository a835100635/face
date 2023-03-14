<template>
	<view class="detail-main">
		<view class="topic">
			1、{{ data.topic }}
		</view>
		<view class="content">
			<view class="tip">
				<i class="iconfont icon-cankaodaan"></i> 答案解析
			</view>
			<view class="answer">
				{{ data.answer }}
			</view>
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

<script setup>
	import {ref} from 'vue';
const data = ref({
	topic: '什么是DOCTYPE, 有何作用？',
	// 
	type: 0,
	options: [],
	answer: 'DOCTYPE标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。'
})
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
