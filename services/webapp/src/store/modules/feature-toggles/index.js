const featureToggles = {
  namespaced: true,
  state: {
    featureToggles: {
      activityFeed: {
        enabled: false,
        addFakeMessages: false
      }
    }
  },
  getters: {
    featureToggles (state) {
      return state.featureToggles
    }
  },
  mutations: {
    SAVE_FEATURETOGGLES (state, newFeatureTogglesObject) {
      state.featureToggles = newFeatureTogglesObject
    }
  }
}

module.exports = featureToggles
