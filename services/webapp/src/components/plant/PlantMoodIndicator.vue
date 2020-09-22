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

      const currentHumidity = await this.influxConnector.fetchCurrentSensorValuePercent(plant.deviceCode, 'humidity', '6h')

      if (!currentHumidity) {
        this.plantIsHappy = undefined
      } else {
        const humidityHealthyMin = plant.measurands?.humidity?.healthyMin || 0
        const humidityHealthyMax = plant.measurands?.humidity?.healthyMax || 100

        if (
          humidityHealthyMin < currentHumidity &&
          humidityHealthyMax > currentHumidity
        ) {
          this.plantIsHappy = true
        } else {
          this.plantIsHappy = false
        }
      }

      this.fetchingPlantIsHappy = false
    }
  }
}
</script>
