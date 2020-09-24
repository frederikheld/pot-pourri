<template>
  <div
    v-if="fetchingData"
    style="height: 4rem; width: 100%; position: absolute; "
  >
    <LoadingIndicator type="box" />
  </div>
  <div v-else>
    <v-simple-table v-if="activeSensors.length > 0">
      <thead style="display: none;">
        <tr>
          <th>Icon</th>
          <th>Parameter</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="measurand in activeSensors"
          :key="measurand.id"
        >
          <td style="width: 1rem;">
            <v-icon>{{ iconMap[measurand.id] }}</v-icon>
          </td>
          <td>
            {{ measurand.id }}
          </td>
          <td>
            <v-icon v-if="valueIsOkay(measurand.id) === true">
              mdi-thumb-up
            </v-icon>
            <v-icon v-else-if="valueIsOkay(measurand.id) === false">
              mdi-thumb-down
            </v-icon>
            <v-icon v-else>
              mdi-help
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-row
      v-else
    >
      <v-col
        class="my-3"
        align="center"
      >
        <p class="body-1">
          No sensors active.
        </p>
        <p class="body-2">
          You can change that via the sensor settings in the <span style="white-space: nowrap;"><v-icon>mdi-dots-vertical</v-icon> menu!</span>
        </p>
      </v-col>
    </v-row>
  </div>
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
      currentSensorData: {},
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
    activeSensors () {
      const activeSensors = []

      for (const sensorId in this.plant.measurands) {
        if (this.plant.measurands[sensorId].active) {
          activeSensors.push({
            id: sensorId,
            ...this.plant.measurands[sensorId]
          })
        }
      }

      return activeSensors
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

      await this.fetchMetaData()
      await this.fetchCurrentSensorValues()

      this.fetchingData = false
    },
    async fetchMetaData () {
      this.plantSettings = await this.metastoreConnector.fetchPlantSettings(this.$props.plant.id)
    },
    async fetchCurrentSensorValues () {
      this.currentSensorData.humidity = await this.influxConnector.fetchCurrentSensorValuePercent(this.$props.plant.deviceCode, 'humidity', '6h')
    },
    valueIsOkay (sensorId) {
      if (!this.currentSensorData[sensorId]) {
        return undefined
      } else {
        const healthyMin = this.$props.plant?.measurands?.[sensorId]?.healthyMin || 0
        const healthyMax = this.$props.plant?.measurands?.[sensorId]?.healthyMax || 100

        if (
          healthyMin < this.currentSensorData[sensorId] &&
          healthyMax > this.currentSensorData[sensorId]
        ) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
