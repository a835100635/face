<template>
  <view class="information-detail-wrap">
    <web-view
      src="https://mp.weixin.qq.com/s/a1p2Ewqa6AeR9dzRcFTebg"
    ></web-view>
  </view>
</template>
<script>
export default {
  name: "information-detail",
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>
<style lang="scss">
.information-detail-wrap {
  min-height: 100vh;
  width: 100vw;
  #iFrame {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
