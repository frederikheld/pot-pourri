const featureToggles = {
  state: {
    activityFeed: {
      enabled: false,
      addFakeMessages: false
    }
  },
  getters: {
    appFeatureToggles (state) {
      return state
    }
  },
  mutations: {
    SAVE_APP_FEATURETOGGLES (state, newAppFeatureTogglesObject) {
      state = newAppFeatureTogglesObject
    }
  }
}

module.exports = featureToggles
