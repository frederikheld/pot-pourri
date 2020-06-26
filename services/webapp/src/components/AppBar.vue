<template>
  <v-app-bar
    fixed
    dark
    src="../../public/img/backgrounds/bg-greens.jpg"
    color="#690"
  >
    <v-app-bar-nav-icon>
      <v-icon @click="navigateBack()">
        mdi-arrow-left
      </v-icon>
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
      if (this.$props.back !== '') {
        this.$router.replace(this.$props.back)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
