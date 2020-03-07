<template>
  <div class="home">
    <PlantCard
      v-for="(plant, plant_id) in plants"
      :key="plant_id"
      class="plant_card"
      :plant="plant"
    />
  </div>
</template>

<style lang="scss" scoped>
.plant_card {
  margin: 4rem;
}
</style>
<script>
import PlantCard from '@/components/PlantCard.vue'

import Paho from '../assets/paho-mqtt-min.js'
global.Paho = {
  MQTT: Paho
}

export default {
  name: 'Home',
  components: { PlantCard },
  data () {
    return {
      plants: {},
      mqttClient: undefined
    }
  },
  mounted () {
    console.log('Home mounted')
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
      // console.log('connection lost')
      console.log(response.errorCode + ' | ' + response.errorMessage)
      this.mqttClient.connect({ onSuccess: this.onConnect })
    },
    onMessageArrived (message) {
      // console.log('message arrived')
      this.updatePlants(message)
    },
    updatePlants (message) {
      // extract device id:
      const deviceId = message.topic.match(/devices\/(.*)\/sensors\/.*/)[1]

      // console.log('[' + deviceId + '] ' + message.payloadString)

      const newPlants = this.plants
      newPlants[deviceId] = {
        deviceId: deviceId,
        humidity: {
          value: message.payloadString,
          upperLimit: 1024,
          lowerLimit: 0,
          upperHealthyLimit: 800,
          lowerHealthyLimit: 200
        }
      }

      this.plants = Object.assign({}, newPlants)

      console.log('this.plants:', this.plants)
    }
  }
}
</script>
