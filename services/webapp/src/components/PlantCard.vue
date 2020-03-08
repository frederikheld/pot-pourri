<template>
  <div>
    <v-list-item
      three-line
      class="pa-0"
    >
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      />

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ plant.deviceId }}
        </v-list-item-title>
        <v-list-item-subtitle>
          This plant feels :-) :-| :-(
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-simple-table class="values">
      <tbody>
        <tr>
          <td>device id</td>
          <td>{{ plant.deviceId }}</td>
        </tr>
        <tr>
          <td>humidity (current)</td>
          <td>{{ Math.round(plant.humidity.value) }} %</td>
        </tr>
        <tr>
          <td>last update</td>
          <td>//</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<style lang="scss" scoped>
.values tbody tr td:first-child {
  padding-left: 0;
}
.values tbody tr td:last-child {
  padding-right: 0;
}
</style>

<script>
export default {
  name: 'PlantCard',
  components: {},
  props: {
    plant: {
      type: Object,
      required: true
    }
  }
}
</script>
