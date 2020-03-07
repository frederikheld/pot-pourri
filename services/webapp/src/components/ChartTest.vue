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
      chart: {}
    }
  },
  mounted () {
    this.createChart(this.$refs.chart, this.chartData)
    console.log(this.chart)
  },
  methods: {
    createChart (ctx, data) {
      console.log('data:', data)
      const convertedData = []
      data.forEach(function (value) {
        console.log('value:', value)
        convertedData.push({
          data: [value]
        })
      })
      console.log('convertedData:', convertedData)
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: convertedData
        },
        options: {
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
