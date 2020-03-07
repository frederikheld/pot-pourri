<template>
  <div>
    <canvas ref="chart" />
    <div>{{ chartData }}</div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'ChartTest',
  props: {
    chartData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      chart: {},
      formattedData: []
    }
  },
  watch: {
    chartData: function (newData, oldData) {
      //   console.log('chartData updated!', newData)
      this.formattedData = this.formatChartData(newData)
      this.chart.data.datasets = this.formattedData
      this.chart.update()
    }
  },
  mounted () {
    this.formattedData = this.formatChartData(this.chartData)
    this.createChart(this.$refs.chart, this.formattedData)
    // console.log(this.chart)
  },
  methods: {
    formatChartData (data) {
      //   console.log('data:', data)
      const formattedData = []
      data.forEach(function (value) {
        // console.log('value:', value)
        formattedData.push({
          data: [value]
        })
      })
      return formattedData
    },
    createChart (ctx, data) {
      //   console.log('this.formattedData:', this.formattedData)
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: this.formattedData
        },
        options: {
          animation: {
            duration: 0
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0.0,
                  max: 1.0
                }
              }
            ]
          }
        }
      })
    }
  }
}
</script>
