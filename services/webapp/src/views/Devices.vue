<template>
  <div>
    <AppBar
      title="Devices"
      back="/"
    >
      <v-btn
        icon
        to="/devices/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </AppBar>
    <v-container>
      <DevicesList />

      <!-- <v-btn
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
      </v-btn> -->
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import DevicesList from '@/components/DevicesList.vue'

export default {
  name: 'Devices',
  components: { AppBar, DevicesList }
}
</script>
