<template>
  <view class="resource-detail-container">
    <header class="header">
      <fui-tag :text="categoryName" theme="light" :scaleRatio="0.8" />
      标题文字标题文字标题文字标题文字标题文字标题文字标题文字
    </header>

    <main class="main">
      <uni-section title="资源说明" type="line">
        <view class="example-body link">
          现阶段仅支持百度网盘、阿里云盘等链接下载现阶段仅支持百度网盘、阿里云盘等链接下载现阶段仅支持百度网盘、阿里云盘等链接下载
        </view>
        <view class="example-body">
          <image
            src="../../assets/images/banner.png"
            class="example-body-img"
            mode="aspectFill"
          ></image>
        </view>
      </uni-section>

      <uni-section
        title="资源链接"
        type="line"
        subTitle="现阶段仅支持百度网盘、阿里云盘等链接下载"
      >
        <view class="example-body link">
          {{ this.shareUrl }}
        </view>
        <fui-button
          :margin="[0, 0, 0, '20px']"
          width="80px"
          height="26px"
          radius="10px"
          color="#007aff"
          background="#fff"
          borderColor="#007aff"
          type="purple"
          size="24"
          @click="onCopyShareUrl"
        >
          一键复制
        </fui-button>
      </uni-section>

      <uni-section title="获取密码" type="line">
        <view class="example-body">
          {{ this.password }}
          <fui-button
            :margin="[0, 0, 0, '20px']"
            width="80px"
            height="26px"
            radius="10px"
            color="#007aff"
            background="#fff"
            borderColor="#007aff"
            type="purple"
            size="24"
            @click="onCopyPassword"
          >
            一键复制
          </fui-button>
        </view>
      </uni-section>
    </main>

    <footer class="footer">
      333
      <uni-fav :checked="false" class="favBtn" @click="handlePack" />
    </footer>
  </view>
</template>
<script>
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
import fuiButton from "@/components/firstui/fui-button/fui-button.vue";
export default {
  components: {
    fuiTag,
    fuiButton,
  },
  onLoad(e) {
    console.log(e);
    uni.setNavigationBarTitle({
      title: `${e.categoryName}-资源详情`,
    });
    this.options = e;
    this.fetchData();
  },
  data() {
    return {
      options: null,
      info: null,
      // 百度网盘分享地址
      shareUrl: "https://pan.baidu.com/s/1YbH6fjvlA8hDKrNSChsEEg?pwd=dhn2",
      password: "7bfv",
      url: "",
    };
  },
  computed: {
    categoryName({ options }) {
      return options?.categoryName || "-";
    },
  },
  created() {},
  methods: {
    fetchData() {},
    handlePack() {},
    onBtnClick() {
      // 功能待开发
      uni.showToast({
        title: "功能待开发",
        icon: "none",
      });
      // 跳转到百度网盘小程序
      // const match = this.shareUrl.match(/(\w+)$/)[1]; // 获取ID
      // console.log("==", match);
      // this.url = `wxfile:////sdcard/tencent/MicroMsg/appbrand/pkg/zh_CN/pages/play/play.html?${this.password}&path=%2F%2F${match}`;
      // uni.navigateToMiniProgram({
      //   appId: "wxdcd3d073e47d1742", // 百度网盘小程序的appid
      //   path: "pages/resource/detail", // 分享页面的路径，可以根据自己需要定制
      //   extraData: {}, // 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
      //   envVersion: "release", // 打开的小程序版本，可以取值 develop（开发版），trial（体验版），release（正式版）
      //   success: function () {
      //     console.log("跳转成功");
      //   },
      // });
    },
    // 复制密码
    onCopyPassword() {
      uni.setClipboardData({
        data: this.password,
        success: function () {
          uni.showToast({
            title: "复制成功",
            icon: "none",
          });
        },
      });
    },
    // 复制分享链接
    onCopyShareUrl() {
      uni.setClipboardData({
        data: this.shareUrl,
        success: function () {
          uni.showToast({
            title: "复制成功",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>
<style lang="scss">
.resource-detail-container {
  height: 100vh;
  padding: $padding-lt;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .header {
    font-size: 14px;
  }
  .main {
    flex: 99;
    .uni-section {
      margin-bottom: 10px;
      .example-body {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        word-wrap: break-word;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &-img {
          width: 100%;
          object-fit: cover;
        }
        &.link {
          display: inherit;
        }
      }
    }
  }
  .footer {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
  }
}
</style>
