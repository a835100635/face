"use strict";
const common_vendor = require("../../common/vendor.js");
const api_topic = require("../../api/topic.js");
const constans_index = require("../../constans/index.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../api/user.js");
const Loading = () => "../../components/loading.js";
const _sfc_main = {
  components: {
    Loading
  },
  onLoad(e) {
    common_vendor.index.setNavigationBarTitle({
      title: e.title
    });
    this.options = e;
    this.query.categoryId = e.categoryId;
    this.fetchData();
  },
  // 上拉加载
  onReachBottom(e) {
    if (this.isDone) {
      this.query.pageNum += 1;
      this.fetchData();
    }
  },
  onPullDownRefresh() {
    this.isPullDownRefresh = true;
    this.query.pageNum = 1;
    this.fetchData();
  },
  data() {
    return {
      isRefresher: false,
      options: null,
      data: null,
      topicList: [],
      loadding: false,
      query: {
        topic: "",
        categoryId: "",
        pageNum: 1,
        pageSize: 20
      },
      isPullDownRefresh: false
    };
  },
  computed: {
    total({ data }) {
      return (data == null ? void 0 : data.total) || 0;
    },
    isDone({ topicList, total }) {
      return topicList.length < total;
    }
  },
  methods: {
    searchAction() {
      this.topicList = [];
      this.fetchData();
    },
    async fetchData() {
      this.loadding = true;
      const result = await api_topic.getTopicList(this.query);
      this.loadding = false;
      this.data = result;
      if (this.isPullDownRefresh) {
        this.topicList = [];
      }
      this.topicList.push(...result.data);
    },
    handleSelect(item, index) {
      const { topic, id } = item;
      common_vendor.index.navigateTo({
        url: `/pages/detail/index?topic=${topic}&id=${id}&checkType=${constans_index.CHECK_TYPE.READ}`
      });
    }
  }
};
if (!Array) {
  const _component_loading = common_vendor.resolveComponent("loading");
  _component_loading();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.searchAction && $options.searchAction(...args)),
    b: $data.query.topic,
    c: common_vendor.o(($event) => $data.query.topic = $event.detail.value),
    d: common_vendor.t($options.total),
    e: common_vendor.f($data.topicList, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.topic),
        c: item.id,
        d: common_vendor.o(($event) => $options.handleSelect(item, index), item.id)
      };
    }),
    f: $data.loadding
  }, $data.loadding ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/lichunlin/code/gitHub/face/pages/topic/index.vue"]]);
wx.createPage(MiniProgramPage);
