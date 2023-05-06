"use strict";
const common_vendor = require("../../common/vendor.js");
const constants_index = require("../../constants/index.js");
const fuiLoading = () => "../../components/firstui/fui-loading/fui-loading.js";
const _sfc_main = {
  components: {
    fuiLoading
  },
  onLoad(e) {
    common_vendor.index.setNavigationBarTitle({
      title: e.title
    });
    this.options = e;
    this.store.commit(
      "topic/changeQuery",
      Object.assign({}, this.query, {
        categoryId: e.categoryId,
        pageNum: 1
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
          pageNum: this.query.pageNum + 1
        })
      );
      this.fetchData();
    }
  },
  onPullDownRefresh() {
    this.store.commit(
      "topic/changeQuery",
      Object.assign({}, this.query, {
        pageNum: 1
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
      store: common_vendor.useStore()
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
    }
  },
  methods: {
    searchAction() {
      this.store.commit(
        "topic/changeQuery",
        Object.assign({}, this.query, {
          topic: this.topic,
          pageNum: 1
        })
      );
      this.store.commit("topic/cleanTopicList");
      this.fetchData();
    },
    async fetchData() {
      this.loading = true;
      const { dispatch } = this.store;
      dispatch("topic/getTopicListAction", {
        isReachBottom: this.isReachBottom
      }).then(() => {
        this.loadingText = "加载成功";
        setTimeout(() => {
          this.loading = false;
          this.loadingText = "加载中...";
        }, 500);
        common_vendor.index.stopPullDownRefresh();
      }).catch((err) => {
        this.loadingText = err.message;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    // 选择题目
    handleSelect(item, index) {
      const { topic, id } = item;
      common_vendor.index.navigateTo({
        url: `/pages/detail/index?topic=${topic}&id=${id}&index=${index}&checkType=${constants_index.CHECK_TYPE.READ}`
      });
    }
  }
};
if (!Array) {
  const _component_fui_loading = common_vendor.resolveComponent("fui-loading");
  _component_fui_loading();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.searchAction && $options.searchAction(...args)),
    b: $data.topic,
    c: common_vendor.o(($event) => $data.topic = $event.detail.value),
    d: common_vendor.t($options.total),
    e: common_vendor.f($options.topicList, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.topic),
        c: `-${item.id}`,
        d: common_vendor.o(($event) => $options.handleSelect(item, index), `-${item.id}`)
      };
    }),
    f: $data.loading,
    g: common_vendor.p({
      type: "col",
      text: _ctx.loadingText
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/lichunlin/code/gitHub/face/pages/topic/index.vue"]]);
wx.createPage(MiniProgramPage);
