<template>
  <div
    v-if="fetchingData"
    style="height: 4rem; width: 100%; position: absolute; "
  >
    <LoadingIndicator type="box" />
  </div>
  <v-simple-table v-else>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <v-icon>{{ iconMap.humidity }}</v-icon>
        </td>
        <td>
          <v-icon v-if="humidityIsOkay === true">
            mdi-thumb-up
          </v-icon>
          <v-icon v-else-if="humidityIsOkay === false">
            mdi-thumb-down
          </v-icon>
          <v-icon v-else>
            mdi-help
          </v-icon>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'
import MetastoreConnector from '../../methods/metastoreConnector'

const InfluxConnector = require('../../methods/influxConnector')

export default {
  name: 'PlantCurentHealth',
  components: { LoadingIndicator },
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentSensorData: {
        humidity: undefined
      },
      fetchingData: false,
      metastoreConnector: undefined,
      influxConnector: undefined
    }
  },
  computed: {
    ...mapGetters('theme', [
      'iconMap'
    ]),
    ...mapGetters('appSettings', [
      'influxdbConnectionData',
      'metastoreServerAddress'
    ]),
    humidityIsOkay () {
      if (!this.currentSensorData.humidity) {
        return undefined
      } else {
        const humidityHealthyMin = this.$props.plant?.measurands?.humidity?.healthyMin || 0
        const humidityHealthyMax = this.$props.plant?.measurands?.humidity?.healthyMax || 100

        if (
          humidityHealthyMin < this.currentSensorData.humidity &&
          humidityHealthyMax > this.currentSensorData.humidity
        ) {
          return true
        } else {
          return false
        }
      }
    }
  },
  beforeMount () {
    this.metastoreConnector = new MetastoreConnector(this.metastoreServerAddress)
    this.influxConnector = new InfluxConnector(this.influxdbConnectionData)

    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.fetchingData = true

      this.currentSensorData.humidity = await this.influxConnector.fetchCurrentSensorValuePercent(this.$props.plant.deviceCode, 'humidity', '6h')

      this.plantSettings = await this.metastoreConnector.fetchPlantSettings(this.$props.plant.id)

      this.fetchingData = false
    }
  }
}
</script>
