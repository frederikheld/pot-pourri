<template>
  <div>
    <!-- <canvas ref="lineChart" /> -->
    <canvas ref="chart" />
    <div>{{ chartData }}</div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import * as chartjsPluginAnnotation from 'chartjs-plugin-annotation'

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
      formattedData: [],
      median: 0,
      lineChart: {}
    }
  },
  watch: {
    chartData: function (newData, oldData) {
      // update chart data:
      this.formattedData = this.formatChartData(newData)
      this.chart.data.datasets = this.formattedData

      // update annotation line:
      this.chart.annotation.elements[
        'current-value'
      ].options.value = this.calculateMean(newData)
      this.chart.annotation.elements['current-value'].options.label.content =
        'mean = ' + Math.round(this.calculateMean(newData) * 100) / 100

      // re-render chart:
      this.chart.update()
    }
  },
  mounted () {
    this.formattedData = this.formatChartData(this.chartData)
    const cd = Object.assign({}, this.formattedData, [
      {
        type: 'line',
        data: [0.5, 0.5, 0.5, 0.5],
        borderWidth: 1,
        borderColor: 'rgba(255,50,50,1.0)'
      }
    ])
    this.createChart(this.$refs.chart, cd)

    // this.lineChart = new Chart(this.$refs.lineChart, {
    //   type: 'line',
    //   data: {
    //     labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //     datasets: [
    //       {
    //         label: 'Prime and Fibonacci',
    //         fillColor: 'rgba(220,220,220,0.2)',
    //         strokeColor: 'rgba(220,220,220,1)',
    //         pointColor: 'rgba(220,220,220,1)',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: 'rgba(220,220,220,1)',
    //         data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    //       },
    //       {
    //         label: 'My Second dataset',
    //         fillColor: 'rgba(151,187,205,0.2)',
    //         strokeColor: 'rgba(151,187,205,1)',
    //         pointColor: 'rgba(151,187,205,1)',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: 'rgba(151,187,205,1)',
    //         data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    //       }
    //     ]
    //   },
    //   options: {
    //     // scales: {
    //     //   yAxes: [
    //     //     {
    //     //       ticks: {
    //     //         beginAtZero: true
    //     //       }
    //     //     }
    //     //   ]
    //     // }
    //   }
    // })
  },
  methods: {
    calculateMean (data) {
      const sum = data.reduce((a, b) => a + b, 0)
      return sum / data.length
    },
    formatChartData (data) {
      const formattedData = []
      data.forEach(function (value) {
        formattedData.push({
          data: [value]
        })
      })
      return formattedData
    },
    createChart (ctx, data) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        plugins: [chartjsPluginAnnotation],
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
                id: 'y-axis-0',
                ticks: {
                  min: 0.0,
                  max: 1.0
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                id: 'current-value',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: this.calculateMean(this.chartData),
                borderWidth: 2,
                borderColor: 'rgba(255,50,50,1.0)',
                label: {
                  content:
                    'mean = ' +
                    Math.round(this.calculateMean(this.chartData) * 100) / 100,
                  position: 'center',
                  fontSize: 16,
                  backgroundColor: 'rgba(255,50,50,1.0)',
                  yPadding: 10,
                  xPadding: 10,
                  enabled: true
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
