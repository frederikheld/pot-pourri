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
      background-color="primary"
    >
      <v-btn
        v-if="featureToggles.activityFeed.enabled"
        to="/activities"
      >
        <span>Activities</span>
        <v-icon>mdi-forum-outline</v-icon>
      </v-btn>

      <v-btn to="/plants">
        <span>Plants</span>
        <v-icon>mdi-sprout</v-icon>
      </v-btn>

      <v-btn to="/house">
        <span>House</span>
        <v-icon>mdi-home-analytics</v-icon>
      </v-btn>

      <!-- <v-btn to="/devices">
        <span>Devices</span>
        <v-icon>mdi-router-wireless</v-icon>
      </v-btn> -->
    </v-bottom-navigation>

    <v-main class="fill-height">
      <router-view />
    </v-main>

    <!-- <MQTTClient /> -->
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
// import MQTTClient from '@/components/services/MQTTClient.vue'

import { mapGetters } from 'vuex'

export default {
  // components: { NavDrawer, MQTTClient },
  components: { NavDrawer },
  data: () => ({ }),
  computed: {
    ...mapGetters('featureToggles', [
      'featureToggles'
    ])
  }
}
</script>
