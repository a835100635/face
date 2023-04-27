"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
require("./constans/index.js");
require("./api/user.js");
require("./api/base.js");
require("./store/modules/topic.js");
require("./api/topic.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/index.js";
  "./pages/login/index.js";
  "./pages/topic/index.js";
  "./pages/detail/index.js";
  "./pages/resource/index.js";
  "./pages/resource/detail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/lichunlin/code/gitHub/face/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
