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
              <v-tab>Health</v-tab>
              <v-tab>History</v-tab>
              <v-tab>Linked Devices</v-tab>

              <v-tab-item>
                <v-row>
                  <v-col>
                    <p>// todo: display current health of this plant</p>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col>
                    <p>// todo: display historic diagrams</p>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col>
                    <DevicesList
                      :devices="devices"
                      :action-unlink-device="actionUnlinkDevice"
                      :no-devices-info="'You haven\'t linked any devices to this plant yet.'"
                    />
                    <LinkDeviceDialog
                      class="mx-auto"
                      :plant-id="plant.id"
                      @saveLinkedDevicesDone="reloadView()"
                    />
                  </v-col>
                </v-row>
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
import DevicesList from '@/components/DevicesList.vue'
import LinkDeviceDialog from '@/components/LinkDeviceDialog.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ProfilePicture from '@/components/ProfilePicture.vue'

import { mapGetters } from 'vuex'

// const querystring = require('querystring')

export default {
  name: 'Plant',
  components: { AppBar, ContextMenuPlant, DevicesList, LinkDeviceDialog, LoadingIndicator, ProfilePicture },
  data () {
    return {
      fetchingPlant: false,
      removeDialogIsOpen: false,
      removingPlant: false,
      plant: {},
      plantPicture: ''
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress',
      'iconsMap'
    ])
  },
  async beforeMount () {
    await this.fetchPlantProfile()
  },
  methods: {
    reloadView () {
      this.$router.go()
    },
    async actionUnlinkDevice (deviceId) {
      this.fetchingPlant = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id + '/linked-devices'

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([deviceId])
      }

      try {
        await fetch(url, options)

        this.$router.replace('/plants/' + this.$route.params.id)
      } catch (err) {
        console.error(err)
      }

      this.reloadView()

      this.fetchingPlant = false
    },
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
    async fetchPlantProfile () {
      this.fetchingPlant = true

      // fetch plant meta:
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()
        this.plant = plant
      } catch (err) {
        console.error(err)
      }

      // fetch profile picture:
      const url2 = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id + '/profile-picture'

      const options2 = {
        method: 'GET',
        headers: {
          Accept: 'image/png, image/jpg, image/jpeg'
        }
      }

      try {
        const res2 = await fetch(url2, options2)
        const plantPictureRaw = await res2.blob()
        this.plantPictureRaw = plantPictureRaw
        this.plantPicture = URL.createObjectURL(plantPictureRaw)
      } catch (err) {
        console.error(err)
      }

      // fetch linked devices:
      this.devices = await this.fetchLinkedDevices(this.plant.linkedDevices)

      this.fetchingPlant = false
    },
    async fetchLinkedDevices (list) {
      // this.fetchingDevices = true

      const baseUrl = this.metastoreServerAddress + '/api/devices/'

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      const devices = []

      for (let i = 0; i < list.length; i++) {
        try {
          const res = await fetch(baseUrl + list[i], options)
          devices.push(await res.json())
        } catch (err) {
          console.error(err)
        }
      }

      // this.fetchingDevices = false

      return devices
    }
  }
}
</script>
