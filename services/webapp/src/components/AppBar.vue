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
      v-if="$props.back == ''"
      @click.stop="openNavDrawer()"
    >
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

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
  methods: {
    navigateBack () {
      this.$router.replace(this.$props.back)
    },
    openNavDrawer () {
      console.log('AppBar sends global event')
      this.$eventBus.$emit('openDavDrawer')
    }
  }
}
</script>
