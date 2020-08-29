<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import 'chartjs-adapter-moment'
import * as chartjsPluginAnnotation from 'chartjs-plugin-annotation'

import { mapGetters } from 'vuex'

export default {
  name: 'ChartHumidityHistory',
  props: {
    chartData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      chart: {},
      formattedData: [],
      healthyHumidity: [0, 100],
      fetchingPlantSettings: false
    }
  },
  computed: {
    ...mapGetters([
      'influxdbConnectionData',
      'metastoreServerAddress'
    ])
  },
  watch: {
    chartData: function (newChartData, oldChartData) {
      this.formattedData = this.formatChartData(newChartData)
      this.chart.data.datasets = this.formattedData

      // re-render chart:
      this.chart.update()
    }
  },
  async mounted () {
    await this.fetchPlantSettings()
    this.formattedData = this.formatChartData(this.$props.chartData)
    this.createChart(this.$refs.chart)
  },
  methods: {
    createChart (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        plugins: [chartjsPluginAnnotation],
        data: {
          datasets: [{
            label: 'Humidity',
            data: this.formattedData,
            xAxisID: 'x-axis-time',
            borderColor: 'rgba(100, 100, 255, 1.0)',
            pointBackgroundColor: 'rgba(100, 100, 255, 0.0)',
            pointBorderColor: 'rgba(100, 100, 255, 0.0)',
            pointHoverBorderColor: 'rgba(100, 100, 255, 1.0)',
            fill: false
          }]
        },
        options: {
          scales: {
            xAxes: [
              {
                id: 'x-axis-time',
                type: 'time',
                time: {
                  displayFormats: {
                    hour: 'HH:mm'
                  },
                  stepSize: 1
                },
                distribution: 'linear',
                ticks: {
                  callback: function (value, index, values) {
                    // returns only even hours to make the axis
                    // labels always go through midnight.
                    const hour = value.match(new RegExp(/(\d\d):\d\d/))[1]

                    if (hour % 2 === 0) {
                      return value
                    }
                  },
                  autoSkip: false,
                  source: 'date'
                },
                scaleLabel: {
                  labelString: 'time of day',
                  display: false
                }
              },
              {
                id: 'x-axis-percent',
                type: 'linear',
                min: 0,
                max: 100,
                display: false
              }
            ],
            yAxes: [
              {
                id: 'y-axis-percent',
                ticks: {
                  min: 0,
                  max: 100,
                  stepSize: 20,
                  callback (value, index, values) {
                    return value + ' %'
                  }
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                id: 'yesterday',
                type: 'box',
                xScaleID: 'x-axis-time',
                yScaleID: 'y-axis-percent',
                xMax: this.getTimestampLastMidnignt(),
                borderWidth: 0,
                backgroundColor: 'rgba(0,0,0,0.1)'
              },
              {
                id: 'midnight',
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-time',
                value: this.getTimestampLastMidnignt(),
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)'
              },
              {
                id: 'healthy-max-fill',
                type: 'box',
                xScaleID: 'x-axis-percent',
                yScaleID: 'y-axis-percent',
                yMin: this.healthyHumidity[1],
                borderWidth: 0,
                backgroundColor: 'rgba(255,150,0,0.2)'
              },
              {
                id: 'healthy-max',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-percent',
                value: this.healthyHumidity[1],
                borderWidth: 1,
                borderColor: 'rgba(255,150,0,0.6)'
              },
              {
                id: 'healthy-min-fill',
                type: 'box',
                xScaleID: 'x-axis-percent',
                yScaleID: 'y-axis-percent',
                yMax: this.healthyHumidity[0],
                borderWidth: 0,
                backgroundColor: 'rgba(255,0,0,0.2)'
              },
              {
                id: 'healthy-min',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-percent',
                value: this.healthyHumidity[0],
                borderWidth: 1,
                borderColor: 'rgba(255,0,0,0.6)'
              }
            ]
          }
        }
      })
    },
    getTimestampLastMidnignt: function (startTime, endTime) {
      const now = new Date()

      const lastMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      )

      return lastMidnight
    },
    formatChartData (data) {
      // for now this is just a dummy function that
      // can be used to format the chart if needed:
      const formattedData = []

      data.forEach((value) => {
        formattedData.push(value)
      })

      return formattedData
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

<style>
</style>
