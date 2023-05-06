<template>
  <view class="edit-info-block">
    <view class="avatar-block">
      <div>
        <image
          v-if="avatar"
          class="avatar-img"
          :src="avatar"
          mode="aspectFill"
        ></image>
        <i class="avatar-img-icon iconfont icon-icon-test2" v-else></i>
      </div>
      <div></div>
    </view>
  </view>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const { getters } = useStore();

const userInfo = computed(() => getters.getUserInfo); // 获取头像
const avatar = computed(() => {
  const { avatarUrl, customAvatarUrl } = userInfo.value;
  return customAvatarUrl || avatarUrl || "";
});
</script>
<style lang="scss">
.edit-info-block {
  padding: 20upx;
  .avatar-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-img {
      width: 100upx;
      height: 100upx;
      border-radius: 50%;
    }
    .avatar-img-icon {
      font-size: 100upx;
      color: #fff;
      background-color: #999;
      border-radius: 50%;
      width: 100upx;
      height: 100upx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
