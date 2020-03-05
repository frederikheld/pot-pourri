const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://serenity:1883')
const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', () => {
    client.subscribe('foo', (err) => {
        if (!err) {
            client.publish('foo', 'index: Hello MQTT!')
        }
    })
})

client.on('message', (topic, message) => {
    console.log(message.toString())
    // client.end()
})