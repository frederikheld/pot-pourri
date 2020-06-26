<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerIsOpen"
      app
    >
      <v-list>
        <v-subheader class="pa-3 ma-0">
          <v-list-item-action>
            <v-btn
              icon
              small
              class="ma-0 pa-0 nav-drawer-icon-close"
              @click.stop="drawerIsOpen = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>SETTINGS</v-list-item-title>
          </v-list-item-content>
        </v-subheader>

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
      <v-app-bar-nav-icon @click.stop="drawerIsOpen = !drawerIsOpen">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        Pot Pourri
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>

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

      <v-btn to="/lab">
        <span>Lab</span>
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-main class="fill-height">
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  overflow-y: auto;
}

// fixes bug with misplaced buttons in bottom-navigation
// see: https://github.com/vuetifyjs/vuetify/issues/8067
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>

<script>
export default {
  data: () => ({
    drawerIsOpen: null
  })
}
</script>
