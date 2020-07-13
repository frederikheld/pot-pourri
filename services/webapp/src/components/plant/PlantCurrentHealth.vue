<template>
  <div
    v-if="fetchingCurrentSensorData"
    style="height: 4rem; width: 100%; position: absolute; "
  >
    <LoadingIndicator type="box" />
  </div>
  <v-simple-table v-else-if="currentSensorData">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="currentSensorData.humidity">
        <td>
          <v-icon>{{ iconMap.humidity }}</v-icon>
        </td>
        <td>
          <v-icon v-if="currentSensorData.humidity > 30 && currentSensorData.humidity < 70">
            mdi-thumb-up
          </v-icon>
          <v-icon v-else>
            mdi-thumb-down
          </v-icon>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
  <div
    v-else
    style="text-align: center; vertical-align: middle; height: 4rem;"
  >
    <span
      style="display: inline-block; margin-top: 1.4rem;"
    >No health data available</span>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

const Influx = require('influx')

export default {
  name: 'PlantCurentHealth',
  components: { LoadingIndicator },
  props: {
    plantId: {
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
      'influxdb'
    ])
  },
  async mounted () {
    await this.fetchCurrentSensorData()
  },
  methods: {
    async fetchCurrentSensorData () {
      this.fetchingCurrentSensorData = true

      const influx = new Influx.InfluxDB({
        host: this.influxdb.address,
        port: this.influxdb.port,
        username: 'admin',
        password: 'admin',
        database: 'telegraf'
      })

      const query = 'SELECT ((1024 - last("value")) / 1024) * 100 FROM "autogen"."mqtt_consumer" WHERE ("topic" = \'potpourri/devices/' + this.$props.plantId + '/sensors/humidity\')'

      const result = await influx.query(query)

      // console.log('current humidity', result[0].last)

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
