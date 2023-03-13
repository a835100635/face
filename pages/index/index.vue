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
			<!-- 轮播图 -->
			<view class="swiper-main">
				<swiper class="swiper" indicator-dots circular=true duration="400">
					<swiper-item class="swiper-item" v-for="(item,index) in carouselList" :key="index"  @click="navTo(item)">
						<view class="image-wrapper">
							<image :src="item.image" class="loaded"	mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 分类选择 -->
			<view class="category-main">
				<view class="category-item" v-for="(item, index) in data" :key="index">
					<view class="title">{{ item.label }}</view>
					<view class="item-wrap">
						<view class="item" v-for="(child, child_index) in item.child" :class="child_index" @click="handleSelect(item, child)">
							<view class="content">
								<i :class="`iconfont ${child.icon}`" />
								<view class="title">{{ child.label }}</view>
								<view class="count">{{ child.count }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
// 下拉加载
const isRefresher = ref(false);
const carouselList = ref([
	{
		image: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
	},
	{
		image: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
	},
]);
const data = ref([
	{
		label: '前端',
		type: 0,
		child: [
			{
				label: 'HTML',
				icon: 'icon-html',
				categoryId: 0,
				count: 100
			},
			{
				label: 'CSS',
				icon: 'icon-css',
				categoryId: 1,
				count: 100
			},
			{
				label: 'JavaScript',
				icon: 'icon-Javascript-icon-02',
				categoryId: 2,
				count: 100
			},
			{
				label: 'VUE',
				icon: 'icon-Vue',
				categoryId: 3,
				count: 100
			}
		]
	},
	{
		label: '后端',
		type: 1,
		child: [
			{
				label: 'JAVA',
				icon: 'icon-java',
				categoryId: 4,
				count: 100
			}
		]
	}
])

const navTo = (item) => {
	console.log(item);
}


// 选择类型
const handleSelect = (main, child) => {
	uni.navigateTo({
		url: `/pages/topic/index?type=${main.type}&categoryId=${child.categoryId}&title=${child.label}`
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

<style lang="scss">
	.container {
		background-color: rgba(0,0,0,.04);
		.swiper-main {
			height: 180px;
			box-shadow: 0 0px 10px #333;
			.swiper {
				height: 100%;
				.image-wrapper {
					height: 100%;
					.loaded {
						height: 100%;
						width: 100%;
						object-fit: cover;
					}
				}
			}
		}
		
		.category-main {
			box-shadow: 0 0 10px #ccc;
			margin-top: 16px;
			padding: 0 20px;
			background-color: #fff;
			overflow: hidden;
			.category-item {
				margin: 20px 0;
				.title {
					padding: 0;
				}
				.item-wrap {
					display: flex;
					flex-wrap: wrap;
					.item {
						display: flex;
						justify-content: center;
						align-items: center;
						width: calc(100%/3);
						padding: 10px;
						box-sizing: border-box;
						.content {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							height: 100px;
							width: 100px;
							border-radius: 10px;
							box-shadow: 0px 0px 6px #CCCCCC;
							.title {
								font-size: 14px;
								margin: 6px 0;
							}
							.iconfont {
								font-size: 24px;
							}
							.count {
								font-size: 12px;
								padding: 0 10px;
								border-radius: 5px;
								background-color: #cadbfc;
								color: #427df7;
							}
						}
					}
				}
			}
		}
	}
</style>
