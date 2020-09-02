/**
 * This will most probably not be changed during
 * the lifecycle of the app. If this will be the
 * case it won't belong into the vuex store, but
 * into some static file.
 * For now it is fine to have it here.
 */
const theme = {
  namespaced: true,
  state: {
    theme: {
      maps: {
        icons: {
          default: 'mdi-gauge',
          humidity: 'mdi-water',
          light: 'mdi-weather-sunny',
          rain: 'mdi-weather-pouring',
          'ph-value': 'mdi-image-filter-hdr',
          temperature: 'mdi-thermometer'
        }
      }
    }
  },
  getters: {
    iconMap: function (state) {
      return state.theme.maps.icons
    }
  },
  mutations: { }
}

module.exports = theme
