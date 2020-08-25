<template>
  <v-container
    class="pa-0"
  >
    <v-list-item-group
      v-if="plants.length > 0"
    >
      <v-list>
        <v-list-item
          v-for="plant in plants"
          :key="plant.id"
          :to="'/plants/' + plant.id"
        >
          <v-list-item-icon>
            <v-icon>mdi-sprout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ plant.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ plant.id }}</v-list-item-subtitle>
            <!-- <div>
              {{ plant }}
            </div> -->
          </v-list-item-content>

          <v-list-item-avatar>
            <PlantMoodIndicator
              ref="moodIndicator"
              :device-code="plant.deviceCode"
            />
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-list-item-group>

    <v-row
      v-if="plants.length <= 0"
      justify="center"
      class="mt-4"
    >
      <v-col
        class="text-center"
      >
        <p class="body-1">
          You don't have any plants added yet.
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
import PlantMoodIndicator from '@/components/plant/PlantMoodIndicator.vue'

export default {
  name: 'DevicesList',
  components: { PlantMoodIndicator },
  props: {
    plants: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  },
  mounted () {
    console.log(this.$refs.moodIndicator)
  },
  methods: {
    async updateMoods () {
      for (const moodIndicator of this.$refs.moodIndicator) {
        await moodIndicator.fetchCurrentSensorData()
      }
    }
  }
}
</script>
