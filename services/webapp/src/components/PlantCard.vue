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
  components: {
    HumidityIndicator
  },
  props: {
    plant: {
      type: Object,
      required: true
    }
  }
}
</script>
