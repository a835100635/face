<template>
	<view class="topic-main">
		<view class="search-wrap">
			<view class="search">
				<input type="text" class="input" placeholder="请输入查找题目名称" v-model="query.topic" @blur="searchAction"/>
				<view class="count">
					共 {{ total }} 条 
				</view>
			</view>
		</view>
		<view class="main">
			<view class="item" v-for="(item,index) in topicList" :key="item.id" @click="handleSelect(item, index)">
				<span class="needs">{{ index+1 }}、</span>
				<span class="content">{{ item.topic }}</span>
				<i class="iconfont icon-youjiantou"></i>
			</view>
		</view>
		<loading v-if="loadding"/>
		<view class="footer">
			---- 到底啦 ----
		</view>
	</view>
</template>

<script>
import { getTopicList } from '@/api/topic.js';
import Loading from '@/components/loading.vue';
import { CHECK_TYPE } from '@/constans/index.js';
export default {
	components: {
		Loading
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title:e.title
		})
		this.options = e;
		this.query.categoryId = e.categoryId;
		this.fetchData();
	},
	// 上拉加载
	onReachBottom(e) {
		if(this.isDone) {
			this.query.pageNum += 1
			this.fetchData();	
		}
	},
	onPullDownRefresh() {
		this.isPullDownRefresh = true;
		this.query.pageNum = 1;
		this.fetchData();
	},
	data() {
		return {
			isRefresher: false,
			options: null,
			data: null,
			topicList: [],
			loadding: false,
			query: {
				topic: '',
				categoryId: '',
				pageNum: 1,
				pageSize: 20
			},
			isPullDownRefresh: false
		}
	},
	computed: {
		total({ data }) {
			return data?.total || 0
		},
		isDone({ topicList, total }) {
			return topicList.length < total;
		}
	},
	methods: {
		searchAction() {
			this.topicList = [];
			this.fetchData();
		},
		async fetchData() {
			this.loadding = true;
			const result = await getTopicList(this.query);
			this.loadding = false;
			this.data = result;
			// 顶部加载触发
			if(this.isPullDownRefresh) {
				this.topicList = [];
			}
			this.topicList.push(...result.data);
		},
		handleSelect(item, index){
			const { topic, id } = item
			uni.navigateTo({
				url:`/pages/detail/index?topic=${topic}&id=${id}&checkType=${CHECK_TYPE.READ}`
			});
		}
	}
}
</script>

<style lang="scss">
	$padding: 14px;
	.topic-main {
		.search-wrap {
			margin-top: 10px;
			padding: 0 $padding;
			box-sizing: border-box;
			.search {
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				height: 40px;
				border-radius: 20px;
				padding: 0 20px;
				box-sizing: border-box;
			}
			.input {
				color: #838383;
				font-size: 14px;
				flex: 7;
			}
			.count {
				font-size: 12px;
				color: #333;
			}
		}
		.main {
			background-color: white;
			border-radius: 6px;
			margin-top: 10px;
			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 12px $padding;
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
			.item:nth-child(odd) {
				background-color: #f9f9f9;
			}
		}
		.footer {
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			color: #ccc;
		}
	}
</style>