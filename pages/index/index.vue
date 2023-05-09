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
      <view class="banner-wrap">
        <image
          src="../../assets/images/banner2.png"
          class="banner"
          mode="aspectFill"
        ></image>
        <fui-text
          class="text"
          text="让每个人都成为"
          :size="60"
          color="#fff"
        ></fui-text>
        <fui-text
          class="text text_next"
          text="终身学习的受益者"
          :size="40"
          color="#fff"
        ></fui-text>
      </view>

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
            >
              <view class="col" @click="handleSelect(item, child)">
                <view class="item">
                  <view class="content">
                    <view class="icon-top">
                      <i :class="`iconfont ${child.icon}`" />
                    </view>
                    <view class="content-c">
                      <view class="count">
                        <span class="n">{{ child.topicCount }}</span
                        >题</view
                      >
                      <view class="name">{{ child.categoryName }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </fui-col>
          </fui-row>
        </view>
        <fui-empty
          class="empty"
          v-if="!category.length"
          :src="emptyImg"
          marginTop="100"
        ></fui-empty>
      </view>
    </scroll-view>

    <fui-loading
      v-if="isShowLoading"
      :text="loadingText"
      type="col"
    ></fui-loading>
  </view>
</template>

<script setup>
import fuiRow from "@/components/firstui/fui-row/fui-row.vue";
import fuiCol from "@/components/firstui/fui-col/fui-col.vue";
import fuiText from "@/components/firstui/fui-text/fui-text.vue";
import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue";
import { getCategory } from "@/api/category.js";
import { ref, computed } from "vue";
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue";
import emptyImg from "@/assets/images/empty.png";

const isShowLoading = ref(false);
const loadingText = ref("加载中...");
// 下拉加载
const isRefresher = ref(false);
const noticeText = ref(
  "[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
);

const data = ref([
  {
    label: "前端",
    type: 0,
    child: [],
  },
  {
    label: "后端",
    type: 1,
    child: [],
  },
]);
// 获取分类
(async () => {
  loadingText.value = "加载中...";
  isShowLoading.value = true;
  getCategory()
    .then((result) => {
      Object.keys(result).forEach((key) => {
        const _ = data.value.find((i) => i.type == key);
        _.child = result[key];
      });
    })
    .catch((err) => {
      loadingText.value = "加载失败";
    })
    .finally(() => {
      setTimeout(() => {
        isShowLoading.value = false;
      }, 1000);
    });
})();
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
  background-color: #eff5fa;
  min-height: 100vh;

  .banner-wrap {
    position: relative;
    .banner {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }
    .text {
      position: absolute;
      top: 100px;
      right: 20px;
      color: #fff;
      font-weight: 600;
    }
    .text_next {
      top: 136px;
    }
  }

  .category-main {
    .category-item {
      padding: 0 calc($padding-lt - 10px);
      border-radius: 8px;
      .col {
        padding: 0 10px 10px;
        box-sizing: border-box;
        background-color: transparent;
        .item {
          position: relative;
          height: 100px;
          background-color: #eef3f7;
          box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
          border-radius: 15px;
          .content {
            height: 100%;
            width: 100%;
            color: #454d5a;
            position: relative;
            .icon-top {
              position: absolute;
              top: -7px;
              right: 10px;
              width: 50px;
              height: 50px;
              z-index: 2;
              text-align: center;
              line-height: 50px;
              .iconfont {
                font-size: 32px;
              }
              &::before {
                content: "";
                position: absolute;
                display: block;
                width: 100%;
                height: 100%;
                background-color: white;
                box-shadow: 0px 10px 40px 0px rgba(109, 109, 109, 0.5);
                z-index: -1;
                opacity: 0.9;
                border-radius: 15px;
              }
            }
            .content-c {
              position: absolute;
              bottom: 10px;
              left: 10px;
              .name {
                font-size: 18px;
                font-weight: 600;
              }
              .count {
                font-size: 14px;
                .n {
                  font-size: 20px;
                  margin-right: 4px;
                }
              }
            }
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
      .empty {
        width: 307px;
        height: 170px;
      }
    }
  }
}
</style>

<style lang="scss">
.fui-row__box {
  padding-bottom: 50px;
}
</style>
