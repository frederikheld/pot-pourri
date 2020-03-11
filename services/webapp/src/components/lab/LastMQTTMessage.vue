<template>
  <div>
    <h2>Last MQTT Message</h2>
    <p>{{ mqttLastMessage !== undefined ? mqttLastMessage.topic + ' > ' + mqttLastMessage.payloadString : 'no message received yet' }}</p>
  </div>
</template>

<script>
export default {
  name: 'LastMQTTMessage',
  computed: {
    mqttLastMessage: function () {
      return this.$store.state.mqtt.lastMessage
    }
  },
  watch: {
    mqttLastMessage: function (newMessage, oldMessage) {
      if (newMessage !== undefined) {
        return newMessage
      } else if (oldMessage !== undefined) {
        return oldMessage
      }

      return undefined
    }
  }
}
</script>
