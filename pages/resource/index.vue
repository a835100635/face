<template>
  <view class="resource-container">
    <top-menu
      :tabs="tabList"
      :currentIndex="currentIndex"
      @clickTab="clickTab"
    />
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
    <view class="swiper-tab-content">
      <swiper
        class="swiper-tab-content-wrap"
        :current="currentIndex"
        @change="bindChange"
      >
        <swiper-item
          class="swiper-item"
          v-for="(c, index) in tabList"
          :key="`${c.id}-${index}`"
          data-id="{{c.id}}"
        >
          <view class="swiper-item-card-wrp">
            <fui-card
              v-for="item in dataList"
              :key="item.id"
              :src="item.src || defaultPng"
              :title="item.title"
              :tag="item.createTime"
              size="24rpx"
              :margin="['0', '32rpx', '32rpx', '32rpx']"
            >
              <view class="fui-card__content">
                {{ item.desc }}
              </view>
              <view class="fui-card__price">
                <view
                  class="fui-card__price-item"
                  v-if="item.pointsPrice !== 0"
                >
                  <text class="fui-card__price-item-text">
                    {{ item.pointsPrice }}
                  </text>
                  <text class="fui-card__price-item-text"> 积分</text>
                </view>
                <view class="fui-card__price-item" v-else>
                  <text class="fui-card__price-item-text">免费</text>
                </view>
                <view class="fui-card__price-item">
                  <text
                    class="fui-card__price-item-btn checkBtn"
                    v-if="item.purchased"
                    @click="handleCheck(item)"
                    >已兑换,可直接查看</text
                  >
                  <text
                    class="fui-card__price-item-btn"
                    v-else
                    @click="handleSelect(item)"
                    >立即兑换</text
                  >
                </view>
              </view>
            </fui-card>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script setup>
import defaultPng from "@/assets/images/resource.png";
import fuiCard from "@/components/firstui/fui-card/fui-card.vue";
import { ref } from "vue";
// 此时点击的tab
const currentTab = ref(null);
const currentIndex = ref(0);
const tabList = ref([
  {
    id: 1,
    label: "文档",
  },
  {
    id: 2,
    label: "视频",
  },
  {
    id: 3,
    label: "工具",
  },
]);
const noticeText = ref("限时积分兑换，积分不够的可以去赚积分哦~");
const dataList = ref([
  {
    id: 0,
    title: "标题文字",
    createTime: "2021-01-01",
    // src: "https://img.yzcdn.cn/vant/cat.jpeg",
    desc: "这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。",
    pointsPrice: 7,
    purchased: true,
  },
  {
    id: 2,
    title: "标题文字",
    createTime: "2021-01-01",
    // src: "https://img.yzcdn.cn/vant/cat.jpeg",
    desc: "这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。",
    pointsPrice: 10,
    purchased: false,
  },
  {
    id: 3,
    title: "标题文字",
    createTime: "2021-01-01",
    // src: "https://img.yzcdn.cn/vant/cat.jpeg",
    desc: "这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。",
    pointsPrice: 4,
    purchased: true,
  },
  {
    id: 4,
    title: "标题文字",
    createTime: "2021-01-01",
    // src: "https://img.yzcdn.cn/vant/cat.jpeg",
    desc: "这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。",
    pointsPrice: 0,
    purchased: false,
  },
  {
    id: 5,
    title: "标题文字",
    createTime: "2021-01-01",
    // src: "https://img.yzcdn.cn/vant/cat.jpeg",
    desc: "这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。",
    pointsPrice: 2,
    purchased: false,
  },
]);
currentTab.value = tabList.value[0];

const clickTab = (index, item) => {
  currentIndex.value = index;
  currentTab.value = item;
};
const bindChange = (e) => {
  console.log(e);
  currentIndex.value = e.detail.current;
};

// 点击兑换
const handleSelect = (item) => {
  console.log(item);
  setTimeout(() => {
    uni.showToast({
      title: "兑换成功",
      icon: "none",
    });
  }, 1000);
};
// 点击查看
const handleCheck = (item) => {
  console.log(item, currentTab.value);
  // 跳转页面 查看详情
  if (item.purchased) {
    uni.navigateTo({
      url: `/pages/resource/detail?id=${item.id}&categoryName=${currentTab.value.label}`,
    });
  }
};
</script>
<style lang="scss" scoped>
.resource-container {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 100vh;
  .swiper-tab-content {
    flex: 99;
    padding: 0 0 10px;
    &-wrap {
      height: 100%;
      .swiper-item {
        overflow-y: auto;
        .swiper-item-card-wrp {
          height: auto;
          font-size: 13px;
          .fui-card__content {
            padding: 10px 10px 0 10px;
            // 3行超出省略号
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            margin-bottom: 10px;
            color: #333;
          }
          .fui-card__price {
            display: flex;
            justify-content: space-between;
            padding: 0 10px 10px;
            &-item {
              &-text {
                font-size: 14px;
                color: $uni-color-primary;
              }
              &-btn {
                font-size: 12px;
                color: white;
                background-color: $uni-color-primary;
                border-radius: 5px;
                padding: 2px 5px;
                &.checkBtn {
                  background-color: white;
                  color: $uni-color-primary;
                  border: 1px solid $uni-color-primary;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
