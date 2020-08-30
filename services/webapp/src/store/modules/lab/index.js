const lab = {
  state: {
    count: 0,
    countDirect: 0,
    labSettings: {
      foo: {
        bar: { }
      }
    }
  },
  getters: {
    count (state) {
      return state.count
    },
    labSettings (state) {
      return state.labSettings
    }
  },
  mutations: {
    SAVE_LAB_SETTINGS (state, newLabSettingsObject) {
      state.labSettings = newLabSettingsObject
    },
    INCREMENT_COUNTER (state) {
      state.count++
    },
    DECREMENT_COUNTER (state) {
      state.count--
    }
  }
}

module.exports = lab
