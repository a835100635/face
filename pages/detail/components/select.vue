<template>
	<view class="select-warp">
		<view class="options" v-if="!isRead">
			<view class="tip">
				<i class="iconfont icon-cankaodaan"></i> 问题选项
			</view>
			<!-- 选项 -->
			<view class="checkbox">
				<view class="checkbox-item" v-for="item in options" :key="item">
					<view class="value">
						{{ item.value }} :
					</view>
					<view class="">
						{{ item.text }}
					</view>
				</view>
				<view class="correct">
					正确答案：<text class="correct-tip">{{ correct }}</text>
				</view>
			</view>
		</view>
		<!-- 选项答案 -->
		<fui-collapse v-if="isRead" >
			<fui-collapse-item :open="isRead">
				<view class="fui-item__box">
					<i class="iconfont icon-cankaodaan"></i>
					<text class="title">问题解析</text>
				</view>
				<template v-slot:content>
					<view class="slot-content">
						<mp-html class="mphtml" :content="answer"></mp-html>
					</view>
				</template>
			</fui-collapse-item>
		</fui-collapse>
		
	</view>
</template>

<script>
	import { computed, defineProps } from 'vue';
	import { LEARNING_TYPE } from '@/constans/index.js';
	import content from './content.js';
	
	import fuiCollapse from "@/components/firstui/fui-collapse/fui-collapse.vue"
	import fuiCollapseItem from "@/components/firstui/fui-collapse-item/fui-collapse-item.vue"
	
	export default {
		name: 'SlectComponent',
		components: {
			fuiCollapse,
			fuiCollapseItem
		},
		props: {
			data: {
				type: Object,
				default: () => {}
			},
			// 问题类型
			type: {
				type: Number,
				default: LEARNING_TYPE.VIEW
			},
			// 查看类型
			isRead: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				radio1: ''
			}
		},
		computed: {
			answer({ data }) {
				return data.answer;
			},
			options({ data }) {
				const kyes = Object.keys(data.options || {});
				return kyes.map(i => {
					return {
						text: data.options[i],
						value: i
					}
				});
			},
			correct({ data }) {
				return data.correct || '暂无答案'
			}
		},
		methods: {
			mpHtmlLoad() {
				console.log('mp-html load-->');
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.select-warp {
		color: #333;
		.options {
			.checkbox {
				padding: 15px 10px 0;
				box-sizing: border-box;
				.checkbox-item {
					display: flex;
					color: #666;
					.value {
						margin-right: 10px;
						white-space: nowrap;
					}
				}
				.checkbox-item + .checkbox-item {
					margin-top: 16px;
				}
				.correct {
					margin: 10px 0 0;
					&-tip {
						color: #5b85f7;
					}
				}
			}
		}
		.fui-item__box {
			width: 100%;
			padding: 16px 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.iconfont {
				font-size: 18px;
				margin-right: 4px;
			}
			.title {
				font-weight: 600;
			}
		}
		.slot-content {
			padding:  0 0 20px;
		}
	}
	
</style>