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

const Influx = require('influx')

export default {
  name: 'PlantHumidityHistory',
  components: { ChartHumidityHistory, LoadingIndicator },
  props: {
    plantId: {
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
      'appSettings'
    ])
  },
  async mounted () {
    await this.fetchSensorData()
    this.generateChartData()
  },
  methods: {
    async fetchSensorData () {
      this.fetchingSensorData = true

      const influx = new Influx.InfluxDB({
        host: this.appSettings.network.influxdb.address,
        port: this.appSettings.network.influxdb.port,
        username: this.appSettings.network.influxdb.username,
        password: this.appSettings.network.influxdb.password,
        database: 'telegraf'
      })

      const query = 'SELECT (1024 - "value") / 1024 * 100 FROM "autogen"."mqtt_consumer" WHERE ("topic" = \'potpourri/devices/' + this.$props.plantId + '/sensors/humidity\') AND time > now() - 6h ORDER BY time DESC'

      const result = await influx.query(query)

      if (result) {
        this.sensorData = result
      } else {
        this.sensorData = undefined
      }
      this.fetchingSensorData = false
    },
    generateChartData () {
      const dataPoints = []

      if (this.sensorData && this.sensorData.length > 0) {
        this.sensorData.forEach((item, i) => {
        // dataPoints.push(item.value)
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
