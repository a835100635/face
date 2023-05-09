<template>
  <view class="integral-log-block">
    <view class="log-info">
      <view class="log-info-score">
        <view>{{ scoreData.yesterdayScore || 0 }}</view>
        <view class="label">昨天获得</view>
      </view>
      <view class="log-info-score">
        <view class="total">{{ scoreData.totalScore || 0 }}</view>
        <view class="label">现有积分</view>
      </view>
      <view class="log-info-score">
        <view>{{ scoreData.todayScore || 0 }}</view>
        <view class="label">今天获得</view>
      </view>
    </view>
    <view class="log-list-wrap">
      <scroll-view
        class="scroll-view"
        scroll-y="true"
        style="height: 100%; margin-top: 10px"
        bindscroll="contenScrollY"
        scroll-with-animation="true"
      >
        <view class="scroll-wrap">
          <view class="log-item" v-for="item in list" :key="item.id">
            <view class="log-item-view">
              <view class="source">{{ getSourceText(item.source) }}</view>
              <view class="rate">
                <uni-tag
                  v-if="item.rate > 1"
                  :text="`倍率*${item.rate}`"
                  size="small"
                  type="error"
                ></uni-tag>
              </view>
            </view>
            <view class="log-item-view">
              <view class="integral" :class="integralStyle(item.change)">{{
                item.change
              }}</view>
              <view class="time">{{ item.createdTime }}</view>
            </view>
          </view>
          <view
            class="load-more"
            v-if="list.length < scoreData.total"
            @click="loadMore"
          >
            加载更多
          </view>
          <view class="load-more" v-if="!list.length"> 暂无记录 </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup>
import { ref } from "vue";
import { integralLogData } from "@/api/user";

const list = ref([]);
const scoreData = ref({
  total: 0,
  data: [],
});

const getSourceText = (type) => {
  switch (type) {
    case "SIGN_IN":
      return "签到";
    default:
      return "-";
  }
};
const integralStyle = (integral) => {
  return integral > 0 ? "score" : "deduction";
};
const query = ref({
  pageNum: 1,
  pageSize: 30,
});
const fetchData = async () => {
  try {
    const result = await integralLogData(query.value);
    scoreData.value = result;
    list.value.push(...result.data);
  } catch (error) {
    uni.showToast({
      title: "请求失败",
      icon: "error",
      duration: 2000,
    });
  }
};
fetchData();
const loadMore = () => {
  query.value.pageNum += 1;
  fetchData();
};
</script>
<style lang="scss">
.integral-log-block {
  padding: 14px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  font-size: 14px;
  overflow: hidden;
  .log-info {
    height: 70px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    padding: 0 0 20px;
    &-score {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      .total {
        font-size: 20px;
        color: #3679f5;
        font-weight: 600;
      }
      .label {
        font-size: 12px;
      }
    }
  }
  .log-list-wrap {
    border-radius: 8px;
    margin-top: 10px;
    flex: 1;
    background-color: white;
    overflow: hidden;
    .scroll-view {
      overflow-y: scroll;
      .scroll-wrap {
        padding: 0 10px 10px;
        box-sizing: border-box;
      }
      &::-webkit-scrollbar {
        width: 0 !important; // 去掉滚动条的宽度
      }
      &::-webkit-scrollbar-thumb {
        display: none; // 隐藏滚动条的轨道
      }
    }
    .log-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      &-view {
        display: flex;
        flex-direction: column;
        .source,
        .integral {
          margin-bottom: 6px;
        }
        .integral {
          align-self: flex-end;
          &.deduction {
            color: #4c9e44;
          }
          &.score {
            color: #ea3e3c;
          }
        }
        .time {
          color: #a8a8a8;
        }
      }
    }
    .log-item + .log-item {
      border-top: 1px solid #dddddd;
    }
    .load-more {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      box-sizing: border-box;
      font-size: 12px;
    }
    .log-item + .load-more {
      border-top: 1px solid #dddddd;
    }
  }
}
</style>
