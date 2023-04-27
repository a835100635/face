<template>
  <view class="resource-detail-container">
    <header class="header">
      标题文字标题文字标题文字标题文字标题文字标题文字标题文字
      <fui-tag :text="categoryName" theme="light" :scaleRatio="0.8" />
    </header>
    <main></main>
  </view>
</template>
<script>
import fuiTag from "@/components/firstui/fui-tag/fui-tag.vue";
export default {
  components: {
    fuiTag,
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
  },
};
</script>
<style lang="scss">
.resource-detail-container {
  height: 100vh;
  padding: $padding-lt;
  .header {
    font-size: 14px;
  }
}
</style>
