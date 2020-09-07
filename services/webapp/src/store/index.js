import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import appSettings from './modules/app-settings'
import featureToggles from './modules/feature-toggles'
import lab from './modules/lab'
import metadata from './modules/metadata'
import sensordata from './modules/sensordata'
import theme from './modules/theme'

const vuexLocalPersistence = new VuexPersistence({
  key: 'pot-pourri',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appSettings,
    featureToggles,
    lab,
    metadata: metadata,
    sensordata,
    theme
  },
  plugins: [vuexLocalPersistence.plugin],
  strict: process.env.NODE_ENV !== 'production'
})
