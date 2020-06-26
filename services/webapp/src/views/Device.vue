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
            <h2>Attached Sensors</h2>
            <DeviceSensorsList
              :device="device"
            />
            <h2>Attached Actors</h2>
            // tdo
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
      device: {}
    }
  },
  beforeMount () {
    this.fetchingDevice = true
    this.fetchDevice()
  },
  methods: {
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
        this.removingDevice = false

        this.$router.replace('/devices')
      } catch (err) {
        console.log(err)
      }
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
