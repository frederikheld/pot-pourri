<template>
  <div>
    <AppBar
      title="Sensor Settings"
      :back="'/plants/' + $route.params.id"
    />

    <v-container>
      <v-container v-if="!fetchingData">
        <v-form
          @submit.prevent
        >
          <v-row>
            Plant name and picture here to remind the user which plant they're setting up.
          </v-row>
          <v-row>
            <v-tabs>
              <v-tab>General</v-tab>
              <v-tab
                v-for="sensor in activeSensors"
                :key="sensor.id"
              >
                <v-icon>{{ iconMap[sensor.id] }}</v-icon>
              </v-tab>

              <v-tab-item>
                <v-row>
                  <v-col>
                    <span class="text-h6">Measuring Interval</span>
                    <v-row>
                      <v-col>// tbd: input here</v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-h6">
                      Active Sensors
                    </span>
                    <v-row
                      v-for="sensor in availableSensors"
                      :key="sensor.id"
                      align="center"
                      dense
                    >
                      <v-col cols="1">
                        <v-icon>{{ iconMap[sensor.id] }}</v-icon>
                      </v-col>
                      <v-col>
                        <p class="text--primary my-0">
                          {{ sensor.name }}
                        </p>
                        <p class="text--secondary my-0">
                          {{ sensor.description }}
                        </p>
                      </v-col>
                      <v-col cols="2">
                        <v-switch
                          v-model="activeSensorsFormToggles[sensor.id]"
                          class="float-right"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-tab-item>

              <v-tab-item
                v-for="sensor in activeSensors"
                :key="sensor.id"
              >
                <v-row>
                  <v-col>
                    {{ sensor }}
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-row>
          <!-- <v-row>
            <v-col>
              <p>DEBUG:</p>
              <p>activeSensorsFormToggles:</p>
              <p>{{ activeSensorsFormToggles }}</p>
              <p>activeSensors:</p>
              <p>{{ activeSensors }}</p>
            </v-col>
          </v-row> -->
          <v-row>
            <v-spacer />
            <v-btn
              color="primary"
              type="submit"
              :disabled="!hasPendingEdits"
              :loading="savingSensorSettings"
              @click="onSubmit"
            >
              Save
            </v-btn>
          </v-row>
        </v-form>
      </v-container>
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
      form: {
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
    // this.activeSensors.push(
    //   {
    //     id: 'humidity',
    //     name: 'Humidity',
    //     icon: 'humidity'
    //   },
    //   {
    //     id: 'temperature',
    //     name: 'Temperature',
    //     icon: 'temperature'
    //   },
    //   {
    //     id: 'temperature2',
    //     name: 'Temperature',
    //     icon: 'temperature'
    //   },
    //   {
    //     id: 'temperature3',
    //     name: 'Temperature',
    //     icon: 'temperature'
    //   },
    //   {
    //     id: 'temperature4',
    //     name: 'Temperature',
    //     icon: 'temperature'
    //   }
    // )
  },
  methods: {
    async fetchData () {
      this.fetchingData = true

      this.plant = await this.metastoreConnector.fetchPlant(this.$route.params.id)

      this.initializeForm()

      this.fetchingData = false
    },
    initializeForm () {
      this.form = JSON.parse(JSON.stringify(this.plant)) // this is needed to copy the actual content, not just the pointer!
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
