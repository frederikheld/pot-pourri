<template>
  <div>
    <AppBar
      title="Plant"
      back="/plants"
    >
      <ContextMenuPlant
        :action-remove="actionRemovePlant"
        :action-edit="actionEditPlant"
        justify="right"
      />
    </AppBar>
    <v-container>
      <div v-if="!fetchingPlant">
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
              <v-tab>Settings</v-tab>
              <!-- <v-tab>Linked Devices</v-tab> -->

              <v-tab-item>
                <v-row>
                  <v-col>
                    <PlantCurrentHealth :device-code="plant.deviceCode" />
                  </v-col>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row>
                  <v-col>
                    <LoadingIndicator v-if="fetchingSensorData" />
                    <PlantHumidityHistory
                      v-else
                      :sensor-data="sensorData"
                      :plant="plant"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <PlantSettings :device-code="plant.deviceCode" />
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </div>
      <LoadingIndicator
        v-if="fetchingPlant"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import ContextMenuPlant from '@/components/ContextMenuPlant.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import PlantCurrentHealth from '@/components/plant/PlantCurrentHealth.vue'
import PlantHumidityHistory from '@/components/plant/PlantHumidityHistory.vue'
import PlantSettings from '@/components/plant/PlantSettings.vue'
import ProfilePicture from '@/components/ProfilePicture.vue'

import { mapGetters } from 'vuex'

const InfluxConnector = require('../methods/influxConnector')

export default {
  name: 'Plant',
  components: {
    AppBar,
    ContextMenuPlant,
    LoadingIndicator,
    PlantCurrentHealth,
    PlantHumidityHistory,
    PlantSettings,
    ProfilePicture
  },
  data () {
    return {
      fetchingPlant: false,
      plantPicture: '',
      removingPlant: false,
      removeDialogIsOpen: false,
      fetchingSensorData: false,
      sensorData: []
    }
  },
  computed: {
    ...mapGetters('featureToggles', [
      'featureToggles'
    ]),
    ...mapGetters('theme', [
      'iconMap'
    ]),
    ...mapGetters('appSettings', [
      'influxdbConnectionData',
      'metastoreServerAddress'
    ]),
    plant () {
      return this.$store.getters['metadata/plantById'](this.$route.params.id)
    }
  },
  async beforeMount () {
    await this.fetchSensorData()
  },
  methods: {
    // reloadView () {
    //   this.$router.go()
    // },
    actionEditPlant () {
      this.$router.push('/plants/' + this.$route.params.id + '/edit')
    },
    actionRemovePlant () {
      this.removeDialogIsOpen = true
    },
    async removePlantConfirmed () {
      this.removingPlant = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'DELETE',
        accept: 'application/json'
      }

      try {
        await fetch(url, options)

        this.removeDialogIsOpen = false

        this.$router.replace('/plants')
      } catch (err) {
        console.error(err)
      }

      this.removingPlant = false
    },
    async fetchSensorData () {
      this.fetchingSensorData = true

      const influxConnector = new InfluxConnector(this.influxdbConnectionData)

      this.sensorData = await influxConnector.fetchSensorHistoryPercent(this.plant.deviceCode, 'humidity', '24h')

      this.fetchingSensorData = false
    }
  }
}
</script>
