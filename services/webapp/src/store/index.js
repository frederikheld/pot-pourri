import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mqtt: {
      client: undefined,
      lastMessage: undefined
    },
    lab: {
      count: 0,
      countDirect: 0
    }
  },
  getters: {
    count (state) {
      return state.lab.count
    }
  },
  mutations: {
    INCREMENT_COUNTER (state) {
      state.lab.count++
    },
    DECREMENT_COUNTER (state) {
      state.lab.count--
    }
  },
  actions: {
  },
  modules: {
  }
})
