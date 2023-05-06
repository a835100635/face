<template>
  <view class="topic-main">
    <view class="search-wrap">
      <view class="search">
        <input
          type="text"
          class="input"
          placeholder="请输入查找题目名称"
          v-model="topic"
          @blur="searchAction"
        />
        <view class="count"> 共 {{ total }} 条 </view>
      </view>
    </view>
    <view class="main">
      <view
        class="item"
        v-for="(item, index) in topicList"
        :key="`-${item.id}`"
        @click="handleSelect(item, index)"
      >
        <span class="needs">{{ index + 1 }}、</span>
        <span class="content">{{ item.topic }}</span>
        <i class="iconfont icon-youjiantou"></i>
      </view>
    </view>
    <!-- loading -->
    <fui-loading type="col" v-show="loading" :text="loadingText"></fui-loading>
    <view class="footer"> ---- 到底啦 ---- </view>
  </view>
</template>

<script>
import fuiLoading from "@/components/firstui/fui-loading/fui-loading.vue";
import { CHECK_TYPE } from "@/constants/index.js";

import { useStore } from "vuex";
export default {
  components: {
    fuiLoading,
  },
  onLoad(e) {
    uni.setNavigationBarTitle({
      title: e.title,
    });
    this.options = e;
    this.store.commit(
      "topic/changeQuery",
      Object.assign({}, this.query, {
        categoryId: e.categoryId,
        pageNum: 1,
      })
    );
    this.fetchData();
  },
  // 上拉加载
  onReachBottom(e) {
    if (this.isDone) {
      this.isReachBottom = true;
      this.store.commit(
        "topic/changeQuery",
        Object.assign({}, this.query, {
          pageNum: this.query.pageNum + 1,
        })
      );
      this.fetchData();
    }
  },
  onPullDownRefresh() {
    this.store.commit(
      "topic/changeQuery",
      Object.assign({}, this.query, {
        pageNum: 1,
      })
    );
    this.store.commit("topic/cleanTopicList");
    this.fetchData();
  },
  data() {
    return {
      options: null,
      loading: false,
      isReachBottom: false,
      topic: "",
      store: useStore(),
    };
  },
  computed: {
    isDone({ topicList, total }) {
      return topicList.length < total;
    },
    total({ store }) {
      return store.state.topic.topicData.total;
    },
    // 题目列表
    topicList({ store }) {
      return store.state.topic.topicData.data;
    },
    // 查询参数
    query({ store }) {
      return store.state.topic.query;
    },
  },
  methods: {
    searchAction() {
      this.store.commit(
        "topic/changeQuery",
        Object.assign({}, this.query, {
          topic: this.topic,
          pageNum: 1,
        })
      );
      this.store.commit("topic/cleanTopicList");
      this.fetchData();
    },
    async fetchData() {
      this.loading = true;
      const { dispatch } = this.store;
      dispatch("topic/getTopicListAction", {
        isReachBottom: this.isReachBottom,
      })
        .then(() => {
          this.loadingText = "加载成功";
          setTimeout(() => {
            this.loading = false;
            this.loadingText = "加载中...";
          }, 500);
          // 结束下拉刷新
          uni.stopPullDownRefresh();
        })
        .catch((err) => {
          this.loadingText = err.message;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },

    // 选择题目
    handleSelect(item, index) {
      const { topic, id } = item;
      uni.navigateTo({
        url: `/pages/detail/index?topic=${topic}&id=${id}&index=${index}&checkType=${CHECK_TYPE.READ}`,
      });
    },
  },
};
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
