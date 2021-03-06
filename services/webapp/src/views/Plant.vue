<template>
  <div>
    <AppBar
      title="Plant"
      back="/plants"
    >
      <ContextMenuPlant
        :action-edit-profile="actionEditPlantProfile"
        :action-edit-sensor-settings="actionEditSensorSettings"
        :action-remove="actionRemovePlant"
        justify="right"
      />
    </AppBar>
    <v-container>
      <div v-if="!fetchingData">
        <v-dialog
          v-model="removeDialogIsOpen"
          width="24rem"
          max-width="60%"
        >
          <v-card>
            <v-card-title class="headline">
              Remove Plant {{ plant.name }}?
            </v-card-title>

            <v-card-text>
              This will also remove all configured sensors and actors as well as connected plants.
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn
                color="secondary"
                text
                @click="removeDialogIsOpen = false"
              >
                No
              </v-btn>

              <v-btn
                color="error"
                text
                :loading="removingPlant"
                @click="removePlantConfirmed()"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col>
            <ProfilePicture
              :src="plantPicture"
            >
              <v-row
                align="end"
                class="pl-3 pr-3 white--text fill-height"
              >
                <v-col style="background-color: rgba(0,0,0,0.5);">
                  <div class="subtitle-1">
                    {{ plant.name }}
                  </div>
                </v-col>
              </v-row>
            </ProfilePicture>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-tabs>
              <v-tab>Now</v-tab>
              <v-tab>History</v-tab>

              <v-tab-item>
                <v-row>
                  <v-col>
                    <PlantCurrentHealth
                      :plant="plant"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row>
                  <v-col>
                    <LoadingIndicator
                      v-if="fetchingData"
                    />
                    <PlantSoilMoistureHistory
                      v-else
                      :sensor-data="sensorData.soilMoisture"
                      :plant="plant"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </div>
      <LoadingIndicator
        v-if="fetchingData"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import ContextMenuPlant from '@/components/plant/ContextMenuPlant.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import PlantCurrentHealth from '@/components/plant/PlantCurrentHealth.vue'
import PlantSoilMoistureHistory from '@/components/plant/PlantSoilMoistureHistory.vue'
import ProfilePicture from '@/components/ProfilePicture.vue'

import { mapGetters } from 'vuex'

import MetastoreConnector from '../methods/metastoreConnector'
import InfluxConnector from '../methods/influxConnector'

export default {
  name: 'Plant',
  components: { AppBar, ContextMenuPlant, LoadingIndicator, PlantCurrentHealth, PlantSoilMoistureHistory, ProfilePicture },
  data () {
    return {
      fetchingData: false,
      plant: {},
      plantPicture: '',
      removingPlant: false,
      removeDialogIsOpen: false,
      sensorData: {
        soilMoisture: []
      },
      metastoreConnector: undefined,
      influxConnector: undefined
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'influxdbConnectionData',
      'metastoreServerAddress'
    ]),
    plantCurrentValues () {
      const currentSensorValues = {}

      if (this.sensorData.soilMoisture[0]) {
        currentSensorValues.soilMoisture = this.sensorData.soilMoisture[0].value
      }

      return currentSensorValues
    }
  },
  beforeMount () {
    this.metastoreConnector = new MetastoreConnector(this.metastoreServerAddress)
    this.influxConnector = new InfluxConnector(this.influxdbConnectionData)

    this.fetchData()
  },
  methods: {
    // reloadView () {
    //   this.$router.go()
    // },
    async fetchData () {
      this.fetchingData = true

      // first: fetch meta data
      this.plant = await this.metastoreConnector.fetchPlant(this.$route.params.id)

      // second: fetch plant profile picture
      this.plantPicture = await this.metastoreConnector.fetchPlantProfilePicture(this.$route.params.id)

      // third: fetch sensor data
      this.sensorData.soilMoisture = await this.influxConnector.fetchSensorHistoryPercent(this.plant.deviceCode, 'moisture', '24h')

      // IMPROVE: fetchSensorData needs data from fetchMetaData but fetchPlantProfile is independent from both. How can this be cascaded to be most efficient?

      // The following is the latest sensor value which could be passed to the PlantCurrentHealth component:
      // console.log(this.sensorData.soilMoisture[this.sensorData.soilMoisture.length - 1].value)

      this.fetchingData = false
    },
    actionEditPlantProfile () {
      this.$router.push('/plants/' + this.$route.params.id + '/edit-profile')
    },
    actionEditSensorSettings () {
      this.$router.push('/plants/' + this.$route.params.id + '/sensor-settings')
    },
    actionRemovePlant () {
      this.removeDialogIsOpen = true
    },
    async removePlantConfirmed () {
      this.removingPlant = true

      await this.metastoreConnector.deletePlant(this.$route.params.id)

      this.removingPlant = false
      this.removeDialogIsOpen = false
      this.$router.replace('/plants')
    }
  }
}
</script>
