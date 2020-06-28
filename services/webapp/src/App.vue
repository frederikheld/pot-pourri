<template>
  <v-app>
    <NavDrawer />

    <!-- AppBar will be included in each individual page -->

    <v-bottom-navigation
      app
      grow
      dark
      fixed
      color="#fff"
      background-color="#690"
    >
      <v-btn to="/plants">
        <span>Plants</span>
        <v-icon>mdi-flower</v-icon>
      </v-btn>

      <v-btn to="/house">
        <span>House</span>
        <v-icon>mdi-home-analytics</v-icon>
      </v-btn>

      <v-btn to="/devices">
        <span>Devices</span>
        <v-icon>mdi-router-wireless</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-main class="fill-height">
      <router-view />
    </v-main>

    <MQTTClient />
  </v-app>
</template>

<style lang="scss">
// fixes bug with misplaced buttons in bottom-navigation
// see: https://github.com/vuetifyjs/vuetify/issues/8067
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>

<script>
import NavDrawer from '@/components/NavDrawer.vue'
import MQTTClient from '@/components/services/MQTTClient.vue'

export default {
  components: { NavDrawer, MQTTClient },
  data: () => ({ })

}
</script>
