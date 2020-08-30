import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import appSettings from './modules/app-settings'
import appFeatureToggles from './modules/app-feature-toggles'

const vuexLocal = new VuexPersistence({
  key: 'pot-pourri',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    appSettings,
    appFeatureToggles
  },
  state: {
    maps: {
      icons: {
        default: 'mdi-gauge',
        humidity: 'mdi-water',
        light: 'mdi-weather-sunny',
        rain: 'mdi-weather-pouring',
        'ph-value': 'mdi-image-filter-hdr',
        temperature: 'mdi-thermometer'
      }
    },
    mqtt: {
      client: undefined,
      lastMessage: undefined
    },
    lab: {
      count: 0,
      countDirect: 0
    },
    labSettings: {
      foo: {
        bar: { }
      }
    }
  },
  getters: {
    iconMap: function (state) {
      return state.maps.icons
    },
    count (state) {
      return state.lab.count
    },
    labSettings (state) {
      return state.labSettings
    }
  },
  mutations: {
    INCREMENT_COUNTER (state) {
      state.lab.count++
    },
    DECREMENT_COUNTER (state) {
      state.lab.count--
    },
    SAVE_LAB_SETTINGS (state, newLabSettingsObject) {
      state.labSettings = newLabSettingsObject
    }
  },
  actions: {
  }
})
