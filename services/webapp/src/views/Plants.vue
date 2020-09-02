<template>
  <div>
    <AppBar
      title="Plants"
    >
      <LoadingIndicator
        v-if="fetchingPlants"
      />
      <v-btn
        v-else
        icon
        @click="fetchPlants()"
      >
        <v-icon>mdi-reload</v-icon>
      </v-btn>

      <v-btn
        icon
        to="/plants/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </AppBar>

    <v-container
      id="container"
      class="pa-0"
    >
      <PlantsList
        v-if="!fetchingPlants"
        ref="plantsList"
        :plants="plants"
      />

      <LoadingIndicator
        v-if="fetchingPlants"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  animation:spin 0.6s linear infinite;
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import PlantsList from '@/components/PlantsList.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
// import PlantCard from '@/components/PlantCard.vue'
// import PlantStatusCompact from '@/components/PlantStatusCompact.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Plants',
  // components: { AppBar, PlantCard, PlantStatusCompact },
  components: { AppBar, PlantsList, LoadingIndicator },
  data () {
    return { }
  },
  computed: {
    ...mapGetters('metadata', [
      'plants',
      'fetchingPlants'
    ]),
    ...mapGetters('appSettings', [
      'metastoreServerAddress'
    ])
  },
  async beforeMount () {
    await this.fetchPlants()
  },
  methods: {
    async fetchPlants () {
      await this.$store.dispatch('metadata/fetchPlants')

      this.$nextTick(function () {
        this.$refs.plantsList.updateMoods()
      })
    }
  }
}
</script>
