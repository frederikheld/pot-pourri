<template>
  <div
    v-if="fetchingCurrentSensorData"
    style=""
  >
    <LoadingIndicator type="inline" />
  </div>
  <div
    v-else
  >
    <v-icon
      v-if="currentSensorData.humidity > 30 && currentSensorData.humidity < 70"
      color="primary"
    >
      mdi-emoticon-excited-outline
    </v-icon>
    <v-icon
      v-else
      color="error"
    >
      mdi-emoticon-sad-outline
    </v-icon>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

const Influx = require('influx')

export default {
  name: 'PlantMoodIndicator',
  components: { LoadingIndicator },
  props: {
    deviceCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentSensorData: {
        humidity: undefined
      },
      fetchingCurrentSensorData: false
    }
  },
  computed: {
    ...mapGetters([
      'iconMap',
      'appSettings'
    ])
  },
  async mounted () {
    await this.fetchCurrentSensorData()
  },
  methods: {
    async fetchCurrentSensorData () {
      this.fetchingCurrentSensorData = true

      const influx = new Influx.InfluxDB({
        host: this.appSettings.network.influxdb.address,
        port: this.appSettings.network.influxdb.port,
        username: this.appSettings.network.influxdb.username,
        password: this.appSettings.network.influxdb.password,
        database: this.appSettings.network.influxdb.database
      })

      const query = 'SELECT ((1024 - last("value")) / 1024) * 100 FROM "autogen"."mqtt_consumer" WHERE ("topic" = \'potpourri/devices/' + this.$props.deviceCode + '/sensors/humidity\')'

      const result = await influx.query(query)

      if (result && result[0]) {
        this.currentSensorData.humidity = result[0].last
      } else {
        this.currentSensorData = undefined
      }

      this.fetchingCurrentSensorData = false
    }
  }
}
</script>
