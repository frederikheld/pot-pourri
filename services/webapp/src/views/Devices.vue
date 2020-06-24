<template>
  <v-container>
    <h1>Devices</h1>
    <DevicesList />
  </v-container>
</template>

<script>
import DevicesList from '@/components/DevicesList.vue'

export default {
  name: 'Devices',
  components: { DevicesList }
}
</script>
