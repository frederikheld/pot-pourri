import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import appSettings from './modules/app-settings'
import appFeatureToggles from './modules/app-feature-toggles'
import lab from './modules/lab'
import theme from './modules/theme'

const vuexLocal = new VuexPersistence({
  key: 'pot-pourri',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    appSettings,
    appFeatureToggles,
    lab,
    theme
  },
  state: {
    mqtt: {
      client: undefined,
      lastMessage: undefined
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
