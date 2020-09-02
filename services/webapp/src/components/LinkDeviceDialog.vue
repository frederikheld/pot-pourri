<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogIsOpen"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="primary"
          v-bind="attrs"
          v-on="on"
        >
          link device
        </v-btn>
      </template>

      <v-card v-if="!fetchingAvailableDevices">
        <v-card-title
          primary-title
        >
          Link Device
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="selectedDevice"
            :items="availableDevices"
            item-text="name"
            item-value="id"
            hint="select device from list"
            persistent-hint
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            text
            @click="dialogIsOpen = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :loading="savingLinkedDevices"
            @click="saveLinkedDevices()"
          >
            Select
          </v-btn>
        </v-card-actions>
      </v-card>
      <LoadingIndicator
        v-if="fetchingAvailableDevices"
        type="page"
      />
    </v-dialog>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'LinkDeviceDialog',
  components: { LoadingIndicator },
  props: {
    plantId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      availableDevices: undefined,
      dialogIsOpen: false,
      selectedDevice: undefined,
      linkedDevicesIds: undefined,
      fetchingAvailableDevices: false,
      savingLinkedDevices: false
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'metastoreServerAddress'
    ])
  },
  watch: {
    dialogIsOpen: function (value) {
      this.fetchAvailableDevices()
    }
  },
  methods: {
    async saveLinkedDevices () {
      this.savingLinkedDevices = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$props.plantId + '/linked-devices'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([this.selectedDevice])
      }

      try {
        await fetch(url, options)
        this.savingLinkedDevices = false
        this.dialogIsOpen = false
        this.$emit('saveLinkedDevicesDone')
      } catch (err) {
        console.error(err)
      }
    },
    async fetchAvailableDevices  () {
      this.fetchingAvailableDevices = true

      const uri = this.metastoreServerAddress + '/api/devices'

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      // fetch all devices:
      try {
        const res = await fetch(uri, options)
        const allDevices = await res.json()

        // filter result:
        const availableDevices = allDevices.filter((item) => {
          if (!item.linkedPlant) {
            return item
          }
        })

        this.availableDevices = availableDevices
        this.fetchingAvailableDevices = false
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
