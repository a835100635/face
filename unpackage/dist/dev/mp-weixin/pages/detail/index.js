"use strict";
const common_vendor = require("../../common/vendor.js");
const api_topic = require("../../api/topic.js");
const constans_index = require("../../constans/index.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../api/user.js");
require("../../store/modules/topic.js");
const SelectComponent = () => "./components/select.js";
const fuiLoadmore = () => "../../components/firstui/fui-loadmore/fui-loadmore.js";
const fuiButton = () => "../../components/firstui/fui-button/fui-button.js";
const fuiLoading = () => "../../components/firstui/fui-loading/fui-loading.js";
const fuiText = () => "../../components/firstui/fui-text/fui-text.js";
const comment = () => "../../components/comment.js";
const fuiIcon = () => "../../components/firstui/fui-icon/fui-icon.js";
const _sfc_main = {
  components: {
    SelectComponent,
    fuiLoadmore,
    fuiButton,
    fuiLoading,
    fuiText,
    comment,
    fuiIcon
  },
  onLoad(e) {
    common_vendor.index.setNavigationBarTitle({
      title: e.topic
    });
    this.options = e;
    this.fetchData();
  },
  data() {
    return {
      options: null,
      data: {},
      fetchLoading: false,
      loadingText: "加载中...",
      store: common_vendor.useStore(),
      LIKE_STATUS: constans_index.LIKE_STATUS
    };
  },
  computed: {
    // 是否选项 选择 判断
    isOption({ data }) {
      const { type } = data;
      const { SELECT, JUDGE } = constans_index.TOPIC_TYPE;
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
      return checkType && checkType == constans_index.CHECK_TYPE.READ;
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
    }
  },
  methods: {
    // 获取题目详情
    async fetchData() {
      try {
        const { checkType, id } = this.options || {};
        this.fetchLoading = true;
        this.loadingText = "加载中...";
        const result = await api_topic.getTopicDetail({
          checkType: 0,
          topicId: id
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
        }, 2e3);
      }
    },
    // 上一题
    goPrev() {
      if (this.isDisablePre)
        return;
      const { index } = this.options;
      const data = this.topicList[+index - 1];
      const { topic, id } = data;
      Object.assign(this.options, {
        index: +index - 1,
        id,
        topic
      });
      this.fetchData();
    },
    // 下一题
    async goNext() {
      if (this.isDisableNext)
        return;
      if (this.topicList.length < this.total && this.currentIndex === this.topicList.length) {
        const { pageNum } = this.query;
        const { dispatch, commit } = this.store;
        commit("topic/changeQuery", Object.assign({}, this.query, {
          pageNum: pageNum + 1
        }));
        await dispatch("topic/getTopicListAction", {
          isReachBottom: true
        });
      }
      const { currentIndex } = this;
      const data = this.topicList[currentIndex];
      const { topic, id } = data;
      Object.assign(this.options, {
        index: currentIndex,
        id,
        topic
      });
      this.fetchData();
    },
    // 点赞状态的修改
    async likeStatusAction(status) {
      const { LIKE, DISLIKE } = constans_index.LIKE_STATUS;
      const { isLike, isDislike } = this.data;
      if (status === LIKE && isLike || status === DISLIKE && isDislike) {
        await api_topic.unlikeStatus({
          type: constans_index.LIKE_TYPE.TOPIC,
          topicId: this.data.id
        });
        this.fetchData();
        return;
      }
      api_topic.changeLikeStatus({
        type: constans_index.LIKE_TYPE.TOPIC,
        topicId: this.data.id,
        status
      }).then(() => {
        this.fetchData();
      }).catch((error) => {
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "error",
          duration: 2e3
        });
      });
    }
  }
};
if (!Array) {
  const _component_select_component = common_vendor.resolveComponent("select-component");
  const _component_comment = common_vendor.resolveComponent("comment");
  const _component_fui_icon = common_vendor.resolveComponent("fui-icon");
  const _component_fui_loading = common_vendor.resolveComponent("fui-loading");
  (_component_select_component + _component_comment + _component_fui_icon + _component_fui_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.currentIndex),
    b: common_vendor.t($data.data.topic),
    c: common_vendor.p({
      data: $data.data
    }),
    d: common_vendor.o((...args) => $options.goPrev && $options.goPrev(...args)),
    e: common_vendor.n($options.isDisablePre && "disable"),
    f: common_vendor.o((...args) => $options.goNext && $options.goNext(...args)),
    g: common_vendor.n($options.isDisableNext && "disable"),
    h: common_vendor.o(($event) => $options.likeStatusAction($data.LIKE_STATUS.LIKE)),
    i: common_vendor.p({
      name: "fabulous-fill",
      size: 44,
      color: $data.data.isLike ? "#ecc180" : "#ccc"
    }),
    j: common_vendor.t($data.data.likeCount || 0),
    k: common_vendor.o(($event) => $options.likeStatusAction($data.LIKE_STATUS.DISLIKE)),
    l: common_vendor.p({
      name: "stepon-fill",
      size: 44,
      color: $data.data.isDislike ? "#ecc180" : "#ccc"
    }),
    m: common_vendor.t($data.data.dislikeCount || 0),
    n: $data.fetchLoading,
    o: common_vendor.p({
      type: "col",
      text: $data.loadingText
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "I:/face/pages/detail/index.vue"]]);
wx.createPage(MiniProgramPage);
