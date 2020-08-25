<template>
  <div>
    <AppBar
      title="Plants"
    >
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
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import PlantsList from '@/components/PlantsList.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
// import PlantCard from '@/components/PlantCard.vue'
// import PlantStatusCompact from '@/components/PlantStatusCompact.vue'

import PullToRefresh from 'pulltorefreshjs'

import { mapGetters } from 'vuex'

export default {
  name: 'Plants',
  // components: { AppBar, PlantCard, PlantStatusCompact },
  components: { AppBar, PlantsList, LoadingIndicator },
  data () {
    return {
      plants: [],
      fetchingPlants: false
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress'
    ])
  },
  mounted () {
    const self = this
    PullToRefresh.init({
      mainElement: '#container',
      onRefresh () {
        self.fetchPlants()
      }
    })
  },
  destroyed () {
    PullToRefresh.destroyAll()
  },
  async beforeMount () {
    this.fetchingPlants = true
    await this.fetchPlants()
    this.fetchingPlants = false
  },
  methods: {
    async fetchPlants  () {
      const url = this.metastoreServerAddress + '/api/plants'

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plants = await res.json()

        // // debug:
        // for (let i = 0; i < Math.random() * (5 - 1) + 1; i++) {
        //   plants.push({
        //     deviceCode: '1',
        //     id: 'test-' + i,
        //     name: 'test'
        //   })
        // }

        this.plants = plants
        this.fetchingPlants = false
        this.$nextTick(function () {
          this.$refs.plantsList.updateMoods()
        })
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    }
  }
}
</script>
