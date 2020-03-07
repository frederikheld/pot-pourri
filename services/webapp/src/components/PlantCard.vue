<template>
  <div>
    <!-- <small>Device ID: {{ plant.deviceId }}</small> -->
    <!-- <h1>{{ plant.humidity.value }}</h1> -->
    <!-- <HumidityIndicator :humidity="plant.humidity" /> -->
    <ChartTest :chart-data="chartTestData" />
  </div>
</template>

<script>
// import HumidityIndicator from '@/components/HumidityIndicator.vue'
import ChartTest from '@/components/ChartTest.vue'

export default {
  name: 'PlantCard',
  components: {
    // HumidityIndicator,
    ChartTest
  },
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // console.log('PlantCard mounted')
    // console.log('this.plant:', this.plant)
  },
  methods: {}
}
</script>
