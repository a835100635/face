<template>
	<view class="detail-main">
		<view class="main-wrap">
			<view class="main">
				<!-- 题目 -->
				<view class="topic">
					1、{{ data.topic }}
				</view>
				
				<!-- 选项 判断 填空 -->
				<view class="content">
					<!-- 选择题 判断题 -->
					<slect-component :isRead="isRead" :data="data"/>
					<!-- 填空  -->
				</view>
				
				<!-- 留言列表 -->
				<view class="comment">
					<view class="label">
						<text>
							留言列表 
							<text class="total">({{ commentData.total }})</text>
						</text>
						<!-- 评论 -->
						<i class="iconfont icon-pinglun"></i>
					</view>
					<view class="comment-list" v-if="commentData.data.length">
						<view class="comment-item" v-for="item in commentData.data" :key="item.id">
								<!-- 头像 -->
							<view class="avatar">
								<fui-avatar class="avatar-img" size="small">
								  <fui-icon name="my-fill" color="#fff"></fui-icon>
								</fui-avatar>
							</view>
							<view class="message-wrap">
								<!-- 昵称 时间 -->
								<view class="name-time">
									<text>{{ item.nickname }}</text>
									<text>{{ item.createTime }}</text>
								</view>
								<!-- 评论内容 -->
								<view class="message-content">
									{{ item.message }}
								</view>
								<!-- 评论内容 点赞点踩 后面支持 -->
								<!-- <view></view> -->
							</view>
						</view>
						<view class="loadmore">
							<fui-button 
								v-if="!loading && isShowLoadmoreBtn" 
								radius="0" 
								color="#007aff" 
								type="link" 
								size="24" 
								@click="loadmoreAction">
									加载更多评论
							</fui-button>
							<fui-loadmore v-if="loading && isShowLoadmoreBtn" activeColor="#00affc"></fui-loadmore>
						</view> 
					</view>
					<fui-empty class="empty" v-if="!commentData.data.length" :src="emptyImg" title="暂无评论" descr="期待你的评论～～～" color="#666" size="30"></fui-empty>
				</view>
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
		<!-- 点赞、点踩 -->
		<view class="button-group">
			<fui-icon class="iconfont" name="fabulous-fill"></fui-icon>
			<fui-text class="text" :text="data.like" :size="24"></fui-text>
			<fui-icon class="iconfont" name="stepon-fill"></fui-icon>
			<fui-text class="text" :text="data.dislike" :size="24"></fui-text>
		</view>
		<!-- loading -->
		<fui-loading type="col" v-show="fetchLoading"></fui-loading>
	</view>
</template>

<script>
import { getTopicDetail } from '@/api/topic.js';
import SlectComponent from './components/select.vue';
import { TOPIC_TYPE, LEARNING_TYPE, CHECK_TYPE } from '@/constans/index.js';

import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
import fuiAvatar from "@/components/firstui/fui-avatar/fui-avatar.vue"
import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
import fuiLoadmore from "@/components/firstui/fui-loadmore/fui-loadmore.vue"
import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue"
import fuiText from "@/components/firstui/fui-text/fui-text.vue"


import emptyImg from '@/assets/images/empty.png'
export default {
	components: {
		SlectComponent,
		fuiEmpty,
		fuiAvatar,
		fuiIcon,
		fuiLoadmore,
		fuiButton,
		fuiLoading,
		fuiText
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title: e.topic
		})
		this.options = e;
		this.fetchData();
		// this.fetchcommentData();
	},
	data() {
		return {
			options: null,
			data: {},
			emptyImg,
			commentData: {
				total: 100,
				data: [
					{
						usrename: '用户1',
						message: '答案运改这样',
						createTime: '2023-03-20 12:00:00',
						like: 100,
						dislike: 10,
						id: 0,
						avatar: null,
						nickname: 'oao'
					},
					{
					usrename: '用户1',
					message: '答案运改这样',
					createTime: '2023-03-20 12:00:00',
					like: 100,
					dislike: 10,
					id: 1,
					avatar: null,
					nickname: '阿斯顿'
				},
				]
			},
			loading: false,
			fetchLoading: false
		}
	},
	computed: {
		// 是否选项 选择 判断
		isOption({ data }) {
			const { type } = data;
			const { SELECT, JUDGE } = TOPIC_TYPE;
			return [SELECT, JUDGE].includes(type)
		},
		isShowLoadmoreBtn({ commentData }) {
			const { data, total } = commentData;
			return data.length < total;
		},
		// 是否查看模式 0
		isRead({ options }) {
			const { checkType } = options || {};
			return checkType && checkType == CHECK_TYPE.READ;
		}
	},
	methods: {
		// 获取题目详情
		async fetchData() {
			this.fetchLoading = true;
			const result = await getTopicDetail(this.options.id);
			this.data = result;
			this.fetchLoading = false;
		},
		// 获取评论列表
		async fetchcommentData() {
			console.log('fetchcommentData')
		},
		loadmoreAction() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 2000)
		}
	}
}
</script>

<style lang="scss">
.detail-main {
	background-color: #f6f6f6;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.main-wrap {
		flex: 1;
		overflow: scroll;
		padding: 10px;
		box-sizing: border-box;
		.main {
			.topic{
				background-color: white;
				padding: 10px;
				border-radius: 6px;
				box-sizing: border-box;
			}
			.content {
				background-color: white;
				padding: 10px;
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
			.comment {
				margin-top: 20px;
				background-color: white;
				border-radius: 6px;
				padding: 10px;
				box-sizing: border-box;
				overflow: hidden;
				.empty {
					margin-top: 10px;
				}
				.label {
					font-size: 14px;
					border-bottom: 1px solid #eeeeee;
					padding: 0 0 10px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.total {
						font-size: 12px;
						color: #ccc;
					}
				}
				.comment-list {
					margin-top: 16px;	
					padding: 0 10px;
					box-sizing: border-box;
					.comment-item {
						margin-bottom: 20px;
						display: flex;
						.avatar-img {
							margin-right: 6px;
						}
						.message-wrap {
							flex: 1;
							padding-bottom: 20px;
							border-bottom: 1px solid #eeeeee;
							.name-time {
								width: 100%;
								display: flex;
								justify-content: space-between;
								font-size: 13px;
								color: #999999;
							}
							.message-content {
								margin-top: 20px;
								color: #333;
								font-size: 14px;
							}
						}
					}
					.loadmore {
						display: flex;
						justify-content: center;
					}
				}
			}
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
	.button-group {
		position: fixed;
		right: 22px;
		bottom: 90px;
		display: flex;
		flex-direction: column;
		.iconfont {
			font-size: 12px;
			.fui-icon {
				color: #ccc !important;
			}
		}
		.iconfont + .iconfont {
			margin-top: 8px;
		}
		.text {
			margin-top: -10px;
			text-align: center;
		}
	}
}
</style>
