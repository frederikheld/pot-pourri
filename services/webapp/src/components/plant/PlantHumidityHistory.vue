<template>
  <div
    v-if="fetchingSensorData"
    style="height: 4rem; width: 100%; position: absolute; "
  >
    <LoadingIndicator type="box" />
  </div>
  <ChartHumidityHistory
    v-else-if="!fetchingSensorData && chartData"
    :chart-data="chartData"
    :options="chartOptions"
  />
  <div
    v-else
    style="text-align: center; vertical-align: middle; height: 4rem;"
  >
    <span
      style="display: inline-block; margin-top: 1.4rem;"
    >No historic data available</span>
  </div>
</template>

<script>
import ChartHumidityHistory from '@/components/charts/ChartHumidityHistory.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

const InfluxConnector = require('../../methods/influxConnector')

export default {
  name: 'PlantHumidityHistory',
  components: { ChartHumidityHistory, LoadingIndicator },
  props: {
    deviceCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sensorData: undefined,
      fetchingSensorData: false,
      chartData: undefined,
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 100
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'iconMap',
      'influxdbConnectionData'
    ])
  },
  async mounted () {
    await this.fetchSensorData()
    this.generateChartData()
  },
  methods: {
    async fetchSensorData () {
      this.fetchingSensorData = true

      const influxConnector = new InfluxConnector(this.influxdbConnectionData)

      this.sensorData = await influxConnector.fetchSensorHistoryPercent(this.$props.deviceCode, 'humidity', '24h')

      this.fetchingSensorData = false
    },
    generateChartData () {
      const dataPoints = []

      if (this.sensorData && this.sensorData.length > 0) {
        this.sensorData.forEach((item, i) => {
          dataPoints.push({
            x: item.time,
            y: item.value
          })
        })

        this.chartData = dataPoints
      }
    }
  }
}
</script>
