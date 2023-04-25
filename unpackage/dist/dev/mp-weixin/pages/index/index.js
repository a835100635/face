"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_category = require("../../api/category.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../constans/index.js");
require("../../api/user.js");
require("../../store/modules/topic.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (fuiText + _easycom_uni_notice_bar + fuiCol + fuiRow + fuiEmpty + fuiLoading)();
}
const fuiRow = () => "../../components/firstui/fui-row/fui-row.js";
const fuiCol = () => "../../components/firstui/fui-col/fui-col.js";
const fuiText = () => "../../components/firstui/fui-text/fui-text.js";
const fuiLoading = () => "../../components/firstui/fui-loading/fui-loading.js";
const fuiEmpty = () => "../../components/firstui/fui-empty/fui-empty.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isShowLoading = common_vendor.ref(false);
    const loadingText = common_vendor.ref("加载中...");
    const isRefresher = common_vendor.ref(false);
    const noticeText = common_vendor.ref(
      "[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
    );
    const data = common_vendor.ref([
      {
        label: "前端",
        type: 0,
        child: []
      },
      {
        label: "后端",
        type: 1,
        child: []
      }
    ]);
    (async () => {
      loadingText.value = "加载中...";
      isShowLoading.value = true;
      api_category.getCategory().then((result) => {
        Object.keys(result).forEach((key) => {
          const _ = data.value.find((i) => i.type == key);
          _.child = result[key];
        });
      }).catch((err) => {
        loadingText.value = "加载失败";
      }).finally(() => {
        setTimeout(() => {
          isShowLoading.value = false;
        }, 1e3);
      });
    })();
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
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.p({
          text: "让面试",
          size: 60,
          color: "#fff"
        }),
        c: common_vendor.p({
          text: "不再是问题",
          size: 40,
          color: "#fff"
        }),
        d: common_vendor.p({
          scrollable: true,
          showIcon: true,
          single: true,
          speed: "50",
          color: "rgb(41, 121, 255)",
          ["background-color"]: "rgb(234, 242, 255)",
          text: noticeText.value
        }),
        e: common_vendor.f(common_vendor.unref(category), (item, index, i0) => {
          return {
            a: common_vendor.f(item.child, (child, k1, i1) => {
              return {
                a: common_vendor.n(`iconfont ${child.icon}`),
                b: common_vendor.t(child.topicCount),
                c: common_vendor.t(child.categoryName),
                d: common_vendor.o(($event) => handleSelect(item, child), child.categoryId),
                e: child.categoryId,
                f: "1cf27b2a-4-" + i0 + "-" + i1 + "," + ("1cf27b2a-3-" + i0)
              };
            }),
            b: "1cf27b2a-3-" + i0,
            c: index
          };
        }),
        f: common_vendor.p({
          span: 12
        }),
        g: !common_vendor.unref(category).length
      }, !common_vendor.unref(category).length ? {
        h: common_vendor.p({
          src: common_vendor.unref(common_assets.emptyImg),
          marginTop: "100"
        })
      } : {}, {
        i: isRefresher.value,
        j: common_vendor.o(onPulling),
        k: common_vendor.o(onRefresh),
        l: common_vendor.o(onRestore),
        m: isShowLoading.value
      }, isShowLoading.value ? {
        n: common_vendor.p({
          text: loadingText.value,
          type: "col"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "I:/face/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
