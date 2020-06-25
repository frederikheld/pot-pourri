<template>
  <v-container>
    <LoadingIndicator
      v-if="fetchingDevice"
      type="page"
    />
    <div v-if="!fetchingDevice">
      {{ device }}
    </div>
  </v-container>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'Device',
  components: { LoadingIndicator },
  data () {
    return {
      fetchingDevice: false,
      device: {}
    }
  },
  beforeMount () {
    this.fetchingDevice = true
    this.fetchDevice()
  },
  methods: {
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
