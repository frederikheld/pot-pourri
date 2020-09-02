<template>
  <v-form
    ref="form"
    @submit.prevent
  >
    <v-row>
      <v-col>
        <h4>Humidity</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="2">
        <v-range-slider
          ref="healthyHumidity"
          v-model="inForm.healthyHumidity"
          min="0"
          max="100"
          thumb-label
        />
      </v-col>
    </v-row>
    <v-col>
      <v-row>
        <v-spacer />
        <v-btn
          color="primary"
          type="submit"
          :disabled="!hasPendingEdits"
          :loading="savingPlantSettings"
          @click="onSubmit"
        >
          Save
        </v-btn>
      </v-row>
    </v-col>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

const InfluxConnector = require('../../methods/influxConnector')

export default {
  name: 'PlantSettings',
  props: {
    deviceCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fetchingPlantSettings: false,
      savingPlantSettings: false,
      inStore: {
        healthyHumidity: [undefined, undefined]
      },
      inForm: {
        healthyHumidity: [0, 100]
      }
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'influxdbConnectionData',
      'metastoreServerAddress'
    ]),
    hasPendingEdits () {
      const inForm = JSON.stringify(this.inForm)
      const inStore = JSON.stringify(this.inStore)

      return inForm !== inStore
    }
  },
  async beforeMount () {
    await this.fetchPlantSettings()

    this.initializeForm()
  },
  async mounted () {
    await this.placeCurrentValueIndicator()
  },
  methods: {
    initializeForm () {
      this.inForm = JSON.parse(JSON.stringify(this.inStore))
    },
    async fetchPlantSettings () {
      this.fetchingPlantSettings = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()

        this.inStore.healthyHumidity = [
          plant.measurands?.humidity?.healthyMin || 0,
          plant.measurands?.humidity?.healthyMax || 100
        ]
      } catch (err) {
        console.error(err)
      }

      this.fetchingPlantSettings = false
    },
    async onSubmit () {
      this.savingPlantSettings = true

      await this.updatePlantSettings(this.inForm)

      // update buffered store:

      // mode dependable, but slower option:
      // fetch settings from store to check
      // if they were saved correctly:
      // await this.fetchPlantSettings()

      // less dependable, but faster option:
      this.inStore = JSON.parse(JSON.stringify(this.inForm))

      this.savingPlantSettings = false
    },
    async updatePlantSettings (plantSettings) {
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          measurands: {
            humidity: {
              healthyMin: plantSettings.healthyHumidity[0],
              healthyMax: plantSettings.healthyHumidity[1]
            }
          }
        })
      }

      try {
        return fetch(url, options)
      } catch (err) {
        console.error(err)
      }
    },
    async placeCurrentValueIndicator () {
      const influxConnector = new InfluxConnector(this.influxdbConnectionData)
      const currentHumidityValue = await influxConnector.fetchCurrentSensorValuePercent(this.$props.deviceCode, 'humidity')

      const currentValueIndicator = document.createElement('div')

      const caret = document.createElement('div')
      caret.style.width = '0'
      caret.style.height = '0'
      caret.style.borderLeft = '8px solid transparent'
      caret.style.borderRight = '8px solid transparent'
      caret.style.borderTop = '8px solid #66f'
      caret.style.margin = '0'
      caret.style.padding = '0'
      caret.style.marginLeft = '-8px'

      const label = document.createElement('span')
      label.textContent = 'current'
      label.style.fontSize = '0.8rem'
      label.style.color = '#66f'
      label.style.fontWeight = 'bold'
      label.style.marginLeft = '-22px'

      currentValueIndicator.append(label)
      currentValueIndicator.append(caret)
      currentValueIndicator.style.marginLeft = Math.round(currentHumidityValue) + '%'
      currentValueIndicator.style.marginBottom = '36px'

      this.$refs.healthyHumidity.$el.children[0].children[0].children[0].appendChild(currentValueIndicator)
    }
  }
}
</script>
