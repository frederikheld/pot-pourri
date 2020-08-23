<template>
  <div>
    <AppBar
      title="House"
    />
    <v-container>
      <div>
        <p>Will show values from environmental sensors in the base station and in optional additional devices.</p>
      </div>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'House',
  components: { AppBar }
}
</script>
