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
      <!-- 顶部banner -->
      <image
        src="../../assets/images/banner2.png"
        class="banner"
        mode="aspectFill"
      ></image>
      <!-- 通告栏 -->
      <uni-notice-bar
        scrollable
        showIcon
        single
        speed="50"
        color="rgb(41, 121, 255)"
        background-color="rgb(234, 242, 255)"
        :text="noticeText"
      ></uni-notice-bar>

      <!-- 分类选择 -->
      <view class="category-main">
        <view
          class="category-item"
          v-for="(item, index) in category"
          :key="index"
        >
          <!-- <view class="title">{{ item.label }}</view> -->
          <fui-row>
            <fui-col
              v-for="child in item.child"
              :key="child.categoryId"
              :span="12"
              @click="handleSelect(item, child)"
            >
              <view class="col">
				<view class="item">
					<image
						src="../../assets/images/banner.png"
						class="item-bg"
					></image>
					<view class="content">
						<i :class="`iconfont ${child.icon}`" />
						<view class="title">{{ child.categoryName }}</view>
						<view class="count">{{ child.count }}</view>
					</view>
				</view>
              </view>
            </fui-col>
          </fui-row>
        </view>
      </view>
    </scroll-view>
  </view>
</template>


<script setup>
import fuiRow from "@/components/firstui/fui-row/fui-row.vue";
import fuiCol from "@/components/firstui/fui-col/fui-col.vue";
import { getCategory } from "@/api/category.js";
import { ref, computed } from "vue";
import { useStore } from "vuex";

// 下拉加载
const isRefresher = ref(false);
const noticeText = ref(
  "[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
);

const data = ref([
  {
    label: "前端",
    type: 0,
    child: [
      {
        categoryName: "asd",
        categoryId: 1,
        count: 100,
      },
      {
        categoryName: "asdzfv",
        categoryId: 2,
        count: 100,
      },
	  {
        categoryName: "asdzfv",
        categoryId: 2,
        count: 100,
      },
    ],
  },
  {
    label: "后端",
    type: 1,
    child: [],
  },
]);
// 获取分类
// (async () => {
//   const result = await getCategory();
//   Object.keys(result).forEach((key) => {
//     const _ = data.value.find((i) => i.type == key);
//     _.child = result[key];
//   });
// })();
const category = computed(() => {
  return data.value.filter((_) => _.child.length > 1);
});

const navTo = (item) => {
  console.log(item);
};

// 选择类型
const handleSelect = (main, child) => {
  uni.navigateTo({
    url: `/pages/topic/index?categoryId=${child.categoryId}&title=${child.categoryName}`,
  });
};

// 下拉刷新触发
const onPulling = (e) => {
  console.log("onPulling", e);
  isRefresher.value = true;
};
// 下拉刷新被触发
const onRefresh = (e) => {
  console.log("onRefresh", e);
  // 请求数据
  setTimeout(() => {
    isRefresher.value = false;
  }, 1000);
};
// 自定义下拉刷新被复位
const onRestore = (e) => {
  console.log("onRestore", e);
};
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

  .category-main {
    overflow: hidden;
    .category-item {
      overflow: hidden;
      padding: 0 calc($padding-lt - 10px);
      border-radius: 8px;
      .col {
		  padding: 0 10px 10px;
		  box-sizing: border-box;
        .item {
		  position: relative;
		  border-radius: 10px;
		  height: 80px;
		  backdrop-filter: blur(6px);
		  overflow: hidden;
		  .content {
			height: 100%;
			width: 100%;
		  	backdrop-filter: blur(10px);
		  }
		  .item-bg {
			height: 100%;
			width: 100%;
			object-fit: cover;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		  }
        }
      }
    }
  }
}
</style>
