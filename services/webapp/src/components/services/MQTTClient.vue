<template>
  <div style="display: none;" />
</template>

<script>
import Paho from './../../assets/paho-mqtt-min.js'

global.Paho = {
  MQTT: Paho
}

export default {
  data () {
    return {
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
        'localhost',
        Number(80),
        '/ws',
        'PotPourriWebApp'
      )
      this.mqttClient.onConnectionLost = this.onConnectionLost
      this.mqttClient.onMessageArrived = this.onMessageArrived
    },
    mqttConnect () {
      this.mqttClient.connect({ onSuccess: this.onConnect })
    },
    onConnect () {
    //   console.log('new mqtt client: connected')
      this.mqttClient.subscribe('devices/+/sensors/+', {
        qos: 2
      })
    },
    onConnectionLost (response) {
    //   console.log(response.errorCode + ' | ' + response.errorMessage)
      this.mqttClient.connect({ onSuccess: this.onConnect })
    },
    onMessageArrived (message) {
    //   console.log('message as received:', message)
      this.$store.state.mqtt.lastMessage = message
      // NOTE: you removed this from the store. If you re-implement it,
      // do it with getters and mutations!
    }
  }
}
</script>
