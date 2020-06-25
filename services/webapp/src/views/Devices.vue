<template>
  <v-container>
    <h1>Devices</h1>
    <DevicesList />
    <v-btn
      dark
      fab
      bottom
      right
      fixed
      color="primary"
      style="z-index: 5; margin-bottom: 54px;"
      to="/devices/add"
      title="Add Device"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import DevicesList from '@/components/DevicesList.vue'

export default {
  name: 'Devices',
  components: { DevicesList }
}
</script>
