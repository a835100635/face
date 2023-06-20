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
          src="../../assets/images/banner.png"
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
          v-for="(item, index) in filterCategory"
          :key="index"
        >
          <view class="title">{{ item.label }}</view>
          <fui-row>
            <fui-col
              v-for="child in item.child"
              :key="child.categoryId"
              :span="12"
            >
              <view class="category-item-col" @click="handleSelect(item, child)">
                <view class="menu-item">
                  <view class="menu-item-icon">
                    <f-icon :name="child.icon" :size="['30px', '30px']"></f-icon>
                  </view>
                  <view class="menu-item-content">
                    <p class="label">{{ child.categoryName }}</p>
                    <p class="count">{{ child.topicCount || '暂无～' }}</p>
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
import { CATEGORY_TYPES } from "@/constants/index.js";


const isShowLoading = ref(false);
const loadingText = ref("加载中...");
// 下拉加载
const isRefresher = ref(false);
const noticeText = ref(
  "欢迎使用，如果您在使用过程中遇到问题，可以在反馈中心进行反馈，我们会及时处理。"
);

const data = ref(Object.values(CATEGORY_TYPES).map((_) => {
  return {
    // 过滤掉特殊的
    special: _.special,
    type: _.value,
    label: _.label,
    icon: null,
    child: [],
  };
}));
// 有题目的分类
const filterCategory = computed(() => {
  return data.value.filter((_) => _.child.length > 1 && !_.special);
});
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
  const { topicCount } = child;
  if (topicCount === 0) {
    uni.showToast({
      title: "暂无题目，敬请期待",
      icon: "none",
    });
    return;
  }
  const { id , categoryName } = child;
  uni.navigateTo({
    url: `/pages/topic/index?categoryId=${id}&title=${categoryName}`,
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
    .title {
      margin-bottom: 10px;
      color: #333;
    }
    .category-item {
      padding: 0 calc($padding-lt - 10px);
      border-radius: 8px;
      &-col {
        padding: 0 10px;
        margin-bottom: 20px;
        .menu-item {
          height: 50px;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 0 0 5px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          &-icon {
            width: 50px;
            height: 50px;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            .t-icon {
              font-size: 30px;
            }
          }
          &-content {
            flex: 1;
            padding: 0 10px 0 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .label {
              font-size: 16px;
              color: #21bafb;
              line-height: 1.5;
            }
            .count {
              font-size: 12px;
              color: #999;
              line-height: 1.5;
            }
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
  padding-bottom: 10px;
}
</style>
