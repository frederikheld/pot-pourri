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

const InfluxConnector = require('../../methods/influxConnector')

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
    ...mapGetters('theme', [
      'iconMap'
    ]),
    ...mapGetters('appSettings', [
      'appSettings',
      'influxdbConnectionData'
    ])
  },
  async mounted () {
    await this.fetchCurrentSensorData()
  },
  methods: {
    async fetchCurrentSensorData () {
      this.fetchingCurrentSensorData = true

      const influxConnector = new InfluxConnector(this.influxdbConnectionData)

      this.currentSensorData.humidity = await influxConnector.fetchCurrentSensorValuePercent(this.$props.deviceCode, 'humidity')

      this.fetchingCurrentSensorData = false
    }
  }
}
</script>
