<template>
  <view class="detail-main">
    <view class="main-wrap">
      <view class="main">
        <!-- 题目 -->
        <view class="topic"> {{ currentIndex }}、{{ data.topic }} </view>
        <view class="content" v-if="data.topicDesc">
          <view class="fui-item__box">
            <i class="iconfont icon-cankaodaan"></i>
            <text class="title">题目描述</text>
          </view>
          <mp-html class="mphtml" :content="data.topicDesc"></mp-html>
        </view>

        <!-- 选项 判断 填空 -->
        <view class="content">
          <!-- 选择题 判断题 -->
          <select-component :data="data" />
          <!-- 填空  -->
        </view>

        <!-- 留言列表 TODO: 延后开发-->
        <!-- <comment ></comment> -->
      </view>
    </view>
    <view class="footer">
      <view
        class="button pre"
        @click="goPrev"
        :class="isDisablePre && 'disable'"
      >
        上一题
      </view>
      <view
        class="button next"
        @click="goNext"
        :class="isDisableNext && 'disable'"
      >
        下一题
      </view>
    </view>
    <!-- 点赞、点踩 -->
    <view class="button-group">
      <fui-icon
        class="iconfont"
        name="fabulous-fill"
        :size="44"
        :color="data.isLike ? '#ecc180' : '#ccc'"
        @click="likeStatusAction(LIKE_STATUS.LIKE)"
      >
      </fui-icon>
      <text class="text">{{ data.likeCount || 0 }}</text>
      <fui-icon
        class="iconfont"
        name="stepon-fill"
        :size="44"
        :color="data.isDislike ? '#ecc180' : '#ccc'"
        @click="likeStatusAction(LIKE_STATUS.DISLIKE)"
      >
      </fui-icon>
      <text class="text">{{ data.dislikeCount || 0 }}</text>
    </view>
    <!-- loading -->
    <fui-loading
      type="col"
      v-show="fetchLoading"
      :text="loadingText"
    ></fui-loading>
  </view>
</template>

<script>
import { getTopicDetail, changeLikeStatus, unlikeStatus } from "@/api/topic.js";
import SelectComponent from "./components/select.vue";
import {
  TOPIC_TYPE,
  CHECK_TYPE,
  LIKE_STATUS,
  LIKE_TYPE,
} from "@/constants/index.js";

import fuiLoadmore from "@/components/firstui/fui-loadmore/fui-loadmore.vue";
import fuiButton from "@/components/firstui/fui-button/fui-button.vue";
import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue";
import fuiText from "@/components/firstui/fui-text/fui-text.vue";
import comment from "@/components/comment.vue";
import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue";

import { useStore } from "vuex";
export default {
  components: {
    SelectComponent,
    fuiLoadmore,
    fuiButton,
    fuiLoading,
    fuiText,
    comment,
    fuiIcon,
  },
  onLoad(e) {
    uni.setNavigationBarTitle({
      title: e.topic,
    });
    this.options = e;
    this.fetchData();
    // this.fetchcommentData();
  },
  data() {
    return {
      options: null,
      data: {},
      fetchLoading: false,
      loadingText: "加载中...",
      store: useStore(),
      LIKE_STATUS,
    };
  },
  computed: {
    // 是否选项 选择 判断
    isOption({ data }) {
      const { type } = data;
      const { SELECT, JUDGE } = TOPIC_TYPE;
      return [SELECT, JUDGE].includes(type);
    },
    isDisablePre({ currentIndex }) {
      return currentIndex == 1;
    },
    isDisableNext({ currentIndex }) {
      return currentIndex == this.total;
    },
    // 是否考试模式 1
    isTest({ options }) {
      const { checkType } = options || {};
      return checkType && checkType == CHECK_TYPE.READ;
    },
    topicIds({ store }) {
      return store.state.topic.topicData.data.map((i) => i.id);
    },
    currentIndex({ options }) {
      const { index = 0 } = options || {};
      return +index + 1;
    },
    // 题目列表
    topicList({ store }) {
      return store.state.topic.topicData.data;
    },
    // 题目列表
    total({ store }) {
      return store.state.topic.topicData.total;
    },
    // 查询参数
    query({ store }) {
      return store.state.topic.query;
    },
  },
  methods: {
    // 获取题目详情
    async fetchData() {
      try {
        const { checkType, id } = this.options || {};
        this.fetchLoading = true;
        this.loadingText = "加载中...";
        const result = await getTopicDetail({
          checkType: 0,
          topicId: id,
        });
        this.data = result;
        this.loadingText = "加载成功...";
        setTimeout(() => {
          this.fetchLoading = false;
        }, 500);
      } catch (error) {
        this.loadingText = error.message;
        setTimeout(() => {
          this.fetchLoading = false;
        }, 2000);
      }
    },
    // 上一题
    goPrev() {
      if (this.isDisablePre) return;
      const { index } = this.options;
      const data = this.topicList[+index - 1];
      const { topic, id } = data;
      Object.assign(this.options, {
        index: +index - 1,
        id,
        topic,
      });
      this.fetchData();
    },
    // 下一题
    async goNext() {
      if (this.isDisableNext) return;
      // 判断是否是最后一题（存在下一页的情况）
      if (
        this.topicList.length < this.total &&
        this.currentIndex === this.topicList.length
      ) {
        const { pageNum } = this.query;
        const { dispatch, commit } = this.store;
        commit(
          "topic/changeQuery",
          Object.assign({}, this.query, {
            pageNum: pageNum + 1,
          })
        );
        // 请求下一页数据
        await dispatch("topic/getTopicListAction", {
          isReachBottom: true,
        });
      }
      const { currentIndex } = this;
      const data = this.topicList[currentIndex];
      const { topic, id } = data;
      Object.assign(this.options, {
        index: currentIndex,
        id,
        topic,
      });
      this.fetchData();
    },
    // 点赞状态的修改
    async likeStatusAction(status) {
      const { LIKE, DISLIKE } = LIKE_STATUS;
      const { isLike, isDislike } = this.data;
      // 点击已点赞或点踩 则删除
      if ((status === LIKE && isLike) || (status === DISLIKE && isDislike)) {
        await unlikeStatus({
          type: LIKE_TYPE.TOPIC,
          topicId: this.data.id,
        });
        this.fetchData();
        return;
      }
      changeLikeStatus({
        type: LIKE_TYPE.TOPIC,
        topicId: this.data.id,
        status,
      })
        .then(() => {
          this.fetchData();
        })
        .catch((error) => {
          uni.showToast({
            title: "操作失败",
            icon: "error",
            duration: 2000,
          });
        });
    },
  },
};
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
      .topic {
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
        .fui-item__box {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .iconfont {
            font-size: 18px;
            margin-right: 4px;
          }
          .title {
            font-weight: 600;
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
      &.disable {
        opacity: 0.5;
      }
    }
  }
  .button-group {
    position: fixed;
    right: 22px;
    bottom: 90px;
    display: flex;
    flex-direction: column;
    .iconfont + .iconfont {
      margin-top: 8px;
    }
    .text {
      font-size: 12px;
      text-align: center;
      color: #ccc;
    }
  }
}
</style>
