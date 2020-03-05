const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', async () => {
    let i = 1
    setInterval(() => {
        client.publish('foo', 'send_message: Hey you! ' + i)
        i++
    }, 1000)
})

client.on('message', (topic, message) => {
    let date = new Date();
    console.log(date.getTime() + ' - ' + topic.toString() + ': ' + message.toString())
    // client.end()
})