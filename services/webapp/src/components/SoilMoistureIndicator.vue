<template>
  <canvas ref="soil_moisture_indicator" />
</template>

<script>
import Chart from 'chart.js'
import * as chartjsPluginAnnotation from 'chartjs-plugin-annotation'

export default {
  name: 'SoilMoistureIndicator',
  props: {
    humidity: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      chartHumidity: {}
    }
  },
  watch: {
    humidity: function (newData, oldData) {
      // update line that indicates current value:
      this.chartHumidity.annotation.elements['current-value'].options.value =
        newData.value / newData.upperLimit

      this.chartHumidity.annotation.elements[
        'current-value'
      ].options.label.content =
        Math.round((newData.value / newData.upperLimit) * 100) + ' %'

      // re-render chart:
      this.chartHumidity.update()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.createChart(this.$refs.soil_moisture_indicator, this.humidity)
    })
  },
  methods: {
    createChart (ctx, data) {
      this.chartHumidity = new Chart(ctx, {
        type: 'bar',
        plugins: [chartjsPluginAnnotation],
        data: {
          datasets: [
            {
              label: 'too dry',
              data: [data.lowerHealthyLimit / data.upperLimit],
              backgroundColor: ['rgba(150,100,100,.5)']
            },
            {
              label: 'healthy',
              data: [
                (data.upperHealthyLimit - data.lowerHealthyLimit) /
                  data.upperLimit
              ],
              backgroundColor: ['rgba(100,255,100,.5)']
            },
            {
              label: 'too humid',
              data: [
                (data.upperLimit - data.upperHealthyLimit) / data.upperLimit
              ],
              backgroundColor: ['rgba(100,100,255,.5)']
            }
          ]
        },
        options: {
          responsive: true,
          animation: {
            duration: 0
          },
          tooltips: {
            enabled: false
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: false
              }
            ],
            yAxes: [
              {
                id: 'y-axis-0',
                stacked: true,
                ticks: {
                  min: 0.0,
                  max: 1.0
                },
                display: false
              }
            ]
          },
          annotation: {
            // drawTime: 'afterDraw',
            annotations: [
              {
                id: 'current-value',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: data.value / data.upperLimit,
                borderWidth: 2,
                borderColor: 'rgba(255,50,50,1.0)',
                label: {
                  content:
                    Math.round((data.value / data.upperLimit) * 100) + ' %',
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
