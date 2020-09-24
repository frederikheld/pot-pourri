<template>
  <div>
    <AppBar
      title="Sensor Settings"
      :back="'/plants/' + $route.params.id"
    />

    <LoadingIndicator
      v-if="preparingForm"
      type="page"
    />

    <v-container v-if="!preparingForm">
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
            >
              <div class="switch-on-top-of-card">
                <v-col cols="2">
                  <v-switch
                    v-model="inForm.activeSensors[sensor.id]"
                    class="float-right my-0"
                    dense
                    active
                  />
                </v-col>
              </div>

              <v-card
                class="my-4"
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
                          Healthy limits:
                        </p>
                        <v-range-slider
                          ref="healthyHumidity"
                          v-model="inForm.sensors[sensor.id].healthyRange"
                          min="0"
                          max="100"
                        >
                          <template v-slot:prepend>
                            <v-text-field
                              :value="inForm.sensors[sensor.id].healthyRange[0]"
                              class="mt-0 pt-0 form-input-right-aligned"
                              hide-details
                              single-line
                              type="number"
                              style="width: 3rem;"
                              @change="$set(inForm.sensors[sensor.id].healthyRange, 0, $event)"
                            />
                          </template>
                          <template v-slot:append>
                            <v-text-field
                              :value="inForm.sensors[sensor.id].healthyRange[1]"
                              class="mt-0 pt-0 form-input-right-aligned"
                              hide-details
                              single-line
                              type="number"
                              style="width: 3rem"
                              @change="$set(inForm.sensors[sensor.id].healthyRange, 1, $event)"
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
        <!-- <v-row>
          <v-col>
            <p>inForm.activeSensors:</p>
            <p>{{ inForm.activeSensors }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p>inLocalState:</p>
            <pre>{{ inLocalState }}</pre>
          </v-col>
          <v-col cols="6">
            <p>inForm:</p>
            <pre>{{ inForm }}</pre>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>inLocalState stringified</p>
            <pre>{{ JSON.stringify(inLocalState) }}</pre>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>inForm stringified</p>
            <pre>{{ JSON.stringify(inForm) }}</pre>
          </v-col>
        </v-row> -->
      </v-form>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.form-input-right-aligned::v-deep input {
  text-align: right;
}

.switch-on-top-of-card {
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
      preparingForm: false,
      savingSensorSettings: false,
      availableSensors: [],
      plant: {},
      inForm: {
        activeSensors: {},
        sensors: {}
      },
      inLocalState: {
        activeSensors: {},
        sensors: {}
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
    hasPendingEdits () {
      const inForm = JSON.stringify(this.inForm)
      const inLocalState = JSON.stringify(this.inLocalState)

      return inForm !== inLocalState
    }
  },
  beforeMount () {
    this.metastoreConnector = new MetastoreConnector(this.metastoreServerAddress)

    // IMPROVE: this should come from an device config template
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

    this.prepareForm()
  },
  methods: {
    async prepareForm () {
      this.preparingForm = true

      await this.fetchData()

      this.initializeLocalState()
      console.log('freshly initialized local state', this.inLocalState)

      this.initializeForm()

      this.preparingForm = false
    },
    initializeLocalState () {
      this.inLocalState = this.convertFromMetastore(this.plant)
    },
    initializeForm () {
      this.inForm = JSON.parse(JSON.stringify(this.inLocalState))
    },
    convertToMetastore (formObject) {
      /**
       * Adaptor between data structure in form and data structure in metastore.
       * Used to initialize the form after fetching the data from the metastore.
       */

      // init object:
      const plantObject = {
        measurands: {}
      }

      // populate with real data from form:
      for (const sensor of this.availableSensors) {
        plantObject.measurands[sensor.id] = {
          healthyMin: formObject.sensors[sensor.id].healthyRange[0],
          healthyMax: formObject.sensors[sensor.id].healthyRange[1]
        }

        if (formObject.activeSensors[sensor.id] === true) {
          plantObject.measurands[sensor.id].active = true
        } else {
          plantObject.measurands[sensor.id].active = false
        }
      }

      return plantObject
    },
    convertFromMetastore (plantObject) {
      /**
       * Adaptor between data structure in metastore and data structure in form.
       * Used to initialize the form after fetching the data from the metastore.
       */

      // init object:
      const formObject = {
        activeSensors: {},
        sensors: {}
      }

      // init default values:
      for (const measurand of this.availableSensors) {
        formObject.sensors[measurand.id] = {}
        formObject.sensors[measurand.id].healthyRange = [0, 100]
      }

      // populate with real data from metastore:
      if (plantObject.measurands) {
        for (const measurandId in plantObject.measurands) {
          formObject.activeSensors[measurandId] = plantObject.measurands[measurandId].active

          formObject.sensors[measurandId].healthyRange = [
            plantObject.measurands[measurandId].healthyMin,
            plantObject.measurands[measurandId].healthyMax
          ]
        }
      }

      return formObject
    },
    sensorIsActive (sensorId) {
      // // DEBUG:
      // if (sensorId === 'humidity') {
      //   return true
      // }

      if (
        this.inForm.activeSensors[sensorId] &&
        this.inForm.activeSensors[sensorId] === true
      ) {
        return true
      }

      return false
    },
    async fetchData () {
      this.plant = await this.metastoreConnector.fetchPlant(this.$route.params.id)
    },
    async onSubmit () {
      this.savingPlant = true

      const plantSettingsObject = this.convertToMetastore(this.inForm)

      console.log('saving:', plantSettingsObject)

      await this.metastoreConnector.patchPlant(this.$route.params.id, plantSettingsObject)

      this.inLocalState = JSON.parse(JSON.stringify(this.inForm))

      this.savingPlant = false
      // this.$router.replace('/plants/' + this.$route.params.id)
    },
    onCancel () {
      this.$router.replace('/plants/' + this.$route.params.id)
    }
  }
}
</script>
