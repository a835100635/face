<template>
	<view class="topic-main">
		<view class="title">
			
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

<style lang="scss">
	.topic-main {
		.title {
			font-size: 12px;
		}
	}
</style>