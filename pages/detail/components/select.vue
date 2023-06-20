<template>
  <view class="select-warp">
    <view class="options" v-if="options.length">
      <view class="tip">
        <i class="iconfont icon-cankaodaan"></i> 问题选项
      </view>
      <!-- 选项 -->
      <view class="checkbox">
        <view class="checkbox-item" v-for="item in options" :key="item">
          <view class="value"> {{ item.value }} : </view>
          <view class="">
            {{ item.text }}
          </view>
        </view>
      </view>

      <!-- 正确答案 -->
      <fui-collapse class="correct-collapse">
        <fui-collapse-item>
          <view class="fui-item__box">
            <i class="iconfont icon-cankaodaan"></i>
            <text class="title">查看答案</text>
          </view>
          <template v-slot:content>
            <view class="slot-content">
              <view class="correct">
                正确答案：<text class="correct-tip">{{ correct }}</text>
              </view>
            </view>
          </template>
        </fui-collapse-item>
      </fui-collapse>
    </view>

    <!-- 答案解析 -->
    <fui-collapse v-if="answer">
      <fui-collapse-item :open="false">
        <view class="fui-item__box">
          <i class="iconfont icon-cankaodaan"></i>
          <text class="title">解析</text>
        </view>
        <template v-slot:content>
          <view class="slot-content">
            <mp-html class="mphtml" :content="answer" imgtap="onImageTap"></mp-html>
          </view>
        </template>
      </fui-collapse-item>
    </fui-collapse>
  </view>
</template>

<script>
import { computed, defineProps } from "vue";
import { LEARNING_TYPE } from "@/constants/index.js";
import content from "./content.js";

import fuiCollapse from "@/components/firstui/fui-collapse/fui-collapse.vue";
import fuiCollapseItem from "@/components/firstui/fui-collapse-item/fui-collapse-item.vue";

export default {
  name: "SlectComponent",
  components: {
    fuiCollapse,
    fuiCollapseItem,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    // 问题类型
    type: {
      type: Number,
      default: LEARNING_TYPE.VIEW,
    },
  },
  data() {
    return {
      radio1: "",
    };
  },
  computed: {
    answer({ data }) {
      if (data.answer) {
        return data.answer;
      } else {
        return '暂无解析'
      }
    },
    options({ data }) {
      const kyes = Object.keys(data.options || {});
      return kyes.map((i) => {
        return {
          text: data.options[i],
          value: i,
        };
      });
    },
    correct({ data }) {
      return data.correct;
    },
  },
  methods: {
    mpHtmlLoad() {
      console.log("mp-html load-->");
    },
    onImageTap(e) {
      console.log("onImageTap-->", e);
      const imageUrl = event.target.currentSrc; // 获取当前图片地址
      if (/^\/face\/temporaryStorage/.test(imageUrl)) { // 判断是否为需要代理的图片地址格式
        event.preventDefault(); // 阻止默认加载图片的行为
        const newImageUrl = 'http://face-interview.online' + imageUrl; // 拼接新的图片地址
        event.target.setAttribute('src', newImageUrl); // 设置图片的新地址
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.select-warp {
  color: #333;
  .options {
    .checkbox {
      padding: 15px 10px 0;
      box-sizing: border-box;
      .checkbox-item {
        display: flex;
        color: #666;
        .value {
          margin-right: 10px;
          white-space: nowrap;
        }
      }
      .checkbox-item + .checkbox-item {
        margin-top: 16px;
      }
    }
    .correct-collapse {
      .label {
        padding: 10px 0;
      }
      .correct {
        margin: 20px 0 0;
        &-tip {
          color: #5b85f7;
        }
      }
    }
  }
  .fui-item__box {
    width: 100%;
    padding: 16px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 18px;
      margin-right: 4px;
    }
    .title {
      font-weight: 600;
    }
  }
  .slot-content {
    padding: 0 0 20px;
  }
}
</style>
