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
          </v-list-item-content>

          <v-list-item-avatar>
            <PlantMoodIndicator
              ref="moodIndicator"
              :plant="plant"
            />
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-list-item-group>

    <v-row
      v-else
    >
      <v-col
        class="my-8"
        align="center"
      >
        <p class="body-1">
          You don't have any plants added yet.
        </p>
        <p class="body-2">
          Tap the <span style="white-space: nowrap;"><v-icon>mdi-plus</v-icon> button</span> to create one!
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
  name: 'PlantsList',
  components: { PlantMoodIndicator },
  props: {
    plants: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  },
  methods: { }
}
</script>
