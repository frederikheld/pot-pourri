<template>
  <div>
    <AppBar
      title="Plants"
    >
      <LoadingIndicator
        v-if="fetchingData"
        type="inline"
        style="padding-right: 0.8rem"
      />
      <v-btn
        v-else
        icon
        @click="fetchData()"
      >
        <v-icon>mdi-reload</v-icon>
      </v-btn>

      <v-btn
        icon
        to="/plants/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </AppBar>

    <v-container
      id="container"
      class="pa-0"
    >
      <PlantsList
        v-if="!fetchingData"
        ref="plantsList"
        :plants="plantsMeta"
      />

      <LoadingIndicator
        v-if="fetchingData"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  animation:spin 0.6s linear infinite;
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import PlantsList from '@/components/PlantsList.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

import MetastoreConnector from '../methods/metastoreConnector'
import InfluxConnector from '../methods/influxConnector'

export default {
  name: 'Plants',
  components: { AppBar, PlantsList, LoadingIndicator },
  data () {
    return {
      plantsMeta: {},
      fetchingData: false
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'metastoreServerAddress',
      'influxdbConnectionData'
    ])
  },
  beforeMount () {
    // NOTE: beforeMount() cannot actually be async. So Vue won't
    //       wait for this function to finish before it proceeds
    //       to render the page. But this doesn't matter as
    //       this.fetchingData will make sure that the loading
    //       indicator is displayed until the data is available.

    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.fetchingData = true

      // first: fetch meta data for all plants
      const metastoreConnector = new MetastoreConnector(this.metastoreServerAddress)
      this.plantsMeta = await metastoreConnector.fetchPlants()

      // second: fetch happy state for all plants
      const promises = []
      for (const plant of this.plantsMeta) {
        promises.push(this.fetchPlantIsHappy(plant))
      }
      await Promise.all(promises)

      this.fetchingData = false
    },
    async fetchPlantIsHappy (plant) {
      const influxConnector = new InfluxConnector(this.influxdbConnectionData)

      const currentHumidity = await influxConnector.fetchCurrentSensorValuePercent(plant.deviceCode, 'humidity')

      const humidityHealthyMin = plant.measurands?.humidity?.healthyMin || 0
      const humidityHealthyMax = plant.measurands?.humidity?.healthyMax || 100

      const plantReference = this.plantsMeta.find(x => x.id === plant.id)

      if (
        humidityHealthyMin < currentHumidity &&
        humidityHealthyMax > currentHumidity
      ) {
        plantReference.isHappy = true
      } else {
        plantReference.isHappy = false
      }
    }
  }
}
</script>
