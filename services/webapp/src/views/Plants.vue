<template>
  <div>
    <AppBar
      title="Plants"
    />

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
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.v-expansion-panel-header__icon {
  display: none !important;
}
</style>
<script>
import AppBar from '@/components/AppBar.vue'
import PlantCard from '@/components/PlantCard.vue'
import PlantStatusCompact from '@/components/PlantStatusCompact.vue'

import Paho from '../assets/paho-mqtt-min.js'
global.Paho = {
  MQTT: Paho
}

export default {
  name: 'Plants',
  components: { AppBar, PlantCard, PlantStatusCompact },
  data () {
    return {
      plants: {},
      mqttClient: undefined
    }
  },
  mounted () {
    this.mqttInit()
    this.mqttConnect()
  },
  methods: {
    mqttInit () {
      this.mqttClient = new Paho.Client(
        '192.168.0.105',
        Number(1884),
        'PotPourriWebApp'
      )
      this.mqttClient.onConnectionLost = this.onConnectionLost
      this.mqttClient.onMessageArrived = this.onMessageArrived
    },
    mqttConnect () {
      this.mqttClient.connect({ onSuccess: this.onConnect })
    },
    onConnect () {
      // console.log('connected')
      this.mqttClient.subscribe('devices/+/sensors/+', {
        qos: 2
      })
    },
    onConnectionLost (response) {
      // console.log(response.errorCode + ' | ' + response.errorMessage)
      this.mqttClient.connect({ onSuccess: this.onConnect })
    },
    onMessageArrived (message) {
      this.updatePlants(message)
    },
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
