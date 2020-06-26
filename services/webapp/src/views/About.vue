<template>
  <div>
    <AppBar
      title="About"
      back="/"
    />
    <v-container>
      <h1>About</h1>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'About',
  components: { AppBar }
}
</script>
