<template>
  <div>
    <ChartSoilMoistureHistory
      v-if="sensorMoistureActive && chartData"
      :chart-data="chartData"
      :options="chartOptions"
      :healthy-min="moistureHealthyMin"
      :healthy-max="moistureHealthyMax"
    />
    <v-row
      v-else
    >
      <v-col
        v-if="!sensorMoistureActive"
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

      <v-col
        v-else-if="!chartData"
        class="my-3"
        align="center"
      >
        <p class="body-1">
          No data available for the last 24 hours.
        </p>
        <!-- <p class="body-2">
          // something the user can do about that
        </p> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ChartSoilMoistureHistory from '@/components/charts/ChartSoilMoistureHistory.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'PlantSoilMoistureHistory',
  components: { ChartSoilMoistureHistory },
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
    ]),
    moistureHealthyMin () {
      return this.$props.plant.measurands?.moisture?.healthyMin || 0
    },
    moistureHealthyMax () {
      return this.$props.plant.measurands?.moisture?.healthyMax || 100
    },
    sensorMoistureActive () {
      return this.$props.plant.measurands?.moisture?.active || false
    }
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
