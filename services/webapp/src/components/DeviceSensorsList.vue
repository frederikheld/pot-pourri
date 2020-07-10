<template>
  <div>
    <v-list-item-group
      v-if="$props.device.sensors && $props.device.sensors.length > 0"
    >
      <v-list>
        <v-list-item
          v-for="sensor in $props.device.sensors"
          :key="sensor.id"
        >
          <v-list-item-icon>
            <v-icon>
              {{ iconMap[sensor.type] ? iconMap[sensor.type] : iconMap.default }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ sensor.type }}</v-list-item-title>
            <v-list-item-subtitle>{{ sensor.id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list-item-group>
    <v-row v-else>
      <v-col>
        <p>
          No sensors attached yet!
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* Can be used for actors as well if implemented more generic! */

import { mapGetters } from 'vuex'

export default {
  name: 'DeviceSensorsList',
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'iconMap'
    ])
  }
}
</script>
