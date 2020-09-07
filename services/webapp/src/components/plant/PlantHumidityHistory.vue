<template>
  <div>
    <ChartHumidityHistory
      v-if="chartData"
      :chart-data="chartData"
      :options="chartOptions"
      :healthy-min="plant.measurands.humidity.healthyMin"
      :healthy-max="plant.measurands.humidity.healthyMax"
    />
    <div
      v-else
      style="text-align: center; vertical-align: middle; height: 4rem;"
    >
      <span
        style="display: inline-block; margin-top: 1.4rem;"
      >No historic data available</span>
    </div>
  </div>
</template>

<script>
import ChartHumidityHistory from '@/components/charts/ChartHumidityHistory.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'PlantHumidityHistory',
  components: { ChartHumidityHistory },
  props: {
    plant: {
      type: Object,
      required: true
    },
    sensorData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
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
    ...mapGetters('theme', [
      'iconMap'
    ])
  },
  async mounted () {
    this.generateChartData()
  },
  methods: {
    generateChartData () {
      const dataPoints = []

      if (this.$props.sensorData && this.$props.sensorData.length > 0) {
        this.$props.sensorData.forEach((item, i) => {
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
