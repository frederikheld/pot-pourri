'use strict'

const cmd_args = process.argv.slice(2)
if (cmd_args[0] == '--help' || cmd_args.length === 0) {
  console.log(`Manual

This script logs all messages that are sent by device sensors.

$ node log_messages.js --help|<mqtt_server> [<mqtt_port>] [<topic_pattern>]

If the first argument is '--help' or if you pass no argument at all, this page
will be shown.

Arguments:

    mqtt_server   The ip or hostname of the MQTT broker of which messages will
                  be logged. Mandatory!

    mqtt_port     The port on which the server is listening for mqtt messages.
                  Optional, defaults to 1883.

    topic_pattern The topic that will be listened to. This can be specified
                  using topic wildcards. Optional, defaults to
                  "potpourri/devices/+/sensors/+". To log all topics, pass "#".

  `)
  return
}
const mqtt_host = cmd_args[0]
const mqtt_port = cmd_args[1] || 1883
const topic_pattern = cmd_args[2] || "potpourri/devices/+/sensors/+"

const connection_string = "mqtt://" + mqtt_host + ":" + mqtt_port + "/"

console.log("MQTT host: " + mqtt_host)
console.log("MQTT port: " + mqtt_port)
console.log("Topic: " + topic_pattern)

const mqtt = require("mqtt")
const mqttClient = mqtt.connect(connection_string)
console.log("connected to " + connection_string)

mqttClient.on("connect", async () => {
  await mqttClient.subscribe(topic_pattern)
  console.log("subscribed to " + topic_pattern)
  
})

mqttClient.on("message", (topic, message) => {
  let timestamp = new Date().toISOString()

  console.log(timestamp + " - " + topic.toString() + ": " + message.toString())
})
