<template>
  <view class="edit-info-block">
    <uni-section title="用户id" type="line" subTitle="用户唯一标识，不可修改">
      <fui-input
        borderTop
        maxlength="7"
        size="28"
        disabled
        :value="`F${userInfo.id}`"
      ></fui-input>
    </uni-section>
    <uni-section
      title="昵称"
      type="line"
      subTitle="可选，用户社区展示,默认小程序名称、长度限制10"
    >
      <fui-input
        borderTop
        placeholder="请输入昵称"
        maxlength="10"
        size="28"
        v-model="info.userName"
      ></fui-input>
    </uni-section>
    <uni-section title="个性签名" type="line" subTitle="可选, 长度限制30">
      <fui-input
        borderTop
        placeholder="请输入个性签名"
        maxlength="30"
        size="28"
        v-model="info.slogan"
      ></fui-input>
    </uni-section>
    <uni-section title="" type="line" subTitle="后续待开发。。。">
    </uni-section>

    <fui-button
      text="保存"
      height="60rpx"
      :margin="['30rpx', '0']"
      :disabled="isDisable"
      @click="onSave"
    ></fui-button>
  </view>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import fuiInput from "@/components/firstui/fui-input/fui-input.vue";
import fuiButton from "@/components/firstui/fui-button/fui-button.vue";
import { updateUserInfo } from "@/api/user";

const { getters, dispatch } = useStore();

// 用户信息
const info = ref({
  userName: "",
  slogan: "",
});

const userInfo = computed(() => getters.getUserInfo); // 获取头像
info.value.userName = userInfo.value.userName;
info.value.slogan = userInfo.value.slogan;

const isDisable = computed(() => {
  const { userName, slogan } = info.value;
  const { userName: oldUserName, slogan: oldSlogan } = userInfo.value;
  return userName === oldUserName && slogan === oldSlogan;
});

const onSave = () => {
  uni.showLoading({ title: "加载中" });
  updateUserInfo({
    userName: info.value.userName,
    slogan: info.value.slogan,
  })
    .then((data) => {
      uni.showToast({
        title: "保存成功",
        icon: "none",
      });
      dispatch("updateUserInfoAction", data);
    })
    .catch((err) => {
      uni.showToast({
        title: err.message,
        icon: "none",
      });
    })
    .finally(() => {
      uni.hideLoading();
    });
};
</script>
<style lang="scss">
.edit-info-block {
  padding: 20px;
}
</style>
