<template>
	<view class="container">
		<scroll-view
			scroll-y 
			style="width: 100%; height: 100%"
			refresher-background="#fff"
			:refresher-triggered="isRefresher"
			:refresher-threshold="100"
			:refresher-enabled="true"
			@refresherpulling="onPulling"
			@refresherrefresh="onRefresh"
			@refresherrestore="onRestore"
		>
			<image src="../../assets/images/banner2.png" class="banner"	mode="aspectFill"></image>

<uni-badge text="1"></uni-badge>
<uni-badge text="2" type="success"></uni-badge>
<uni-badge text="3" type="primary" :inverted="true"></uni-badge>

			<!-- 提示 -->
			<view class="prompt">
				2023-2-20 新增Vue3 10道面试题
			</view>
			<!-- 分类选择 -->
			<view class="category-main">
				<view class="category-item" v-for="(item, index) in category" :key="index">
					<!-- <view class="title">{{ item.label }}</view> -->
					<fui-row>
						<fui-col :span="12" 
							v-for="(child, child_index) in item.child" 
							:key="child.categoryId"  
							@click="handleSelect(item, child)">
							<view class="content">
								<i :class="`iconfont ${child.icon}`" />
								<view class="title">{{ child.categoryName }}</view>
								<view class="count">{{ child.count }}</view>
							</view>
						</fui-col>
					</fui-row>
				</view>
			</view>
		</scroll-view>
	</view>
</template>


<script setup>
import fuiRow from "@/components/firstui/fui-row/fui-row.vue"
import fuiCol from "@/components/firstui/fui-col/fui-col.vue"
import { getCategory } from '@/api/category.js';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';


// 下拉加载
const isRefresher = ref(false);

const data = ref([
	{
		label: '前端',
		type: 0,
		child: []
	},
	{
		label: '后端',
		type: 1,
		child: []
	}
]);
// 获取分类
const categoryList = async () => {
	const result = await getCategory();
	(Object.keys(result)).forEach((key) => {
		const _ = data.value.find((i) => i.type == key);
		_.child = result[key];
	})
}
categoryList()
const category = computed(() => {
	return data.value.filter((_) => _.child.length > 1);
})


const navTo = (item) => {
	console.log(item);
}


// 选择类型
const handleSelect = (main, child) => {
	uni.navigateTo({
		url: `/pages/topic/index?categoryId=${child.categoryId}&title=${child.categoryName}`
	})
}


// 下拉刷新触发
const onPulling = (e) => {
	console.log('onPulling',e)
	isRefresher.value = true;
}
// 下拉刷新被触发
const onRefresh = (e) => {
	console.log('onRefresh',e)
	// 请求数据
	setTimeout(()=>{
		isRefresher.value = false;
	}, 1000)
}
// 自定义下拉刷新被复位
const onRestore = (e) => {
	console.log('onRestore',e)
}

</script>

<style lang="scss" scoped>
	.container {
		background-color: #f5f5f5;
		min-height: 100vh;
		
		.banner {
			width: 100%;
			height: 220px;
			object-fit: cover;
		}

		.prompt {
			color: #427df7;
			margin: 0 $padding-lt;
		}
		.category-main {
			overflow: hidden;
			.category-item {
				overflow: hidden;
				padding: 0 $padding-lt;
				border-radius: 8px;
				.title {
					margin: 10px 0 0 0;
				}
			}
		}
	}
</style>
