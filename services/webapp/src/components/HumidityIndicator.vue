<template>
  <canvas ref="humidity_indicator" />
</template>

<script>
import Chart from 'chart.js'
import * as chartjsPluginAnnotation from 'chartjs-plugin-annotation'

export default {
  props: {
    humidity: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chartHumidity: undefined
    }
  },
  mounted () {
    // console.log('HumidityIndicator mounted')
    // console.log('this.humidity:', this.humidity)

    this.$nextTick(function () {
      this.createChart(this.$refs.humidity_indicator, this.humidity)
    })
  },
  methods: {
    createChart (ctx, data) {
      //   console.log('data:', data)

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
