import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: null,
    myScore: 0,
    myOwns: 0,
    myOrders: 0,
    myName: '',
    leaderboard: [{
      "n": "holder",
      "s": 0
    }],
    currentPrice: 100
  },
  getters: {
    getMyScore(state) {
      return state.myScore;
    },
    getMyOwns(state) {
      return state.myOwns;
    },
    getMyOrders(state) {
      return state.myOrders;
    },
    getLeaderboard(state) {
      return state.leaderboard;
    },
    getUsername(state) {
      return state.myName;
    },
    getConnection(state) {
      return state.connection;
    },
    getCurrentPrice(state) {
      return state.currentPrice;
    }
  },
  mutations: {
    updateMyScore(state, payload) {
      state.myScore = payload;
    },
    updateMyOwns(state, payload) {
      state.myOwns = payload;
    },
    updateMyOrders(state, payload) {
      state.myOrders = payload;
    },
    updateLeaderboard(state, payload) {
      state.leaderboard = payload;
    },
    setConnection(state, connection) {
      console.log("Connection set");
      state.connection = connection;
    },
    updateUsername(state, username) {
      console.log("username updated");
      state.myName = username;
    },
    updateCurrentPrice(state, newPrice) {
      state.currentPrice = newPrice;
    }
  },
  actions: {
    sendMessage(state, message) {
      const conn = state.getters.getConnection;
      console.log(conn);
      conn.send(message);
    },
    sendData(state, data) {
      const message = JSON.stringify(data);
      state.dispatch('sendMessage', message);
    },
  },
  modules: {
  }
})
