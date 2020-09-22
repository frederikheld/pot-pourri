const lab = {
  namespaced: true,
  state: {
    lab: {
      count: 0,
      countDirect: 0,
      labSettings: {
        foo: {
          bar: { }
        }
      }
    }
  },
  getters: {
    count (state) {
      return state.lab.count
    },
    labSettings (state) {
      return state.lab.labSettings
    }
  },
  mutations: {
    SAVE_LAB_SETTINGS (state, newLabSettingsObject) {
      state.lab.labSettings = newLabSettingsObject
    },
    INCREMENT_COUNTER (state) {
      state.lab.count++
    },
    DECREMENT_COUNTER (state) {
      state.lab.count--
    }
  }
}

module.exports = lab
