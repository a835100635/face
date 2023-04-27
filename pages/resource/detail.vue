<template>
  <view class="resource-detail-container">

    <header class="header">
      <fui-tag :text="categoryName" theme="light" :scaleRatio="0.8" />
      标题文字标题文字标题文字标题文字标题文字标题文字标题文字
    </header>

    <main class="main">

      <uni-section title="资源说明" type="line">
        <view class="example-body">
           <image
              src="../../assets/images/banner2.png"
              class="example-body-img"
              mode="aspectFill"
            ></image>
        </view>
      </uni-section>
      
      <uni-section title="资源链接" type="line" subTitle="现阶段仅支持百度网盘、阿里云盘等链接下载">
        <view class="example-body link">
          https://uniapp.dcloud.net.cn/component/uniui/uni-combox.html
        </view>
      </uni-section>

      <uni-section title="获取密码" type="line">
        <view class="example-body">
          kbsp
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
          >
            一键复制
          </fui-button>
        </view>
      </uni-section>
    </main>

    <footer class="footer">
      333
      <uni-fav :checked="false" class="favBtn" @click="handlePack" />
      <button type="primary" @click="onBtnClick">去下载网盘小程序</button>
    </footer>

  </view>
</template>
<script>
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
import fuiButton from "@/components/firstui/fui-button/fui-button.vue"
export default {
  components: {
    fuiTag,
    fuiButton
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
    };
  },
  computed: {
    categoryName({ options }) {
      return options?.categoryName || "-";
    },
  },
  methods: {
    fetchData() {},
	  handlePack() {},
    onBtnClick() {
      uni.navigateToMiniProgram({
        appId: 'wxeb490c6f9b154ef9', // 百度网盘小程序的appid
        path: 'pages/share/share?uk=xxxx', // 分享页面的路径，可以根据自己需要定制
        extraData: {},
        success: function () {
          console.log('跳转成功')
        }
      })
    }
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
        word-wrap:break-word;
        display: flex;
        align-items: center;
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
  }
}
</style>
