<template>
  <v-navigation-drawer
    v-model="navDrawerIsOpen"
    app
    @input="transitioned"
  >
    <v-list>
      <v-list-item
        link
        to="/lab"
      >
        <v-list-item-action>
          <v-icon>mdi-test-tube</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Lab</v-list-item-title>
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
          to="/feature-toggles"
        >
          <v-list-item-action>
            <v-icon>mdi-toggle-switch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Feature Toggles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/app-settings"
        >
          <v-list-item-action>
            <v-icon>mdi-tune</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>App Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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
</template>

<script>

export default {
  name: 'NavDrawer',
  data () {
    return {
      navDrawerIsOpen: null
    }
  },
  created () {
    this.$eventBus.$on('openNavDrawer', this.openNavDrawer)
    this.$eventBus.$on('closeNavDrawer', this.closeNavDrawer)
    this.$eventBus.$on('toggleNavDrawer', this.toggleNavDrawer)
  },
  beforeDestroy () {
    this.$eventBus.$off('openNavDrawer')
    this.$eventBus.$off('closeNavDrawer')
    this.$eventBus.$off('toggleNavDrawer')
  },
  methods: {
    openNavDrawer () {
      this.navDrawerIsOpen = true
      this.$eventBus.$emit('navDrawerWasOpened')
    },
    closeNavDrawer () {
      this.navDrawerIsOpen = false
      this.$eventBus.$emit('navDrawerWasClosed')
    },
    toggleNavDrawer () {
      if (this.navDrawerIsOpen) {
        this.closeNavDrawer()
      } else {
        this.openNavDrawer()
      }
    },
    transitioned (event) {
      if (event === true) {
        this.openNavDrawer()
      } else {
        this.closeNavDrawer()
      }
    }
  }
}
</script>
