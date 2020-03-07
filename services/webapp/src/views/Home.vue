<template>
  <div class="home">
    <PlantCard
      v-for="(plant, plant_id) in plants"
      :key="plant_id"
      :plant="plant"
    />
  </div>
</template>

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
      plants: {}
    }
  },
  mounted () {
    console.log('mounted')

    const mqttClient = new Paho.Client(
      '192.168.0.105',
      Number(1884),
      'PotPourriWebApp'
    )
    mqttClient.onConnectionLost = onConnectionLost
    mqttClient.onMessageArrived = this.onMessageArrived

    mqttClient.connect({ onSuccess: onConnect })

    function onConnect () {
      console.log('connected')
      mqttClient.subscribe('devices/+/sensors/+', {
        qos: 2
      })
    }

    function onConnectionLost (response) {
      console.log('connection lost')
      console.log(response.errorCode + ' | ' + response.errorMessage)
    }
  },
  methods: {
    onMessageArrived (message) {
      console.log('message arrived')
      this.updatePlants(message)
    },
    updatePlants (message) {
      console.log(message.payloadString)

      // extract device id:
      const deviceId = message.topic.match(/devices\/(.*)\/sensors\/.*/)[1]
      console.log('device_id = ' + deviceId)

      const newPlants = this.plants
      newPlants[deviceId] = {
        deviceId: deviceId,
        humidity: message.payloadString
      }

      console.log(newPlants)

      this.plants = Object.assign({}, newPlants)

      console.log(this.plants)
    }
  }
}
</script>
