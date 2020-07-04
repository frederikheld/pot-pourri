<template>
  <v-app-bar
    app
    dark
    src="../../public/img/backgrounds/bg-greens.jpg"
    color="#690"
  >
    <v-app-bar-nav-icon
      v-if="$props.back != ''"
      @click.stop="navigateBack()"
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-app-bar-nav-icon>

    <v-app-bar-nav-icon
      v-if="$props.back == '' && $vuetify.breakpoint.mobile"
      @click.stop="toggleNavDrawer()"
    >
      <v-icon>
        mdi-menu
      </v-icon>

      <!--
        This is the option to toggle
        between burger and x icon
        for open and close menu:
      <v-icon v-if="!navDrawerIsOpen">
        mdi-menu
      </v-icon>
      <v-icon v-if="navDrawerIsOpen">
        mdi-close
      </v-icon>//-->
    </v-app-bar-nav-icon>

    <v-toolbar-title
      v-if="$props.back == '' && !$vuetify.breakpoint.mobile"
      style="margin-left: 56px;"
    >
      {{ title }}
    </v-toolbar-title>
    <v-toolbar-title v-else>
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <slot />
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      navDrawerIsOpen: null
    }
  },
  created () {
    this.$eventBus.$on('navDrawerWasOpened', () => {
      this.navDrawerIsOpen = true
    })
    this.$eventBus.$on('navDrawerWasClosed', () => {
      this.navDrawerIsOpen = false
    })
  },
  beforeDestroy () {
    this.$eventBus.$off('navDrawerWasOpened')
    this.$eventBus.$off('navDrawerWasClosed')
  },
  methods: {
    navigateBack () {
      this.$router.replace(this.$props.back)
    },
    toggleNavDrawer () {
      this.$eventBus.$emit('toggleNavDrawer')
    }
  }
}
</script>
