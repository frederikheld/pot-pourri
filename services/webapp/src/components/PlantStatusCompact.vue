<template>
  <SoilMoistureIndicatorCompact
    id="soil_moisture_indicator"
    :moisture="plant.moisture"
  />
</template>

<style lang="scss" scoped>
#soil_moisture_indicator {
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
