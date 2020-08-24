<template>
  <v-card
    :to="$props.link"
    :color="color + ' lighten-2'"
  >
    <v-list-item>
      <v-list-item-icon>
        <v-icon v-if="$props.type === 'alert'">
          mdi-alert
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <div><slot /></div>
      </v-list-item-content>

      <v-list-item-avatar>
        <v-icon v-if="$props.callToAction === 'water'">
          mdi-watering-can
        </v-icon>
        <v-icon v-else-if="$props.callToAction === 'sun'">
          mdi-weather-sunny
        </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'AlertCard',
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    callToAction: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      colorMappings: {
        water: 'indigo',
        sun: 'deep-orange'
      }
    }
  },
  computed: {
    color: function () {
      if (this.$props.callToAction in this.colorMappings) {
        return this.colorMappings[this.$props.callToAction]
      } else {
        return ''
      }
    }
  }
}
</script>
