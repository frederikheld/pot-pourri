<template>
  <div>
    <small>Device ID: {{ plant.deviceId }}</small>
    <h1>{{ plant.humidity.value }}</h1>
    <HumidityIndicator :humidity="plant.humidity" />
  </div>
</template>

<script>
import HumidityIndicator from '@/components/HumidityIndicator.vue'

export default {
  name: 'PlantCard',
  components: { HumidityIndicator },
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // chartHumidityIndicator: undefined
    }
  },
  mounted () {
    console.log('PlantCard mounted')
    console.log('this.plant:', this.plant)

    // this.$nextTick(function () {
    //   this.createChart(this.$refs.humidity_indicator, this.plant.humidity)
    // })
  },
  methods: {
    // createChart (ctx, chartData) {
    //   const healthy = {
    //     upperLimit: 800,
    //     lowerLimit: 300
    //   }
    //   console.log(
    //     (1024 - healthy.upperLimit) / 1024 +
    //       '|' +
    //       (healthy.upperLimit - healthy.lowerLimit) / 1024 +
    //       '|' +
    //       healthy.lowerLimit / 1024
    //   )
    //   this.chartHumidityIndicator = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //       datasets: [
    //         {
    //           label: 'too dry',
    //           data: [healthy.lowerLimit / 1024],
    //           backgroundColor: ['rgba(150,100,100,.5)']
    //         },
    //         {
    //           label: 'healthy',
    //           data: [(healthy.upperLimit - healthy.lowerLimit) / 1024],
    //           backgroundColor: ['rgba(100,255,100,.5)']
    //         },
    //         {
    //           label: 'too humid',
    //           data: [(1024 - healthy.upperLimit) / 1024],
    //           backgroundColor: ['rgba(100,100,255,.5)']
    //         }
    //         // {
    //         //   label: 'humidity',
    //         //   data: [chartData / 1024, chartData / 1024, chartData / 1024],
    //         //   type: 'line',
    //         //   borderColor: ['rgba(255,0,0,.5)'],
    //         //   borderWidth: 4
    //         // }
    //       ]
    //     },
    //     options: {
    //       responsive: true,
    //       tooltips: {
    //         enabled: false
    //       },
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         xAxes: [{ stacked: true, display: false }],
    //         yAxes: [
    //           {
    //             id: 'y-axis-0',
    //             stacked: true,
    //             ticks: {
    //               min: 0.0,
    //               max: 1.0
    //             },
    //             display: false
    //           }
    //         ]
    //       },
    //       plugins: {
    //         drawLine: {
    //           afterDraw () {}
    //         },
    //         annotation: {
    //           annotations: [
    //             {
    //               type: 'line',
    //               drawTime: 'afterDatasetDrawn',
    //               mode: 'horizontal',
    //               scaleID: 'y-axis-0',
    //               // value: chartData / 1024,
    //               value: 0.5,
    //               borderWidth: 2,
    //               borderColor: 'rgba(255,0,0,.5)',
    //               label: {
    //                 content: 'current',
    //                 position: 'center'
    //               }
    //             }
    //           ]
    //         }
    //       }
    //     }
    //   })
    // }
  }
}
</script>
