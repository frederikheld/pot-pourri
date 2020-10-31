<template>
  <SoilMoistureIndicatorCompact
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
import SoilMoistureIndicatorCompact from '@/components/SoilMoistureIndicatorCompact.vue'
export default {
  name: 'PlantStatusCompact',
  components: { SoilMoistureIndicatorCompact },
  props: {
    plant: {
      type: Object,
      required: true
    }
  }
}
</script>
