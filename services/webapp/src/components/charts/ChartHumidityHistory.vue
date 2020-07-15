<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import 'chartjs-adapter-moment'

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
        data: {
          datasets: [{
            label: 'Humidity',
            data: this.formattedData,
            borderColor: 'rgba(100, 100, 255, 1.0)',
            pointBackgroundColor: 'rgba(100, 100, 255, 0.0)',
            pointBorderColor: 'rgba(100, 100, 255, 0.0)',
            pointHoverBorderColor: 'rgba(100, 100, 255, 1.0)',
            fill: false
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour'
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 100,
                stepSize: 20
              }
            }]
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
