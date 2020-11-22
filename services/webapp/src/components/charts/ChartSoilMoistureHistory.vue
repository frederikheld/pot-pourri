<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import 'chartjs-adapter-moment'
import * as chartjsPluginAnnotation from 'chartjs-plugin-annotation'

export default {
  name: 'ChartSoilMoistureHistory',
  props: {
    chartData: {
      type: Array,
      default: () => { return [] }
    },
    healthyMin: {
      type: Number,
      default: 0
    },
    healthyMax: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      chart: {},
      formattedData: []
    }
  },
  watch: {
    chartData: function (newChartData, oldChartData) {
      this.formattedData = this.formatChartData(newChartData)
      this.chart.data.datasets = this.formattedData

      // re-render chart:
      this.chart.update()
    },
    healthyMin: function (newHealthyMin, oldHealthyMin) {
      if (this.chart) {
        this.chart.annotation.elements['healthy-min'].options.value = newHealthyMin
        this.chart.annotation.elements['healthy-min-fill'].options.yMax = newHealthyMin
        this.chart.update()
      }
    },
    healthyMax: function (newHealthyMax, oldHealthyMax) {
      if (this.chart) {
        this.chart.annotation.elements['healthy-max'].options.value = newHealthyMax
        this.chart.annotation.elements['healthy-max-fill'].options.yMin = newHealthyMax
        this.chart.update()
      }
    }
  },
  async mounted () {
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
            label: 'Soil Moisture',
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
                  max: Date.now(),
                  min: Date.now() - 1000 * 60 * 60 * 24,
                  autoSkip: false
                  // source: 'date'
                },
                scaleLabel: {
                  labelString: 'time of day',
                  display: false
                }
              // },
              // {
              //   id: 'x-axis-percent',
              //   type: 'linear',
              //   min: 0,
              //   max: 100,
              //   display: false
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
                yMin: this.healthyMax,
                borderWidth: 0,
                backgroundColor: 'rgba(255,150,0,0.2)'
              },
              {
                id: 'healthy-max',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-percent',
                value: this.healthyMax,
                borderWidth: 1,
                borderColor: 'rgba(255,150,0,0.6)'
              },
              {
                id: 'healthy-min-fill',
                type: 'box',
                xScaleID: 'x-axis-percent',
                yScaleID: 'y-axis-percent',
                yMax: this.healthyMin,
                borderWidth: 0,
                backgroundColor: 'rgba(255,0,0,0.2)'
              },
              {
                id: 'healthy-min',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-percent',
                value: this.healthyMin,
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
    }
  }
}
</script>

<style>
</style>
