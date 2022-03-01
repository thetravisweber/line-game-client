import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myScore: 0,
    myName: '',
    leaderboard: [{
      "n": "holder",
      "s": 0
    }],
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
      state.myScore = payload;
    },
    updateLeaderboard(state, payload) {
      console.log("leaderboard updated:", payload);
      state.leaderboard = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
