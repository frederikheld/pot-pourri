<template>
  <div>
    <LoadingIndicator
      v-if="preparingForm"
      type="box"
    />
    <v-form
      v-else
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
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

// import MetastoreConnector from '../../methods/metastoreConnector'

export default {
  name: 'PlantSettings',
  components: { LoadingIndicator },
  props: {
    plant: {
      type: Object,
      required: true
    },
    currentValues: {
      type: Object,
      required: true
    },
    afterSaveAction: {
      type: Function,
      required: false,
      default: undefined
    }
  },
  data () {
    return {
      preparingForm: false,
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
      'metastoreServerAddress'
    ]),
    hasPendingEdits () {
      const inForm = JSON.stringify(this.inForm)
      const inStore = JSON.stringify(this.inStore)

      return inForm !== inStore
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.preparingForm = true

      this.initializeStore()

      this.initializeForm()

      this.placeCurrentValueIndicator()

      this.preparingForm = false
    },
    initializeStore () {
      this.inStore.healthyHumidity = [
        this.$props.plant.measurands?.humidity?.healthyMin || 0,
        this.$props.plant.measurands?.humidity?.healthyMax || 100
      ]
    },
    initializeForm () {
      this.inForm = JSON.parse(JSON.stringify(this.inStore))
    },
    placeCurrentValueIndicator () {
      const currentHumidityValue = this.$props.currentValues.humidity

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
    },
    async onSubmit () {
      this.savingPlantSettings = true

      await this.savePlantSettings(this.inForm)

      // update buffered store:
      // a) more dependable, but slower option:
      // fetch settings from store to check
      // if they were saved correctly:
      // await this.fetchPlantSettings()

      // b) less dependable, but faster option:
      this.inStore = JSON.parse(JSON.stringify(this.inForm))

      // run afterSaveAction, if defined:
      if (this.$props.afterSaveAction) {
        this.$props.afterSaveAction()
      }

      this.savingPlantSettings = false
    },
    async savePlantSettings (plantSettings) {
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
    }
  }
}
</script>
