<template>
  <view class="user-main">
    <view class="avatar-block">
      <view class="avatar">
        <view class="img">
          <image
            v-if="userInfo.avatarUrl"
            class="avatar-img"
            :src="userInfo.avatarUrl"
            mode="aspectFill"
          ></image>
          <i class="avatar-img-icon iconfont icon-icon-test2" v-else></i>
          <text :class="getUserGender"></text>
        </view>
        <text class="nick-name">{{ userInfo.nickName || "未登录" }}</text>
      </view>
      <view class="info">
        <user-banner class="user-banner" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserBanner from "@/components/userBanner.vue";

const { state, getters, dispatch, commit } = useStore();

const userInfo = computed(() => getters.getUserInfo);

const getUserGender = computed(() => {
  const { gender } = userInfo.value;
  switch (gender) {
    case 1 || "1":
      return "iconfont icon-nv";
    case 2 || "2":
      return "iconfont icon-nan";
    default:
      return "iconfont icon-wenhao-wuquan";
  }
});

const minProgramLogin = (res) => {
  if (uni.getStorageSync("face_has_login")) {
    return;
  }
  uni.showModal({
    title: "授权登陆",
    content: "是否授权登录微信小程序？",
    success: (e) => {
      uni.getProvider({
        service: "oauth",
        success: (res) => {
          if (~res.provider.indexOf("weixin")) {
            wx.getUserProfile({
              provider: "weixin",
              lang: "zh_CN",
              // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              desc: "展示用户信息",
              success: (res) => {
                const { userInfo } = res;
                // 缓存用户信息
                commit("setUserInfo", res.userInfo);
                // 登录
                dispatch("loginAction", { userInfo });
              },
            });
          }
        },
      });
    },
  });
};
minProgramLogin();
</script>

<style lang="scss">
.user-main {
  .avatar-block {
    background-color: #ccc;
    height: 180px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    .avatar {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      margin: 0 auto;
      margin-right: 20px;
      .img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .iconfont {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 22px;
        }
        .avatar-img-icon {
          font-size: 68px;
        }
      }
      .nick-name {
        text-align: center;
        display: block;
        color: white;
        font-size: 14px;
        margin-top: 4px;
      }
    }
    .info {
      flex: 1;
      height: 100%;
      display: flex;
      position: relative;
      .user-banner {
        width: 74px;
        height: 104px;
        flex: 1;
        position: absolute;
        right: -34px;
        bottom: 0;
      }
    }
  }
}
</style>
