const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.0.105:1883')

client.on('connect', async () => {
    let i = 1
    setInterval(() => {
        client.publish('devices/12/sensors/1', '' + i)
        i++
    }, 1000)
})

client.on('message', (topic, message) => {
    let date = new Date();
    console.log(date.getTime() + ' - ' + topic.toString() + ': ' + message.toString())
    // client.end()
})
