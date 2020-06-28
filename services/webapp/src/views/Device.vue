<template>
  <div>
    <AppBar
      title="Device"
      back="/devices"
    >
      <ContextMenuDevice
        :action-edit="actionEditDevice"
        :action-remove="actionRemoveDevice"
        justify="right"
      />
    </AppBar>
    <v-container>
      <div v-if="!fetchingDevice">
        <v-dialog
          v-model="removeDialogIsOpen"
          width="24rem"
          max-width="60%"
        >
          <v-card>
            <v-card-title class="headline">
              Remove Device {{ device.name }}?
            </v-card-title>

            <v-card-text>
              This will also remove all configured sensors and actors as well as connected plants.
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn
                color="secondary darken-1"
                text
                @click="removeDialogIsOpen = false"
              >
                No
              </v-btn>

              <v-btn
                color="primary darken-1"
                text
                :loading="removingDevice"
                @click="removeDeviceConfirmed()"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col>
            <v-img
              src="https://images.pexels.com/photos/159220/printed-circuit-board-print-plate-via-macro-159220.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              aspect-ratio="2"
              max-height="12rem"
            >
              <!-- Dummy picture for plants
              src="https://images.pexels.com/photos/4505146/pexels-photo-4505146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" -->

              <v-row
                align="end"
                class="pl-3 pr-3 white--text fill-height"
              >
                <v-col style="background-color: rgba(0,0,0,0.5);">
                  <div class="subtitle-1">
                    Foo
                  </div>
                </v-col>
              </v-row>
            </v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-tabs>
              <v-tab>Sensors</v-tab>
              <v-tab>Actors</v-tab>
              <v-tab>Settings</v-tab>

              <v-tab-item>
                <DeviceSensorsList
                  :device="device"
                />
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col>
                    // todo
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-form
                  v-model="formIsValid"
                >
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="form.inputMeasuringInterval"
                        label="Measuring interval (HH:MM:SS)"
                        append-icon="mdi-close"
                        :rules="[v => validateInputMeasuringInterval(v) || 'Time format HH:MM:SS required!']"
                        @click:append="form.inputMeasuringInterval = '<device default>'"
                      >
                        />
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-right">
                      <v-btn

                        right
                        color="primary"
                        :loading="savingSettings"
                        :disabled="!formIsValid"
                        @click="actionSaveSettings()"
                      >
                        Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </div>
      <LoadingIndicator
        v-if="fetchingDevice"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import AppBar from '@/components/AppBar.vue'
import ContextMenuDevice from '@/components/ContextMenuDevice.vue'
import DeviceSensorsList from '@/components/DeviceSensorsList.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'Device',
  components: { AppBar, DeviceSensorsList, ContextMenuDevice, LoadingIndicator },
  data () {
    return {
      fetchingDevice: false,
      removingDevice: false,
      removeDialogIsOpen: false,
      savingSettings: false,
      device: {},
      tabs: null,
      form: {
        inputMeasuringInterval: null
      },
      formIsValid: false
    }
  },
  async beforeMount () {
    this.fetchingDevice = true
    await this.fetchDevice()

    this.initializeForm()
  },
  methods: {
    validateForm () {
      this.formIsValid = this.validateInputMeasuringInterval()
    },
    validateInputMeasuringInterval (value) {
      if (value === '<device default>') {
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
      this.form.inputMeasuringInterval = this.device.settings && this.device.settings.measuringInterval ? new Date(this.device.settings.measuringInterval * 1000).toISOString().substr(11, 8) : '<device default>'
    },
    hmsToSeconds (hmsTimeString) {
      const [hours, minutes, seconds] = hmsTimeString.split(':')
      return (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds)
    },
    async actionSaveSettings () {
      this.savingSettings = true

      const url = 'http://localhost:3003/api/devices/' + this.$route.params.id + '/settings'

      const postBody = {
        name: this.name
      }
      if (this.form.inputMeasuringInterval !== '<device default>') {
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
    actionEditDevice () {
      console.log('Edit device')
    },
    actionRemoveDevice () {
      this.removeDialogIsOpen = true
    },
    async removeDeviceConfirmed () {
      this.removingDevice = true

      const url = 'http://localhost:3003/api/devices/' + this.$route.params.id

      const options = {
        method: 'DELETE',
        accept: 'application/json'
      }

      try {
        await fetch(url, options)

        this.removeDialogIsOpen = false

        this.$router.replace('/devices')
      } catch (err) {
        console.log(err)
      }

      this.removingDevice = false
    },
    async fetchDevice () {
      const url = 'http://localhost:3003/api/devices/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const device = await res.json()
        this.fetchingDevice = false
        this.device = device
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
