const appSettings = {
  namespaced: true,
  state: {
    appSettings: {
      network: {
        mqtt: {
          protocol: 'https',
          address: 'localhost',
          port: 1883
        },
        metastore: {
          protocol: 'https',
          address: 'localhost',
          port: 3003
        },
        influxdb: {
          protocol: 'https',
          address: 'localhost',
          port: 8086,
          username: undefined,
          password: undefined,
          database: 'telegraf'
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
    },
    influxdbConnectionData: function (state) {
      const influxConnectionData = {
        host: state.appSettings.network.influxdb.address,
        port: state.appSettings.network.influxdb.port,
        username: state.appSettings.network.influxdb.username,
        password: state.appSettings.network.influxdb.password,
        database: state.appSettings.network.influxdb.database
      }

      return influxConnectionData
    }
  },
  mutations: {
    SAVE_APP_SETTINGS (state, newAppSettingsObject) {
      state.appSettings = newAppSettingsObject
    }
  }
}

module.exports = appSettings
