<template>
  <v-container>
    <ul v-if="!fetchingDevices">
      <li
        v-for="(device, device_id) in devices"
        :key="device_id"
      >
        {{ device.name }}
      </li>
    </ul>
    <div v-if="fetchingDevices">
      <LoadingIndicator />
    </div>
  </v-container>
</template>

<style lang="scss" scoped>

</style>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'DevicesList',
  components: { LoadingIndicator },
  data () {
    return {
      fetchingDevices: true,
      devices: []
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
