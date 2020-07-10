<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogIsOpen"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="float-right"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          primary-title
        >
          Link Device
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="selectedDevice"
            :items="devices"
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
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LinkDeviceDialog',
  props: {
    plantId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      devices: undefined,
      dialogIsOpen: false,
      selectedDevice: undefined,
      fetchingDevices: false,
      savingLinkedDevices: false
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress'
    ])
  },
  watch: {
    dialogIsOpen: function (value) {
      this.fetchDevices()
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
    async fetchDevices  () {
      this.fetchingDevices = true

      const url = this.metastoreServerAddress + '/api/devices'

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const devices = await res.json()
        this.fetchingDevices = false
        this.devices = devices
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
