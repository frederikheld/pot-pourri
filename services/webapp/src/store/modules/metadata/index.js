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
    plants (state) {
      return state.metadata.plants
    },
    fetchingPlants (state) {
      return state.metadata.fetchingPlants
    }
  },
  actions: {
    async fetchPlants (context) {
      context.commit('setFetchingPlants', true)

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

      context.commit('setFetchingPlants', false, { global: true })
    }
  },
  mutations: {
    setPlants (state, plants) {
      state.metadata.plants = plants
    },
    setFetchingPlants (state, bool) {
      state.metadata.fetchingPlants = bool
    }
  }
}

module.exports = metadata
