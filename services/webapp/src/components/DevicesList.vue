<template>
  <v-container
    class="pa-0"
  >
    <v-list-item-group
      v-if="devices.length > 0 && !fetchingDevices"
    >
      <v-list>
        <v-list-item
          v-for="device in devices"
          :key="device.id"
          :to="'/devices/' + device.id"
        >
          <v-list-item-content>
            <v-list-item-title>{{ device.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ device.id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list-item-group>

    <v-row
      v-if="devices.length <= 0 && !fetchingDevices"
      justify="center"
      class="mt-4"
    >
      <v-col
        class="text-center"
      >
        <p class="body-1">
          You don't have any devices configured yet.
        </p>
        <p class="body-2">
          Tap the + button to create one!
        </p>
      </v-col>
    </v-row>

    <LoadingIndicator
      v-if="fetchingDevices"
      type="page"
    />
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
