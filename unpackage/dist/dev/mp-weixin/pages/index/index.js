"use strict";
const common_vendor = require("../../common/vendor.js");
const api_category = require("../../api/category.js");
require("../../api/base.js");
require("../../store/index.js");
require("../../constans/index.js");
require("../../api/user.js");
require("../../store/modules/topic.js");
require("../../api/topic.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isRefresher = common_vendor.ref(false);
    const carouselList = common_vendor.ref([
      {
        image: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      },
      {
        image: "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      }
    ]);
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
    const categoryList = async () => {
      const result = await api_category.getCategory();
      Object.keys(result).forEach((key) => {
        const _ = data.value.find((i) => i.type == key);
        _.child = result[key];
      });
    };
    categoryList();
    const category = common_vendor.computed(() => {
      return data.value.filter((_) => _.child.length > 1);
    });
    const navTo = (item) => {
      console.log(item);
    };
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
        a: common_vendor.f(carouselList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: item.type,
            c: common_vendor.o(($event) => navTo(item), item.type)
          };
        }),
        b: common_vendor.f(common_vendor.unref(category), (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.f(item.child, (child, child_index, i1) => {
              return {
                a: common_vendor.n(`iconfont ${child.icon}`),
                b: common_vendor.t(child.categoryName),
                c: child.categoryId,
                d: common_vendor.o(($event) => handleSelect(item, child), child.categoryId)
              };
            }),
            c: index
          };
        }),
        c: isRefresher.value,
        d: common_vendor.o(onPulling),
        e: common_vendor.o(onRefresh),
        f: common_vendor.o(onRestore)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lichunlin/code/gitHub/face/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
