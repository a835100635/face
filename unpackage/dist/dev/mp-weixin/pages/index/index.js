"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../store/index.js");
require("../../constans/index.js");
require("../../api/user.js");
require("../../api/base.js");
require("../../store/modules/topic.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (_easycom_uni_notice_bar + fuiCol + fuiRow)();
}
const fuiRow = () => "../../components/firstui/fui-row/fui-row.js";
const fuiCol = () => "../../components/firstui/fui-col/fui-col.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isRefresher = common_vendor.ref(false);
    const noticeText = common_vendor.ref(
      "[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
    );
    const data = common_vendor.ref([
      {
        label: "前端",
        type: 0,
        child: [
          {
            categoryName: "asd",
            categoryId: 1,
            count: 100
          },
          {
            categoryName: "asdzfv",
            categoryId: 2,
            count: 100
          },
          {
            categoryName: "asdzfv",
            categoryId: 2,
            count: 100
          }
        ]
      },
      {
        label: "后端",
        type: 1,
        child: []
      }
    ]);
    const category = common_vendor.computed(() => {
      return data.value.filter((_) => _.child.length > 1);
    });
    const handleSelect = (main, child) => {
      common_vendor.index.navigateTo({
        url: `/pages/topic/index?categoryId=${child.categoryId}&title=${child.categoryName}`
      });
    };
    const onPulling = (e) => {
      console.log("onPulling", e);
      isRefresher.value = true;
    };
    const onRefresh = (e) => {
      console.log("onRefresh", e);
      setTimeout(() => {
        isRefresher.value = false;
      }, 1e3);
    };
    const onRestore = (e) => {
      console.log("onRestore", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.p({
          scrollable: true,
          showIcon: true,
          single: true,
          speed: "50",
          color: "rgb(41, 121, 255)",
          ["background-color"]: "rgb(234, 242, 255)",
          text: noticeText.value
        }),
        c: common_vendor.f(common_vendor.unref(category), (item, index, i0) => {
          return {
            a: common_vendor.f(item.child, (child, k1, i1) => {
              return {
                a: common_vendor.n(`iconfont ${child.icon}`),
                b: common_vendor.t(child.categoryName),
                c: common_vendor.t(child.count),
                d: child.categoryId,
                e: common_vendor.o(($event) => handleSelect(item, child), child.categoryId),
                f: "1cf27b2a-2-" + i0 + "-" + i1 + "," + ("1cf27b2a-1-" + i0)
              };
            }),
            b: "1cf27b2a-1-" + i0,
            c: index
          };
        }),
        d: common_assets._imports_1,
        e: common_vendor.p({
          span: 12
        }),
        f: isRefresher.value,
        g: common_vendor.o(onPulling),
        h: common_vendor.o(onRefresh),
        i: common_vendor.o(onRestore)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "I:/face/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
