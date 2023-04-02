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
          <img class="img" :src="item.avatar" alt="" srcset="" v-if="item.avatar">
          <i v-else class="img iconfont  icon-icon-test2"></i>
        </view>
        <view class="message-wrap">
          <!-- 昵称 时间 -->
          <view class="name-time">
            <text>{{ item.nickname }}</text>
            <text>{{ item.createTime }}</text>
          </view>
          <!-- 评论内容 -->
          <view class="message-content">
            {{ item.content }}
          </view>
          <!-- 评论内容 点赞点踩 后面支持 -->
          <view class="reply-btn">
            <span class="reply-tip">
              <i class="iconfont icon-icon"></i>
              <span class="reply-tip_label">(10)</span>
            </span>
            <span class="reply-tip" @click="openBottomPopup(item)">
              <i class="iconfont icon-xiaoxi"></i>
              <span class="reply-tip_label">回复</span>
            </span>
          </view>
          <!-- 子评论 -->
          <view class="reply-block" v-if="item.commentReplys && item.commentReplys.length">

            <view
              class="comment-item"
              v-for="rep in item.commentReplys"
              :key="rep.id"
            >
              <!-- 头像 -->
              <view class="avatar">
                <img class="img" :src="rep.avatar" alt="" srcset="" v-if="rep.avatar">
                <i v-else class="img iconfont  icon-icon-test2"></i>
              </view>
              <view class="message-wrap">
                <!-- 昵称 时间 -->
                <view class="name-time">
                  <text>
                    {{ rep.nickname }}
                    <text v-if="rep.replyToReplyId">
                      {{ calcReplyUserName(item, rep) }}
                    </text>
                  </text>
                  <text>{{ rep.createTime }}</text>
                </view>
                <!-- 评论内容 -->
                <view class="message-content">
                  {{ rep.replyContent }}
                </view>
                <!-- 评论内容 点赞点踩 后面支持 -->
                <view class="reply-btn">
                  <span class="reply-tip">
                    <i class="iconfont icon-icon"></i>
                    <span class="reply-tip_label">(10)</span>
                  </span>
                  <span class="reply-tip" @click="openBottomPopup(rep)">
                    <i class="iconfont icon-xiaoxi"></i>
                    <span class="reply-tip_label">回复</span>
                  </span>
                </view>
              </view>

            </view>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
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
      :maskClosable="false"
      @close="isShowBottomPopup = false"
    >
      <view class="bottom-popup">
        <view class="title">留言宝贵一言</view>
        <view class="content">
          <fui-textarea
            v-model="comment"
            placeholder="请输入评论内容"
            maxlength="100"
            radius="10"
            :isCounter="true"
            backgroundColor="#f8f8f8"
          ></fui-textarea>
        </view>
        <view class="btn-wrap">
          <view class="btn" @click="cancel"> 取消 </view>
          <view class="btn" @click="submitComment"> 提交 </view>
        </view>
      </view>
    </fui-bottom-popup>
  </view>
</template>

<script>
import fuiEmpty from "@/components/firstui/fui-empty/fui-empty.vue";
import fuiTextarea from "@/components/firstui/fui-textarea/fui-textarea.vue";
import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue";
import fuiAvatar from "@/components/firstui/fui-avatar/fui-avatar.vue"
export default {
  components: {
    fuiEmpty,
    fuiTextarea,
    fuiBottomPopup,
    fuiAvatar,
  }
}
</script>

<script setup>
import emptyImg from "@/assets/images/empty.png";
import { ref, reactive, computed } from "vue";
const commentData = reactive({
  total: 0,
  data: [
    {
      userId: 12,
      content: "答案运改这样,答案运改这样,答案运改这样,答案运改这样,答案运改这样",
      createTime: "2023-03-20 12:00:00",
      like: 100,
      id: 7194256991,
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      nickname: "oao",
      commentReplys: [
        {
          id: 101,
          // 一级回复评论
          replyCommentId: 7194256991,
          replyContent: '借个楼，本意是帮助大家面试，大伙可以乐观点，加油卷起来，不难的。然后加群一起成长的话，可以看看沸点。',
          createTime: "2023-03-21 12:00:00",
          like: 2,
          userId: 12,
          nickname: '12',
          avatar : ''
        },
        {
          id: 102,
          // 一级回复评论
          replyCommentId: 7194256991,
          replyContent: '你说错了',
          replyToReplyId: 101,
          like: 22,
          userId: 12,
          avatar: '',
          nickname: '3asd',
          createTime: "2023-03-21 12:00:00",
        }
      ]
    },
    {
      userId: 2,
      content: "答案运改这样",
      createTime: "2023-03-20 12:00:00",
      like: 100,
      id: 1,
      avatar: null,
      nickname: "阿斯顿",
    },
  ],
});
const isShowLoadmoreBtn = computed(() => {
  return commentData.total > commentData.data.length;
});

const loading = ref(false);

const loadmoreAction = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const openBottomPopup = () => {
  isShowBottomPopup.value = true;
};
const isShowBottomPopup = ref(false);
const comment = ref("");
const submitComment = () => {
  console.log("提交评论");
};

const cancel = () => {
  console.log("=");
  comment.value = "";
  isShowBottomPopup.value = false;
};

// 计算回复的名称
const calcReplyUserName = (main, item) => {
  const { commentReplys } = main;
  const data = commentReplys.find((i) => i.id === item.replyToReplyId);
  console.log(data);
  return ` 回复 ${data.nickname}`;
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
      .avatar {
        margin-right: 6px;
        .img {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
        }
      }
      .message-wrap {
        flex: 1;
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
        .reply-btn {
          display: flex;
          justify-content: flex-end;
          margin: 10px 0 10px;
          &>.iconfont {
            margin-right: 10px;
          }
          .reply-tip {
            display: flex;
            margin-left: 10px;
            .iconfont {
              color: #ccc;
            }
            .reply-tip_label {
              font-size: 12px;
              color: #ccc;
            }
          }
        }
      }
      .reply-block  {
        background-color: #fafafb;
        padding: 4px;
        border-radius: 8px;
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
      margin: 0 0 10px;
    }
    .btn-wrap {
      display: flex;
      justify-content: space-between;
      .btn {
        background-color: $uni-color-primary;
        color: white;
        padding: 2px 8px;
        border-radius: 6px;
      }
    }
  }
}
</style>
