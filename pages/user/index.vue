<template>
  <view class="user-main">
    <!-- 头像等信息 -->
    <view class="avatar-block">
      <view class="avatar">
        <view class="img" @click="changeAvatar">
          <image
            v-if="avatar"
            class="avatar-img"
            :src="avatar"
            mode="aspectFill"
          ></image>
          <i class="avatar-img-icon iconfont icon-icon-test2" v-else></i>
          <text :class="getUserGender"></text>
        </view>
        <text class="nick-name avatar-item" v-if="userName">{{
          userName
        }}</text>
        <text class="nick-name avatar-item" v-else @click="minProgramLogin"
          >点击登录</text
        >
      </view>
      <view class="info">
        <text class="info-item score">积分: {{ userInfo.score }}</text>
        <text class="info-item slogan">{{ userInfo.slogan }}</text>
        <user-banner class="user-banner" />
      </view>
    </view>

    <!-- 加入群聊 -->
    <view class="user-block container-block">
      <view class="user-item">
        <view class="user-item-icon">
          <i class="iconfont icon-weixin"></i>
        </view>
        <view class="user-item-content">
          <view class="user-item-content-title">加入群聊</view>
          <view class="user-item-content-desc">和朋友们一起聊天</view>
        </view>
        <view class="user-item-arrow" @click="joinGroup">
          <i class="iconfont icon-jiaruVIPfangjian-01"></i>
          限时加入
        </view>
      </view>
    </view>

    <!-- 设置 -->
    <view class="container-block">
      <!-- 个人信息 -->
      <view
        class="container-item"
        @click="jumpPage('/pages/user/views/changeUserInfo')"
      >
        <view class="container-item-icon">
          <i class="iconfont icon-gerenshezhi"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">个人信息</view>
          <view class="container-item-content-desc"
            >用户id、昵称、个性签名等等</view
          >
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>

      <!-- 我的积分 -->
      <view
        class="container-item setting-item"
        @click="jumpPage('/pages/user/views/integralLog')"
      >
        <view class="container-item-icon">
          <i class="iconfont icon-jifen"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">我的积分</view>
          <view class="container-item-content-desc">积分</view>
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>

      <!-- 我的收藏 -->
      <view class="container-item setting-item">
        <view class="container-item-icon">
          <i class="iconfont icon-shoucangdaogedan"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">我的收藏</view>
          <view class="container-item-content-desc">题目、试题、资源等等</view>
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>

      <!-- 我的题库 -->
      <view class="container-item setting-item">
        <view class="container-item-icon">
          <i class="iconfont icon-icon_3-09"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">我的贡献</view>
          <view class="container-item-content-desc">
            我上传的资源、题目等等，贡献后获取积分
          </view>
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>

      <!-- 我的反馈意见 -->
      <view class="container-item setting-item">
        <view class="container-item-icon">
          <i class="iconfont icon-faxian"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">我的反馈</view>
          <view class="container-item-content-desc">
            反馈、建议、意见等等 采纳后获取积分
          </view>
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>

      <!-- 关于我们 -->
      <view class="container-item setting-item">
        <view class="container-item-icon">
          <i class="iconfont icon-jiaruwomenbeifen2"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">关于我们</view>
          <view class="container-item-content-desc">
            了解我们的故事，了解我们的团队 申请加入
          </view>
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="container-block" v-if="isLogin">
      <view class="container-item" @click="logout">
        <view class="container-item-icon">
          <i class="iconfont icon-tuichu"></i>
        </view>
        <view class="container-item-content">
          <view class="container-item-content-title">退出登录</view>
          <view class="container-item-content-desc"
            >退出后不会删除任何历史数据</view
          >
        </view>
        <view class="container-item-arrow">
          <i class="iconfont icon-youjiantou-copy"></i>
        </view>
      </view>
    </view>

    <fui-bottom-popup
      class="avatar-popup"
      :show="showBottomPopup"
      @close="closePopup"
    >
      <view class="fui-custom__wrap" @click="selectAvatarType('wx')">
        <text> 用微信头像 </text>
        <image
          v-if="wxAvatarUrl"
          class="avatar-img"
          :src="wxAvatarUrl"
          mode="aspectFill"
        ></image>
        <i class="avatar-img-icon iconfont icon-icon-test2" v-else></i>
      </view>
      <view class="fui-custom__wrap" @click="selectAvatarType('photo')">
        <text> 从相册选择 </text>
      </view>
      <view class="fui-custom__wrap" @click="selectAvatarType('picture')">
        <text> 拍照 </text>
      </view>
    </fui-bottom-popup>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { updateUserInfo } from "@/api/user";
import { uploadFile } from "@/api/common";
import UserBanner from "@/components/userBanner.vue";
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue";
import { QINIU_URL } from "@/constants/index.js";

const { state, getters, dispatch, commit } = useStore();
// 是否登录
const isLogin = computed(() => {
  return userInfo.value && getters.checkLogin;
});

const userInfo = computed(() => getters.getUserInfo);
// 获取头像
const avatar = computed(() => {
  const { avatarUrl, customAvatarUrl } = userInfo.value;
  if (customAvatarUrl) {
    return `${QINIU_URL}/${customAvatarUrl}`;
  }
  return avatarUrl || "";
});
const userName = computed(
  () => userInfo.value.userName || userInfo.value.nickName
);
// 微信头像
const wxAvatarUrl = computed(() => userInfo.value.avatarUrl);

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

