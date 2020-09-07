/**
 * Buffers data from metastore
 */
const metadata = {
  namespaced: true,
  state: {
    metadata: {
      plants: [],
      fetchingPlants: false
    }
  },
  getters: {
    plants: (state) => {
      return state.metadata.plants
    },
    plantById: (state) => (plantId) => {
      console.log('getter plantById called with plantId', plantId)
      return state.metadata.plants.find(x => x.id === plantId)
    },
    fetchingPlants: (state) => {
      return state.metadata.fetchingPlants
    }
  },
  actions: {
    async fetchPlants (context) {
      context.commit('setFetchingPlants', true)

      console.log('action metadata/fetchPlants dispatched')

      const url = context.rootGetters['appSettings/metastoreServerAddress'] + '/api/plants'

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plants = await res.json()

        context.commit('setPlants', plants)
      } catch (error) {
        console.error(error)
      }

      console.log('action metadata/fetchPlants finished')
      // console.log('Updated plants in store:', context.getters.plants)

      context.commit('setFetchingPlants', false, { global: true })
    },
    async fetchPlantById (context, plantId) {
      context.commit('setFetchingPlants', true)

      console.log('action metadata/fetchPlant(' + plantId + ') dispatched')

      const url = context.rootGetters['appSettings/metastoreServerAddress'] + '/api/plants/' + plantId

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()

        context.commit('setPlant', plant)
      } catch (error) {
        console.error(error)
      }

      console.log('action metadata/fetchPlant(' + plantId + ') finished')

      context.commit('setFetchingPlants', false)
    }
  },
  mutations: {
    setPlants (state, plants) {
      state.metadata.plants = plants
    },
    setPlant (state, plant) {
      const index = state.metadata.plants.map(x => x.id).indexOf(plant.id)

      if (index >= 0) {
        state.metadata.plants.splice(index, 1, plant)
      } else {
        state.metadata.plants.push(plant)
      }
    },
    setFetchingPlants (state, bool) {
      state.metadata.fetchingPlants = bool
    }
  }
}

module.exports = metadata
