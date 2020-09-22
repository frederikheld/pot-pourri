<template>
  <v-container>
    <v-btn
      @click="updatePlants"
    >
      Update Plants
    </v-btn>
    <v-divider />
    <div
      v-if="fetchingPlants"
    >
      Loading ...
    </div>
    <div v-else>
      {{ plants }}
    </div>
  </v-container>
</template>

<script>
/**
 * This view demonstrates how an update of meta data
 * in the store can be triggered.
 */
import { mapGetters } from 'vuex'

export default {
  name: 'LabStoreRestBackend',
  data () {
    return { }
  },
  computed: {
    ...mapGetters('metadata', [
      'plants',
      'fetchingPlants'
    ])
  },
  mounted () { },
  methods: {
    async updatePlants () {
      this.$store.dispatch('metadata/fetchPlants')
    }
  }
}
</script>
