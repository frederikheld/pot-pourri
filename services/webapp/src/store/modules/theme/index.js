const theme = {
  state: {
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
  },
  getters: {
    iconMap: function (state) {
      return state.maps.icons
    }
  },
  mutations: { }
}

module.exports = theme
