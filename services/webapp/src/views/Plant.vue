<template>
  <div>
    <AppBar
      title="Plant"
      back="/plants"
    >
      <ContextMenuPlant
        :action-remove="actionRemovePlant"
        justify="right"
      />
      <!--
        add to ContextMenuPlant as soon as implemented:
        :action-edit="actionEditPlant"
      //-->
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
            <v-img
              src="https://images.pexels.com/photos/4505146/pexels-photo-4505146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              aspect-ratio="2"
              max-height="12rem"
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
            </v-img>
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

import { mapGetters } from 'vuex'

export default {
  name: 'Plant',
  components: { AppBar, ContextMenuPlant, LoadingIndicator },
  data () {
    return {
      fetchingPlant: false,
      removingPlant: false,
      removeDialogIsOpen: false,
      savingSettings: false,
      plant: {},
      tabs: null,
      form: {
        inputMeasuringInterval: null
      },
      formIsValid: false
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress'
    ])
  },
  async beforeMount () {
    this.fetchingPlant = true
    await this.fetchPlant()

    this.initializeForm()
  },
  methods: {
    validateForm () {
      this.formIsValid = this.validateInputMeasuringInterval()
    },
    validateInputMeasuringInterval (value) {
      if (value === '<plant default>') {
        return true
      }

      const [hours, minutes, seconds] = value.split(':')
      if (
        hours >= 0 &&
        minutes >= 0 && minutes < 60 &&
        seconds >= 0 && seconds < 60
      ) {
        return true
      }
      return false
    },
    initializeForm () {
      this.form.inputMeasuringInterval = this.plant.settings && this.plant.settings.measuringInterval ? new Date(this.plant.settings.measuringInterval * 1000).toISOString().substr(11, 8) : '<plant default>'
    },
    hmsToSeconds (hmsTimeString) {
      const [hours, minutes, seconds] = hmsTimeString.split(':')
      return (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds)
    },
    async actionSaveSettings () {
      this.savingSettings = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id + '/settings'

      const postBody = {
        name: this.name
      }
      if (this.form.inputMeasuringInterval !== '<plant default>') {
        postBody.measuringInterval = this.hmsToSeconds(this.form.inputMeasuringInterval)
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      }

      try {
        await fetch(url, options)
      } catch (err) {
        console.log(err)
      }

      this.savingSettings = false
    },
    actionEditPlant () {
      console.log('Edit plant')
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
        console.log(err)
      }

      this.removingPlant = false
    },
    async fetchPlant () {
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()
        this.fetchingPlant = false
        this.plant = plant
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
