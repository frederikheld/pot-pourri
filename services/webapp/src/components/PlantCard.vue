<template>
  <div>
    <small>Device ID: {{ plant.deviceId }}</small>
    <h1>{{ plant.humidity }}</h1>
  </div>
</template>

<script>
export default {
  name: 'PlantCard',
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log('PlantCard mounted')
    console.log(this.plant)
  }
}
</script>
