const mqtt = require('mqtt')
const mqttClient = mqtt.connect('mqtt://localhost:1883')

mqttClient.on('connect', async () => {
    await mqttClient.subscribe('devices/+/sensors/+')
})

mqttClient.on('message', (topic, message) => {
    let date = new Date();
    console.log(date.getTime() + ' - ' + topic.toString() + ': ' + message.toString())
})