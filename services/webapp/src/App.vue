<template>
  <v-app>
    <v-bottom-navigation
      hide-on-scroll
      app
      grow
    >
      <v-btn to="/">
        <span>Plants</span>
        <v-icon>mdi-flower</v-icon>
      </v-btn>

      <v-btn to="/devices">
        <span>Devices</span>
        <v-icon>mdi-router-wireless</v-icon>
      </v-btn>

      <v-btn to="/lab">
        <span>Lab</span>
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
// fixes bug with misplaced buttons in bottom-navigation
// see: https://github.com/vuetifyjs/vuetify/issues/8067
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>
