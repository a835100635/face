"use strict";
const common_vendor = require("../../common/vendor.js");
const api_topic = require("../../api/topic.js");
const constans_index = require("../../constans/index.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../api/user.js");
const SlectComponent = () => "./components/select.js";
const _sfc_main = {
  components: {
    SlectComponent
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
      data: {}
    };
  },
  computed: {
    // 是否选项 选择 判断
    isOption({ data }) {
      const { type } = data;
      const { SELECT, JUDGE } = constans_index.TOPIC_TYPE;
      return [SELECT, JUDGE].includes(type);
    }
  },
  methods: {
    async fetchData() {
      const result = await api_topic.getTopicDetail(this.options.id);
      this.data = result;
      console.log("result==>", this.data);
    }
  }
};
if (!Array) {
  const _component_slect_component = common_vendor.resolveComponent("slect-component");
  _component_slect_component();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.data.topic),
    b: common_vendor.p({
      data: $data.data
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/lichunlin/code/gitHub/face/pages/detail/index.vue"]]);
wx.createPage(MiniProgramPage);
