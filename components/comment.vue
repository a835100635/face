<template>
  <!-- 留言列表 -->
  <view class="comment">
    <view class="label">
      <text>
        留言列表
        <text class="total">({{ commentData.total }})</text>
      </text>
      <!-- 评论 -->
      <i class="iconfont icon-pinglun" @click="openBottomPopup"></i>
    </view>
    <view class="comment-list" v-if="commentData.data.length">
      <view
        class="comment-item"
        v-for="item in commentData.data"
        :key="item.id"
      >
        <!-- 头像 -->
        <view class="avatar">
          <fui-avatar class="avatar-img" size="small">
            <fui-icon name="my-fill" color="#fff"></fui-icon>
          </fui-avatar>
        </view>
        <view class="message-wrap">
          <!-- 昵称 时间 -->
          <view class="name-time">
            <text>{{ item.nickname }}</text>
            <text>{{ item.createTime }}</text>
          </view>
          <!-- 评论内容 -->
          <view class="message-content">
            {{ item.message }}
          </view>
          <!-- 评论内容 点赞点踩 后面支持 -->
          <!-- <view></view> -->
        </view>
      </view>
      <view class="loadmore">
        <fui-button
          v-if="!loading && isShowLoadmoreBtn"
          radius="0"
          color="#007aff"
          type="link"
          size="24"
          @click="loadmoreAction"
        >
          加载更多评论
        </fui-button>
        <fui-loadmore
          v-if="loading && isShowLoadmoreBtn"
          activeColor="#00affc"
        ></fui-loadmore>
      </view>
    </view>
    <fui-empty
      class="empty"
      v-if="!commentData.data.length"
      :src="emptyImg"
      title="暂无评论"
      descr="期待你的评论～～～"
      color="#666"
      size="30"
    >
    </fui-empty>

    <!-- 底部弹出框 -->
    <fui-bottom-popup
      :show="isShowBottomPopup"
      @close="isShowBottomPopup = false">
      <view class="bottom-popup">
        <view class="title">留言</view>
        <view class="content">
          <fui-textarea
            v-model="comment"
            placeholder="请输入评论内容"
            maxlength="100"
            radius="10"
            backgroundColor="#f8f8f8"
          ></fui-textarea>
        </view>
        <view class="btn-wrap">
          <fui-button
            type="primary"
            color="#007aff"
            @click="submitComment"
          >
            提交
          </fui-button>
        </view>
      </view>
    </fui-bottom-popup>
  </view>
</template>

<script setup>
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue"
import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue"
import emptyImg from '@/assets/images/empty.png'
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
import { ref, reactive, computed } from "vue";
const commentData = reactive({
  total: 0,
  data: [],
});
const isShowLoadmoreBtn = computed(() => {
  return commentData.total > commentData.data.length;
});

const loading = ref(false); 

const loadmoreAction = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000)
}

const openBottomPopup = () => {
  isShowBottomPopup.value = true;
}
const isShowBottomPopup = ref(true);
const comment = ref('');
const submitComment = () => {
  console.log('提交评论')
}


</script>

<style lang="scss" scoped>
.comment {
  margin-top: 20px;
  background-color: white;
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  .empty {
    margin-top: 10px;
  }
  .label {
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
    padding: 0 0 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      font-size: 12px;
      color: #ccc;
    }
  }
  .comment-list {
    margin-top: 16px;
    padding: 0 10px;
    box-sizing: border-box;
    .comment-item {
      margin-bottom: 20px;
      display: flex;
      .avatar-img {
        margin-right: 6px;
      }
      .message-wrap {
        flex: 1;
        padding-bottom: 20px;
        border-bottom: 1px solid #eeeeee;
        .name-time {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #999999;
        }
        .message-content {
          margin-top: 20px;
          color: #333;
          font-size: 14px;
        }
      }
    }
    .loadmore {
      display: flex;
      justify-content: center;
    }
  }
  .bottom-popup {
    padding: 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content {
      margin:0 0 10px;
    }
    .btn-wrap {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
