<template>
  <v-container
    class="pa-0"
  >
    <v-list-item-group
      v-if="devices.length > 0"
    >
      <v-list>
        <v-list-item
          v-for="device in devices"
          :key="device.id"
          :to="'/devices/' + device.id"
        >
          <v-list-item-icon>
            <v-icon>mdi-radio-tower</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ device.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ device.id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list-item-group>

    <v-row
      v-if="devices.length <= 0"
      justify="center"
      class="mt-4"
    >
      <v-col
        class="text-center"
      >
        <p class="body-1">
          You don't have any devices configured yet.
        </p>
        <p class="body-2">
          Tap the + button to create one!
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: 'DevicesList',
  props: {
    devices: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  }
}
</script>
