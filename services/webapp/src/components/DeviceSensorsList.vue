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
          <v-list-item-content>
            <v-list-item-title>{{ sensor.type }}</v-list-item-title>
            <v-list-item-subtitle>{{ sensor.id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list-item-group>
    <p v-else>
      No sensors attached yet!
    </p>
  </div>
</template>

<script>
/* Can be used for actors as well if implemented more generic! */

export default {
  name: 'DeviceSensorsList',
  props: {
    device: {
      type: Object,
      required: true
    }
  }
}
</script>
