"use strict";
const common_vendor = require("../../common/vendor.js");
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
        child: [
          {
            label: "HTML",
            icon: "icon-html",
            count: 100
          },
          {
            label: "CSS",
            icon: "icon-css",
            count: 100
          },
          {
            label: "JavaScript",
            icon: "icon-Javascript-icon-02",
            count: 100
          },
          {
            label: "VUE",
            icon: "icon-Vue",
            count: 100
          }
        ]
      },
      {
        label: "后端",
        child: [
          {
            label: "JAVA",
            icon: "icon-java",
            count: 100
          }
        ]
      }
    ]);
    const navTo = (item) => {
      console.log(item);
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
            b: index,
            c: common_vendor.o(($event) => navTo(item), index)
          };
        }),
        b: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.f(item.child, (child, child_index, i1) => {
              return {
                a: common_vendor.n(`iconfont ${child.icon}`),
                b: common_vendor.t(child.label),
                c: common_vendor.t(child.count),
                d: common_vendor.n(child_index)
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
