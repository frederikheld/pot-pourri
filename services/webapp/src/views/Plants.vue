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

    <v-btn
      id="btn-add-plant"
      fixed
      fab
      dark
      bottom
      right
      to="/plants/add"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<style lang="scss" scoped>
.v-expansion-panel-header__icon {
  display: none !important;
}

#btn-add-plant {
  margin-bottom: 55px;
}
</style>
<script>
import PlantCard from '@/components/PlantCard.vue'
import PlantStatusCompact from '@/components/PlantStatusCompact.vue'

export default {
  name: 'Plants',
  components: { PlantCard, PlantStatusCompact },
  data () {
    return {
      plants: { }
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
