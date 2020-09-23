<template>
  <div>
    <AppBar
      title="Sensor Settings"
      :back="'/plants/' + $route.params.id"
    />

    <LoadingIndicator
      v-if="fetchingData"
      type="page"
    />

    <v-container v-if="!fetchingData">
      <v-form
        @submit.prevent
      >
        <v-row>
          <v-col>
            Plant name and picture here to remind the user which plant they're setting up.
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="text-h6">Device</span>
            <p>// tbd: measuring interval settings here</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="text-h6">Sensors</span>
            <div
              v-for="sensor in availableSensors"
              :key="sensor.id"
              class="card-container"
            >
              <div class="switch-on-card">
                <v-col cols="2">
                  <v-switch
                    v-model="activeSensorsFormToggles[sensor.id]"
                    class="float-right my-0"
                    dense
                    active
                  />
                </v-col>
              </div>

              <v-card
                class="card my-4"
                :disabled="!sensorIsActive(sensor.id)"
              >
                <v-list-item-content
                  class="py-0"
                >
                  <v-container>
                    <v-row dense>
                      <v-col cols="auto">
                        <v-icon>
                          {{ iconMap[sensor.id] }}
                        </v-icon>
                      </v-col>
                      <v-col>
                        <p class="text--primary my-0 mb-1">
                          {{ sensor.name }}
                        </p>
                        <p class="text--secondary my-0">
                          {{ sensor.description }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item-content>

                <v-list-item-content
                  v-if="sensorIsActive(sensor.id)"
                  class="py-0"
                >
                  <v-container
                    class="py-0"
                  >
                    <v-divider />
                    <v-row>
                      <v-col>
                        <p class="mt-4">
                          Healthy Range:
                        </p>
                        <v-range-slider
                          ref="healthyHumidity"
                          v-model="inForm.healthyHumidity"
                          min="0"
                          max="100"
                        >
                          <template v-slot:prepend>
                            <v-text-field
                              :value="inForm.healthyHumidity[0]"
                              class="mt-0 pt-0 form-input-right-aligned"
                              hide-details
                              single-line
                              type="number"
                              style="width: 3rem;"
                              @change="$set(inForm.healthyHumidity, 0, $event)"
                            />
                          </template>
                          <template v-slot:append>
                            <v-text-field
                              :value="inForm.healthyHumidity[1]"
                              class="mt-0 pt-0 form-input-right-aligned"
                              hide-details
                              single-line
                              type="number"
                              style="width: 3rem"
                              @change="$set(inForm.healthyHumidity, 1, $event)"
                            />
                          </template>
                        </v-range-slider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item-content>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <p>activeSensorsFormToggles:</p>
            <p>{{ activeSensorsFormToggles }}</p>
            <p>activeSensors:</p>
            <p>{{ activeSensors }}</p>
            <p>sensorIsActive('light'):</p>
            <p>{{ sensorIsActive('light') }}</p>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col align="right">
            <v-btn
              color="primary"
              type="submit"
              :disabled="!hasPendingEdits"
              :loading="savingSensorSettings"
              @click="onSubmit"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.form-input-right-aligned::v-deep input {
  text-align: right;
}

// .card-container {

// }

// .card {

// }

.switch-on-card {
  position: relative;
  top: 0;
  width: 4rem;
  float: right;
  z-index: 1;
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

import MetastoreConnector from '../methods/metastoreConnector'

export default {
  name: 'EditPlantProfile',
  components: { AppBar, LoadingIndicator },
  data () {
    return {
      fetchingData: false,
      savingSensorSettings: false,
      availableSensors: [],
      activeSensorsFormToggles: {},
      inForm: {
        healthyHumidity: [0, 100]
      },
      inStore: {
        healthyHumidity: [undefined, undefined]
      },
      errorMessages: {
        name: []
      },
      metastoreConnector: undefined
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'metastoreServerAddress'
    ]),
    ...mapGetters('theme', [
      'iconMap'
    ]),
    activeSensors () {
      const activeSensors = []

      for (const [id, active] of Object.entries(this.activeSensorsFormToggles)) {
        if (active) {
          activeSensors.push(this.availableSensors.filter(x => x.id === id)[0])
        }
      }

      return activeSensors
    },
    hasPendingEdits () {
      const inForm = JSON.stringify(this.form)
      const inStore = JSON.stringify(this.plant)

      return inForm !== inStore
    }
  },
  beforeMount () {
    this.metastoreConnector = new MetastoreConnector(this.metastoreServerAddress)

    this.availableSensors = [
      {
        id: 'humidity',
        name: 'Humidity',
        description: 'Humidity of the plant\'s soil'
      },
      {
        id: 'temperature',
        name: 'Temperature',
        description: 'Air temperature around the plant'
      },
      {
        id: 'light',
        name: 'Light',
        description: 'Amount of light the plant is exposed to'
      }
    ]

    // this.fetchData()
  },
  mounted () {
    this.prepareForm()
  },
  methods: {
    prepareForm () {
      this.initializeStore()

      this.initializeForm()
    },
    initializeStore () {
      this.inStore.healthyHumidity = [0, 100]
    },
    initializeForm () {
      this.inForm = JSON.parse(JSON.stringify(this.inStore)) // this is needed to copy the actual content, not just the pointer!
    },
    sensorIsActive (sensorId) {
      // DEBUG:
      if (sensorId === 'humidity') {
        return true
      }

      if (this.activeSensors.find(x => x.id === sensorId)) {
        return true
      }

      return false
    },
    async fetchData () {
      this.fetchingData = true

      this.plant = await this.metastoreConnector.fetchPlant(this.$route.params.id)

      this.initializeForm()

      this.fetchingData = false
    },
    async onSubmit () {
      this.savingPlant = true

      await this.metastoreConnector.patchPlant(this.$route.params.id, {
        // name: this.form.name,
        // deviceCode: this.form.deviceCode
      })

      this.savingPlant = false
      this.$router.replace('/plants/' + this.$route.params.id)
    },
    onCancel () {
      this.$router.replace('/plants/' + this.$route.params.id)
    }
  }
}
</script>
