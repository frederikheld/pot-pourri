<template>
  <HumidityIndicatorCompact
    id="humidity_indicator"
    :humidity="plant.humidity"
  />
</template>

<style lang="scss" scoped>
#humidity_indicator {
  margin-right: 1rem;
  float: right;
  height: 30px !important;
  width: 200px !important;
}
</style>

<script>
import HumidityIndicatorCompact from '@/components/HumidityIndicatorCompact.vue'
export default {
  name: 'PlantStatusCompact',
  components: { HumidityIndicatorCompact },
  props: {
    plant: {
      type: Object,
      required: true
    }
  }
}
</script>
