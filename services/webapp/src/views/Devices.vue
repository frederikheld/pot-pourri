<template>
  <div>
    <AppBar
      title="Devices"
    >
      <v-btn
        icon
        to="/devices/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </AppBar>
    <v-container>
      <DevicesList
        v-if="!fetchingDevices"
        :devices="devices"
      />

      <LoadingIndicator
        v-if="fetchingDevices"
        type="page"
      />
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import DevicesList from '@/components/DevicesList.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'Devices',
  components: { AppBar, DevicesList, LoadingIndicator },
  data () {
    return {
      devices: [],
      fetchingDevices: true
    }
  },
  beforeMount () {
    this.fetchingDevices = true
    this.fetchDevices()
  },
  methods: {
    async fetchDevices  () {
      const url = 'http://localhost:3003/api/devices'

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
        console.log(err)
      }
    }
  }
}
</script>
