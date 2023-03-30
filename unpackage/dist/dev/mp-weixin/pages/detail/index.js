"use strict";
const common_vendor = require("../../common/vendor.js");
const api_topic = require("../../api/topic.js");
const constans_index = require("../../constans/index.js");
const common_assets = require("../../common/assets.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../api/user.js");
const SlectComponent = () => "./components/select.js";
const fuiEmpty = () => "../../components/firstui/fui-empty/fui-empty.js";
const fuiAvatar = () => "../../components/firstui/fui-avatar/fui-avatar.js";
const fuiIcon = () => "../../components/firstui/fui-icon/fui-icon.js";
const fuiLoadmore = () => "../../components/firstui/fui-loadmore/fui-loadmore.js";
const fuiButton = () => "../../components/firstui/fui-button/fui-button.js";
const fuiLoading = () => "../../components/firstui/fui-loading/fui-loading.js";
const _sfc_main = {
  components: {
    SlectComponent,
    fuiEmpty,
    fuiAvatar,
    fuiIcon,
    fuiLoadmore,
    fuiButton,
    fuiLoading
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
      emptyImg: common_assets.emptyImg,
      commentData: {
        total: 100,
        data: [
          {
            usrename: "用户1",
            message: "答案运改这样",
            createTime: "2023-03-20 12:00:00",
            like: 100,
            dislike: 10,
            id: 0,
            avatar: null,
            nickname: "oao"
          },
          {
            usrename: "用户1",
            message: "答案运改这样",
            createTime: "2023-03-20 12:00:00",
            like: 100,
            dislike: 10,
            id: 1,
            avatar: null,
            nickname: "阿斯顿"
          }
        ]
      },
      loading: false,
      fetchLoading: false
    };
  },
  computed: {
    // 是否选项 选择 判断
    isOption({ data }) {
      const { type } = data;
      const { SELECT, JUDGE } = constans_index.TOPIC_TYPE;
      return [SELECT, JUDGE].includes(type);
    },
    isShowLoadmoreBtn({ commentData }) {
      const { data, total } = commentData;
      return data.length < total;
    },
    // 是否查看模式 0
    isRead({ options }) {
      const { checkType } = options || {};
      return checkType && checkType == constans_index.CHECK_TYPE.READ;
    }
  },
  methods: {
    // 获取题目详情
    async fetchData() {
      this.fetchLoading = true;
      const result = await api_topic.getTopicDetail(this.options.id);
      this.data = result;
      this.fetchLoading = false;
    },
    // 获取评论列表
    async fetchcommentData() {
      console.log("fetchcommentData");
    },
    loadmoreAction() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2e3);
    }
  }
};
if (!Array) {
  const _component_slect_component = common_vendor.resolveComponent("slect-component");
  const _component_fui_icon = common_vendor.resolveComponent("fui-icon");
  const _component_fui_avatar = common_vendor.resolveComponent("fui-avatar");
  const _component_fui_button = common_vendor.resolveComponent("fui-button");
  const _component_fui_loadmore = common_vendor.resolveComponent("fui-loadmore");
  const _component_fui_empty = common_vendor.resolveComponent("fui-empty");
  const _component_fui_loading = common_vendor.resolveComponent("fui-loading");
  (_component_slect_component + _component_fui_icon + _component_fui_avatar + _component_fui_button + _component_fui_loadmore + _component_fui_empty + _component_fui_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.data.topic),
    b: common_vendor.p({
      isRead: $options.isRead,
      data: $data.data
    }),
    c: common_vendor.t($data.commentData.total),
    d: $data.commentData.data.length
  }, $data.commentData.data.length ? common_vendor.e({
    e: common_vendor.f($data.commentData.data, (item, k0, i0) => {
      return {
        a: "b8a970f4-2-" + i0 + "," + ("b8a970f4-1-" + i0),
        b: "b8a970f4-1-" + i0,
        c: common_vendor.t(item.nickname),
        d: common_vendor.t(item.createTime),
        e: common_vendor.t(item.message),
        f: item.id
      };
    }),
    f: common_vendor.p({
      name: "my-fill",
      color: "#fff"
    }),
    g: common_vendor.p({
      size: "small"
    }),
    h: !$data.loading && $options.isShowLoadmoreBtn
  }, !$data.loading && $options.isShowLoadmoreBtn ? {
    i: common_vendor.o($options.loadmoreAction),
    j: common_vendor.p({
      radius: "0",
      color: "#007aff",
      type: "link",
      size: "24"
    })
  } : {}, {
    k: $data.loading && $options.isShowLoadmoreBtn
  }, $data.loading && $options.isShowLoadmoreBtn ? {
    l: common_vendor.p({
      activeColor: "#00affc"
    })
  } : {}) : {}, {
    m: !$data.commentData.data.length
  }, !$data.commentData.data.length ? {
    n: common_vendor.p({
      src: $data.emptyImg,
      title: "暂无评论",
      descr: "期待你的评论～～～",
      color: "#666",
      size: "30"
    })
  } : {}, {
    o: $data.fetchLoading,
    p: common_vendor.p({
      type: "col"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/lichunlin/code/gitHub/face/pages/detail/index.vue"]]);
wx.createPage(MiniProgramPage);
