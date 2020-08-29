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
      formattedData: []
    }
  },
  computed: { },
  watch: {
    chartData: function (newChartData, oldChartData) {
      this.formattedData = this.formatChartData(newChartData)
      this.chart.data.datasets = this.formattedData

      // re-render chart:
      this.chart.update()
    }
  },
  mounted () {
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
                ticks: {
                  callback: function (value, index, values) {
                    const hour = value.match(new RegExp(/(\d\d):\d\d/))[1]

                    if (hour % 2 === 0) {
                      return value
                    }
                  }
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
                  stepSize: 20
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
                xMax: this.timestampLastMidnignt(),
                borderWidth: 0,
                backgroundColor: 'rgba(0,0,0,0.1)'
              },
              {
                id: 'midnight',
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-time',
                value: this.timestampLastMidnignt(),
                borderWidth: 2,
                borderColor: 'rgba(0,0,0,0.2)'
              },
              {
                id: 'healthy-max-fill',
                type: 'box',
                xScaleID: 'x-axis-percent',
                yScaleID: 'y-axis-percent',
                yMin: 70,
                borderWidth: 2,
                backgroundColor: 'rgba(255,150,0,0.2)'
              },
              {
                id: 'healthy-max',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-percent',
                value: 70,
                borderWidth: 2,
                borderColor: 'rgba(255,150,0,0.6)'
              },
              {
                id: 'healthy-min-fill',
                type: 'box',
                xScaleID: 'x-axis-percent',
                yScaleID: 'y-axis-percent',
                yMax: 30,
                borderWidth: 2,
                backgroundColor: 'rgba(255,0,0,0.2)'
              },
              {
                id: 'healthy-min',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-percent',
                value: 30,
                borderWidth: 2,
                borderColor: 'rgba(255,0,0,0.6)'
              }
            ]
          }
        }
      })
    },
    timestampLastMidnignt: function (startTime, endTime) {
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
