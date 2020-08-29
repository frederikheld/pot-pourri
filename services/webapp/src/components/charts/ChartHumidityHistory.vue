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
                  unit: 'hour'
                }
              },
              {
                id: 'x-axis-percent',
                type: 'linear',
                min: 0,
                max: 100
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
                id: 'healthy-max-fill',
                type: 'box',
                xScaleID: 'x-axis-percent',
                yScaleID: 'y-axis-percent',
                xMin: 0,
                xMax: 100,
                yMin: 70,
                yMax: 100,
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
                xMin: 0,
                xMax: 100,
                yMin: 0,
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
