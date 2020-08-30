const featureToggles = {
  state: {
    activityFeed: {
      enabled: false,
      addFakeMessages: false
    }
  },
  getters: {
    featureToggles (state) {
      return state
    }
  },
  mutations: {
    SAVE_FEATURETOGGLES (state, newFeatureTogglesObject) {
      state = newFeatureTogglesObject
    }
  }
}

module.exports = featureToggles
