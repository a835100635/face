<template>
  <view class="information-container">
    <!-- 顶部tab菜单 -->
    <top-menu :tabs="tabs" :currentIndex="currentIndex" @clickTab="clickTab" />

    <view class="content">
      <swiper
        class="cont-swiper"
        style="height: 100%"
        bindchange="swiperSwitchTab"
        :current="currentIndex"
        @change="bindChange"
      >
        <swiper-item
          class="cont-swiper-item"
          v-for="(c, index) in tabs"
          :key="`${c.id}-${index}`"
          data-id="{{c.id}}"
          style="height: 100%"
          wx:key="*this"
        >
          <!-- 每个tab对应的商品 -->
          <scroll-view
            scroll-y="true"
            style="height: 100%"
            bindscroll="contenScrollY"
            scroll-with-animation="true"
          >
            <view class="con-wrap">
              <fui-card
                title="标题文字"
                tag="2021-01-01"
                size="24rpx"
                :src="defaultPng"
                :margin="['0', '32rpx', '32rpx', '32rpx']"
                v-for="item in 10"
                :key="item"
                @click="handleSelect(item)"
              >
                <view class="fui-card__content">
                  <image
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    class="example-body-img"
                    mode="aspectFill"
                  ></image>
                  <text class="desc">
                    <text>
                      这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。
                      这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。
                    </text>
                  </text>
                </view>
              </fui-card>
              <!-- <fa-card :src="defaultPng" title="标题文字" tag="2021-01-01" /> -->
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script setup>
import { ref } from "vue";
import fuiCard from "@/components/firstui/fui-card/fui-card.vue";
import TopMenu from "@/components/topMenu.vue";
import defaultPng from "@/assets/images/resource.png";
const tabs = ref([
  {
    id: 0,
    label: "全部",
  },
  {
    id: 1,
    label: "热门",
  },
  {
    id: 2,
    label: "推荐",
  },
  {
    id: 3,
    label: "关注",
  },
  {
    id: "01",
    label: "全部",
  },
  {
    id: 11,
    label: "热门",
  },
  {
    id: 21,
    label: "推荐",
  },
  {
    id: 31,
    label: "关注",
  },
  {
    id: "02",
    label: "全部",
  },
  {
    id: 12,
    label: "热门",
  },
  {
    id: 22,
    label: "推荐",
  },
  {
    id: 32,
    label: "关注",
  },
]);
const currentTab = ref(null);
const currentIndex = ref(0);
const clickTab = (index, item) => {
  currentIndex.value = index;
  currentTab.value = item;
};
const bindChange = (e) => {
  console.log(e);
  currentIndex.value = e.detail.current;
};
const handleSelect = (item) => {
  console.log(item);
  // 跳转详情页
  uni.navigateTo({
    url: `/pages/information/detail?id=${item}`,
  });
};
</script>
<style lang="scss" scoped>
.information-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .content {
    flex: 99;
    width: 100%;
    .con-wrap {
      margin-top: 20px;
      padding: 0 0 20px;
      .fui-card__content {
        display: flex;
        flex-direction: column;
        height: 200px;
        position: relative;

        .example-body-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .desc {
          position: absolute;
          bottom: 0;
          color: white;
          padding: 10px;
          background-color: black;
          font-size: 14px;
          background: linear-gradient(
            to bottom,
            rgba(144, 144, 144, 0) 0%,
            rgb(31, 31, 31) 100%
          );
          text {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 超出几行省略 */
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
