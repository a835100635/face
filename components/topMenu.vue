<template>
  <!-- 顶部tab菜单 -->
  <scroll-view
    class="cates-scroll"
    scroll-x="true"
    scroll-with-animation="true"
  >
    <view class="cates-block">
      <view
        class="cate-item"
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :class="index === currentIndex ? 'active' : ''"
        @click="clickTab(index, tab)"
      >
        {{ tab.label }}
      </view>
    </view>
  </scroll-view>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["clickTab"]);
const clickTab = (index, tab) => {
  console.log(index, tab);
  // 抛出事件
  emit("clickTab", index, tab);
};
</script>
<style lang="scss">
.cates-scroll {
  width: 100%;
  background-color: white;
  .cates-block {
    width: auto;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 20px;
    .cate-item {
      text-align: center;
      padding: 5px 10px;
      white-space: nowrap;
      &.active {
        color: $uni-color-primary;
        border-bottom: 2px solid $uni-color-primary;
      }
    }
  }
}
</style>
