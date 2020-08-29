<template>
  <div
    v-if="fetchingCurrentSensorData || fetchingPlantSettings"
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
          <v-icon v-if="currentSensorData.humidity > healthyHumidity[0] && currentSensorData.humidity < healthyHumidity[1]">
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

const InfluxConnector = require('../../methods/influxConnector')

export default {
  name: 'PlantCurentHealth',
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
      healthyHumidity: [undefined, undefined],
      fetchingCurrentSensorData: false,
      fetchingPlantSettings: false
    }
  },
  computed: {
    ...mapGetters([
      'iconMap',
      'influxdbConnectionData',
      'metastoreServerAddress'
    ])
  },
  async mounted () {
    await Promise.all([
      this.fetchCurrentSensorData(),
      this.fetchPlantSettings()
    ])
  },
  methods: {
    async fetchCurrentSensorData () {
      this.fetchingCurrentSensorData = true

      const influxConnector = new InfluxConnector(this.influxdbConnectionData)

      this.currentSensorData.humidity = await influxConnector.fetchCurrentSensorValuePercent(this.$props.deviceCode, 'humidity')

      this.fetchingCurrentSensorData = false
    },
    async fetchPlantSettings () {
      this.fetchingPlantSettings = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()

        this.healthyHumidity = [
          plant.measurands?.humidity?.healthyMin || 0,
          plant.measurands?.humidity?.healthyMax || 100
        ]
      } catch (err) {
        console.error(err)
      }

      this.fetchingPlantSettings = false
    }
  }
}
</script>