// 群聊邀请链接
const joinGroup = () => {
  // uni.navigateTo({
  //   url: `weixin://dl/chat?${groupInviteUrl}`,
  //   success: function () {
  //     // 群聊页面成功展示后，自动调用确认加入方法
  //     setTimeout(function () {
  //       confirmToJoinGroup()
  //     }, 3000) // 进入页面后需要等待一定时间，等待群聊url完全加载成功
  //   }
  // })
};

const jumpPage = (url) => {
  console.log(url);
  uni.navigateTo({
    url,
  });
};

// 登录
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

const showBottomPopup = ref(false);
const changeAvatar = () => {
  showBottomPopup.value = true;
};
const closePopup = () => {
  showBottomPopup.value = false;
};

// 选择使用头像类型
const selectAvatarType = (type) => {
  switch (type) {
    case "wx":
      handleWxAvatar();
      break;
    case "photo":
      handlePhoto();
      break;
    case "picture":
      handlePicture();
      break;
    default:
      break;
  }
  closePopup();
};
// 使用微信头像
const handleWxAvatar = () => {
  // 删除自定义头像 默认使用微信头像
  try {
    uni.showLoading({ title: "加载中" });
    updateUserInfo({
      customAvatarUrl: "",
    }).then((res) => {
      uni.showToast({ title: "修改成功", icon: "none" });
      dispatch("updateUserInfoAction", res);
    });
  } catch (error) {
    uni.showToast({ title: error.message, icon: "none" });
  }
};
// 选择照片
const handlePhoto = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["album"],
    success: async (res) => {
      const filePath = res.tempFilePaths[0];
      uni.showLoading({ title: "加载中" });
      handleUploadFileAction(filePath);
    },
  });
};
// 拍照
const handlePicture = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["camera"],
    success: (res) => {
      const filePath = res.tempFilePaths[0];
      uni.showLoading({ title: "加载中" });
      handleUploadFileAction(filePath);
    },
  });
};
// 上传图片
const handleUploadFileAction = (filePath) => {
  uploadFile(filePath)
    .then((result) => {
      updateUserInfo({
        customAvatarUrl: result.data.url,
      }).then((res) => {
        uni.showToast({ title: "修改成功", icon: "none" });
        dispatch("updateUserInfoAction", res);
      });
    })
    .catch((err) => {
      uni.showToast({ title: "上传失败", icon: "none" });
    })
    .finally(() => {
      uni.hideLoading();
    });
};
// 退出登录
const logout = () => {
  dispatch("logoutAction");
};
</script>

<style lang="scss">
.user-main {
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  min-height: 100vh;
  .avatar-block {
    height: 180px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    z-index: 1;
    &::before {
      pointer-events: none;
      content: "";
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      width: 100%;
      display: block;
      background: linear-gradient(
        130deg,
        #ff7a18,
        #af002d 41.07%,
        #319197 76.05%
      );
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.8;
    }
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 auto;
      margin-right: 20px;
      padding: 4px;
      box-sizing: border-box;
      background: linear-gradient(
        130deg,
        #ff7a18,
        #af002d 41.07%,
        #319197 76.05%
      );
      .img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar-img {
          width: calc(100% - 4px);
          height: calc(100% - 4px);
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
          font-size: 62px;
        }
      }
      .avatar-item {
        position: relative;
        text-align: center;
        display: block;
        z-index: 2;
        color: white;
      }
      .nick-name {
        font-size: 14px;
        margin-top: 4px;
      }
    }
    .info {
      flex: 1;
      height: 100%;
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      .info-item {
        display: flex;
        align-items: center;
        color: white;
        font-size: 12px;
        margin-bottom: 4px;
        &.slogan {
          margin-right: 30px;
          margin-top: 10px;
        }
      }
      .user-banner {
        width: 74px;
        height: 104px;
        flex: 1;
        position: absolute;
        right: -34px;
        bottom: 22px;
      }
    }
  }

  .container-block {
    margin: 20px;
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    .container-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      &-icon {
        margin-right: 10px;
        .iconfont {
          font-size: 24px;
        }
      }
      &-content {
        flex: 1;
        &-title {
          font-size: 14px;
        }
        &-desc {
          font-size: 12px;
          color: #999;
        }
      }
      &-arrow {
        .iconfont {
          font-size: 20px;
          color: #ccc;
        }
      }
    }
    .container-item + .container-item {
      border-top: 1px solid #f5f5f5;
    }
  }

  .user-block {
    margin: -20px 20px 20px;
    padding: 0;
    .user-item {
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      .user-item-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        .iconfont {
          font-size: 40px;
        }
      }
      .user-item-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .user-item-content-title {
          font-size: 14px;
          color: #333;
        }
        .user-item-content-desc {
          font-size: 12px;
          color: #999;
        }
      }
      .user-item-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 10px;
        font-size: 12px;
        color: #999;
        border: 1px solid #7d9af3;
        border-radius: 15px;
        .iconfont {
          margin-right: 10px;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    color: transparent;
  }
}
.avatar-popup {
  .fui-custom__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
    .avatar-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }
    .avatar-img-icon {
      font-size: 30px;
    }
  }
}
</style>
