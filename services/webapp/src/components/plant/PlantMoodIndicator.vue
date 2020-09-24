<template>
  <div
    v-if="fetchingPlantIsHappy"
  >
    <LoadingIndicator type="inline" />
  </div>
  <div
    v-else
  >
    <v-icon
      v-if="plantIsHappy === true"
      color="primary"
    >
      mdi-emoticon-excited-outline
    </v-icon>
    <v-icon
      v-else-if="plantIsHappy === false"
      color="error"
    >
      mdi-emoticon-sad-outline
    </v-icon>
    <v-icon
      v-else
    >
      mdi-help-circle-outline
    </v-icon>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

import InfluxConnector from '../../methods/influxConnector'

export default {
  name: 'PlantMoodIndicator',
  components: { LoadingIndicator },
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fetchingPlantIsHappy: false,
      plantIsHappy: undefined,
      influxConnector: undefined
    }
  },
  computed: {
    ...mapGetters('theme', [
      'iconMap'
    ]),
    ...mapGetters('appSettings', [
      'influxdbConnectionData'
    ])
  },
  beforeMount () {
    this.influxConnector = new InfluxConnector(this.influxdbConnectionData)

    this.fetchPlantIsHappy(this.$props.plant)
  },
  methods: {
    async fetchPlantIsHappy (plant) {
      this.fetchingPlantIsHappy = true

      // check if any sensor is configured:
      if (!plant.measurands || plant.measurands.length === 0) {
        this.plantIsHappy = undefined
        this.fetchingPlantIsHappy = false
        return
      }

      // check if at least one sensor is active:
      let noActiveSensors = true

      for (const sensorId in plant.measurands) {
        if (plant.measurands[sensorId].active) {
          noActiveSensors = false
          // IMPROVE: I could save away active sensors here so I don't need to iterate the full array again in the next loop.
          // As the number of sensors will be rather low, is okay like this for now.
        }
      }

      if (noActiveSensors) {
        this.plantIsHappy = undefined
        this.fetchingPlantIsHappy = false
        return
      }

      for (const sensorId in plant.measurands) {
        if (plant.measurands[sensorId].active) {
          const currentValue = await this.influxConnector.fetchCurrentSensorValuePercent(plant.deviceCode, sensorId, '6h')

          if (currentValue === undefined) {
            this.plantIsHappy = undefined
            this.fetchingPlantIsHappy = false
            return
          }

          const healthyMin = plant.measurands[sensorId].healthyMin || 0
          const healthyMax = plant.measurands[sensorId].healthyMax || 100

          if (
            currentValue < healthyMin ||
            currentValue > healthyMax
          ) {
            this.plantIsHappy = false
            this.fetchingPlantIsHappy = false
            return
          }
        }
      }

      this.plantIsHappy = true
      this.fetchingPlantIsHappy = false
    }
  }
}
</script>
