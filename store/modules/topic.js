

import { getTopicList } from '@/api/topic.js';

export default {
  namespaced: true,
  state() {
    return {
      topicData: {
        data: [],
        total: 0
      },
      query: {
        topic: '',
        categoryId: '',
        pageNum: 1,
        pageSize: 12
      }
    }
  },
  getters: {
    getQuery: (state) => {
      return state.query;
    }
  },
  mutations: {
    /**
     * 设置题目列表
     * @param {*} state 
     * @param {*} topicData 
     */
    setTopicData(state, { res, isReachBottom }) {
      const { data, total } = res;
      // 下拉加载是累积
      if(isReachBottom) {
        state.topicData.data = [...state.topicData.data, ...data];
        state.topicData.total = total;
      } else {
        state.topicData = res;
      }
    },
    /**
     * 清空题目列表
     * @param {*} state 
     */
    cleanTopicList(state) {
      state.topicData = {
        data: [],
        total: 0
      };
    },
    /**
     * 修改查询条件 
     */
    changeQuery(state, params) {
      state.query = Object.assign(state.query, params);
    }
  },
  actions: {
    /**
     * 获取题目列表
     **/
    getTopicListAction({ commit, state }, { isReachBottom }) {
      const { topic, categoryId, pageNum, pageSize } = state.query;
      return new Promise((resolve, reject) => {
        getTopicList({
          topic,
          categoryId,
          pageNum,
          pageSize
        }).then((res) => {
          commit('setTopicData', { res, isReachBottom });
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      })
    }
  }
}
