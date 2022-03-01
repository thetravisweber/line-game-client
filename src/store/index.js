import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myScore: 0,
    myName: '',
    leaderboard: [],
  },
  getters: {
    getMyScore(state) {
      return state.myScore;
    },
    getLeaderboard(state) {
      return state.leaderboard;
    }
  },
  mutations: {
    updateMyScore(state, payload) {
      console.log("score getting updated:", payload);
      state.myScore = payload;
    },
    updateLeaderBoard(state, payload) {
      state.leaderboard = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
