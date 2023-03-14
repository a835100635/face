"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.ref({
      topic: "什么是DOCTYPE, 有何作用？",
      // 
      type: 0,
      options: [],
      answer: "DOCTYPE标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(data.value.topic),
        b: common_vendor.t(data.value.answer)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "I:/face/pages/detail/index.vue"]]);
wx.createPage(MiniProgramPage);
