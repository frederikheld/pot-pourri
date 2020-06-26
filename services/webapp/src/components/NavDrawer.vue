<template>
  <v-navigation-drawer
    v-model="isOpen"
    app
  >
    <v-list>
      <v-subheader class="pa-3 ma-0">
        <v-list-item-action>
          <v-btn
            icon
            small
            class="ma-0 pa-0 nav-drawer-icon-close"
            @click.stop="isOpen = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
        <!-- <v-list-item-content>
          <v-list-item-title>SETTINGS</v-list-item-title>
        </v-list-item-content> -->
      </v-subheader>

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
      isOpen: false
    }
  },
  created () {
    this.$eventBus.$on('openDavDrawer', this.openNavDrawer)
  },
  beforeDestroy () {
    this.$eventBus.$off('openDavDrawer')
  },
  methods: {
    openNavDrawer () {
      console.log('NavDrawer received global event')
      this.isOpen = true
    }
  }
}
</script>
