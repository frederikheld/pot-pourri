const appSettings = {
  state: {
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
  },
  getters: {
    appSettings: function (state) {
      return state
    },
    mqttServerAddress: function (state) {
      return state.network.mqtt.protocol + '://' + state.network.mqtt.address + ':' + state.network.mqtt.port
    },
    metastoreServerAddress: function (state) {
      return state.network.metastore.protocol + '://' + state.network.metastore.address + ':' + state.network.metastore.port
    },
    influxdbConnectionData: function (state) {
      const influxConnectionData = {
        host: state.network.influxdb.address,
        port: state.network.influxdb.port,
        username: state.network.influxdb.username,
        password: state.network.influxdb.password,
        database: state.network.influxdb.database
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
