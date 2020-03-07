<template>
  <canvas ref="humidity_indicator" />
</template>

<script>
// import { Bar, mixins } from 'vue-chartjs'

// eslint-disable-next-line
import Chart from 'chart.js'
// import chartjsPluginAnnotation from 'chartjs-plugin-annotation'
// const { reactiveProp } = mixins

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
  //   extends: Bar,
  //   mixins: [reactiveProp],
  //   props: ['chartData', 'options'],
  //   props: {
  //     humidity: {
  //       type: Object,
  //       default: function () {
  //         return {
  //           value: 20,
  //           upperLimit: 1024,
  //           lowerLimit: 0,
  //           upperHealthyLimit: 800,
  //           lowerHealthyLimit: 200
  //         }
  //       }
  //     }
  //   },
  mounted () {
    console.log('HumidityIndicator mounted')
    console.log('this.humidity:', this.humidity)

    this.$nextTick(function () {
      this.createChart(this.$refs.humidity_indicator, this.humidity)
    })
  },
  methods: {
    createChart (ctx, data) {
      console.log('data:', data)

      this.chartHumidity = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'too dry',
              data: [data.lowerHealthyLimit / 1024],
              backgroundColor: ['rgba(150,100,100,.5)']
            },
            {
              label: 'healthy',
              data: [(data.upperHealthyLimit - data.lowerHealthyLimit) / 1024],
              backgroundColor: ['rgba(100,255,100,.5)']
            },
            {
              label: 'too humid',
              data: [(1024 - data.upperHealthyLimit) / 1024],
              backgroundColor: ['rgba(100,100,255,.5)']
            }
            // {
            //   label: 'humidity',
            //   data: [chartData / 1024, chartData / 1024, chartData / 1024],
            //   type: 'line',
            //   borderColor: ['rgba(255,0,0,.5)'],
            //   borderWidth: 4
            // }
          ]
        },
        options: {
          responsive: true,
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
          }
        }
      })
    }
  }

  // console.log('humidity:', this.$props.humidity)
  // this.renderChart(this.chartData, this.options)
  //   (
  //   {
  //     datasets: [
  //       {
  //         label: 'too dry',
  //         data: [
  //           this.$props.humidity.lowerHealthyLimit /
  //             this.$props.humidity.upperLimit
  //         ],
  //         backgroundColor: ['rgba(150,100,100,.5)']
  //       },
  //       {
  //         label: 'healthy',
  //         data: [
  //           (this.$props.humidity.upperHealthyLimit -
  //             this.$props.humidity.lowerHealthyLimit) /
  //             this.$props.humidity.upperLimit
  //         ],
  //         backgroundColor: ['rgba(100,255,100,.5)']
  //       },
  //       {
  //         label: 'too humid',
  //         data: [
  //           (this.$props.humidity.upperLimit -
  //             this.$props.humidity.upperHealthyLimit) /
  //             this.$props.humidity.upperLimit
  //         ],
  //         backgroundColor: ['rgba(100,100,255,.5)']
  //       }
  //       // {
  //       //   label: 'humidity',
  //       //   data: [chartData / 1024, chartData / 1024, chartData / 1024],
  //       //   type: 'line',
  //       //   borderColor: ['rgba(255,0,0,.5)'],
  //       //   borderWidth: 4
  //       // }
  //     ]
  //   },
  //   {
  //     responsive: true,
  //     tooltips: {
  //       enabled: false
  //     },
  //     legend: {
  //       display: false
  //     },
  //     scales: {
  //       xAxes: [
  //         {
  //           stacked: true,
  //           display: false
  //         }
  //       ],
  //       yAxes: [
  //         {
  //           id: 'y-axis-0',
  //           stacked: true,
  //           ticks: {
  //             min: 0.0,
  //             max: 1.0
  //           },
  //           display: false
  //         }
  //       ]
  //     },
  //     plugins: {
  //       drawLine: {
  //         afterDraw () {}
  //       },
  //       annotation: {
  //         annotations: [
  //           {
  //             type: 'line',
  //             drawTime: 'afterDatasetDrawn',
  //             mode: 'horizontal',
  //             scaleID: 'y-axis-0',
  //             // value: chartData / 1024,
  //             value: 0.5,
  //             borderWidth: 2,
  //             borderColor: 'rgba(255,0,0,.5)',
  //             label: {
  //               content: 'current',
  //               position: 'center'
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   }
  //   )
}
</script>
