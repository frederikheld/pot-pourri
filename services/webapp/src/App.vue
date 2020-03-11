<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
    >
      <v-list-item>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <v-list>
        <v-list-item
          link
          to="/devices"
        >
          <v-list-item-action>
            <v-icon>mdi-router-wireless</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Devices</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/system"
        >
          <v-list-item-action>
            <v-icon>mdi-hubspot</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>System</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item
            link
            to="/about"
          >
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      fixed
      dark
      src="../public/img/backgrounds/bg-greens.jpg"
      color="#690"
    >
      <v-toolbar-title>
        Pot Pourri
      </v-toolbar-title>

      <v-spacer />

      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>mdi-tune</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-bottom-navigation
      app
      grow
      dark
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

      <v-btn to="/lab">
        <span>Lab</span>
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-content>
      <router-view />
    </v-content>

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
import MQTTClient from '@/components/services/MQTTClient.vue'

export default {
  components: { MQTTClient },
  data () {
    return {
      drawer: null
    }
  }
}
</script>
