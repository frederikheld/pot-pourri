<template>
  <canvas
    id="soil_moisture_indicator"
    ref="soil_moisture_indicator"
  />
</template>

<style lang="scss" scoped></style>

<script>
import Chart from 'chart.js'
import * as chartjsPluginAnnotation from 'chartjs-plugin-annotation'

export default {
  name: 'SoilMoistureIndicatorCompact',
  props: {
    moisture: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      chartMoisture: {}
    }
  },
  watch: {
    moisture: function (newData, oldData) {
      this.chartMoisture.annotation.elements['current-value'].options.value =
        newData.value
      this.chartMoisture.update()
    }
  },
  mounted () {
    this.createChart(this.$refs.soil_moisture_indicator, this.moisture)
  },
  methods: {
    createChart (ctx, data) {
      this.chartMoisture = new Chart(ctx, {
        type: 'horizontalBar',
        plugins: [chartjsPluginAnnotation],
        data: {
          datasets: [
            {
              data: [data.lowerHealthyLimit],
              backgroundColor: ['rgba(150,100,100,.5)']
            },
            {
              data: [data.upperHealthyLimit - data.lowerHealthyLimit],
              backgroundColor: ['rgba(100,255,100,.5)']
            },
            {
              data: [100 - data.upperHealthyLimit],
              backgroundColor: ['rgba(100,100,255,.5)']
            }
          ]
        },
        options: {
          animation: { duration: 0 },
          tooltips: { enabled: false },
          legend: { display: false },
          scales: {
            xAxes: [{ stacked: true, display: false, id: 'x-axis' }],
            yAxes: [
              { stacked: true, display: false, ticks: { min: 0, max: 100 } }
            ]
          },
          annotation: {
            annotations: [
              {
                id: 'current-value',
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis',
                value: data.value,
                borderWidth: 4,
                borderColor: 'rgba(255,50,50,1.0)'
              }
            ]
          }
        }
      })
    }
  }
}
</script>
