import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'freds-songbook',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    appSettings: {
      network: {
        mqtt: {
          protocol: 'https',
          address: 'foo',
          port: 1883
        },
        metastore: {
          protocol: 'https',
          address: 'bar',
          port: 3003
        }
      }
    }
  },
  getters: {
    appSettings: function (state) {
      return state.appSettings
    },
    mqttServerAddress: function (state) {
      return state.appSettings.network.mqtt.protocol + '://' + state.appSettings.network.mqtt.address + ':' + state.appSettings.network.mqtt.port
    },
    metastoreServerAddress: function (state) {
      return state.appSettings.network.metastore.protocol + '://' + state.appSettings.network.metastore.address + ':' + state.appSettings.network.metastore.port
    }
  },
  mutations: {
    SAVE_APP_SETTINGS (state, newAppSettingsObject) {
      state.appSettings = newAppSettingsObject
    }
  },
  actions: {
  },
  modules: {
  }
})
