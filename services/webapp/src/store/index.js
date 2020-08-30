import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import appSettings from './modules/app-settings'
import featureToggles from './modules/feature-toggles'
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
    featureToggles,
    lab,
    theme
  },
  state: { },
  getters: { },
  mutations: { },
  actions: { }
})
