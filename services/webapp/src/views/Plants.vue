<template>
  <v-container>
    <h1>Plants</h1>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(plant, plant_id) in plants"
        :key="plant_id"
      >
        <v-expansion-panel-header>
          <span>{{ plant.deviceId }}</span>
          <span><PlantStatusCompact :plant="plant" /></span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <PlantCard
            class="plant_card"
            :plant="plant"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-container>
      <h2>last mqtt message:</h2>
      <p>{{ mqttLastMessage !== undefined ? mqttLastMessage.topic + ' > ' + mqttLastMessage.payloadString : 'no message received yet' }}</p>
    </v-container>

    <v-container>
      <h2>Vuex Test</h2>
      <Counter class="my-4" />
    </v-container>
  </v-container>
</template>

<style lang="scss" scoped>
.v-expansion-panel-header__icon {
  display: none !important;
}
</style>
<script>
import PlantCard from '@/components/PlantCard.vue'
import PlantStatusCompact from '@/components/PlantStatusCompact.vue'
import Counter from '@/components/lab/Counter.vue'

export default {
  name: 'Plants',
  components: { Counter, PlantCard, PlantStatusCompact },
  data () {
    return {
      plants: {}
    }
  },
  computed: {
    mqttLastMessage: function () {
      return this.$store.state.mqtt.lastMessage
    }
  },
  watch: {
    mqttLastMessage: function (newMessage, oldMessage) {
      if (newMessage !== undefined) {
        this.updatePlants(newMessage)
        return newMessage
      } else if (oldMessage !== undefined) {
        return oldMessage
      }

      return undefined
    }
  },
  methods: {
    updatePlants (message) {
      // extract device id:
      const deviceId = message.topic.match(/devices\/(.*)\/sensors\/.*/)[1]

      // compile data object:
      const newPlants = this.plants
      newPlants[deviceId] = {
        deviceId: deviceId,
        humidity: {
          value: ((1024 - parseInt(message.payloadString)) / 1024) * 100,
          upperHealthyLimit: 70,
          lowerHealthyLimit: 30
        }
      }

      this.plants = Object.assign({}, newPlants)
    }
  }
}
</script>
