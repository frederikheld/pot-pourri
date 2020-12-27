'use strict'

const cmd_args = process.argv.slice(2);
if (cmd_args[0] == '--help' || cmd_args.length === 0) {
  console.log(`Manual

This script sends random values as fake sensor data via MQTT in an defined interval.

$ node send_message.js --help|<mqtt_server> [<mqtt_port>]
      [<device_id>] [<interval>]

If the first argument is '--help' or if you pass no argument at all, this page
will be shown.

Arguments:

    mqtt_server   The ip or hostname of the MQTT broker this message will be
                  sent to. Mandatory!

    mqtt_port     The port on which the server is listening for mqtt messages.
                  Optional, defaults to 1883.

    device_id     The device id that will be used to send fake data. Optional,
                  defaults to a random between 0 and 255.

    sensor_id     The sensor id that will be used to send fake data. Optional,
                  defaults to a random between 0 and 255.

    interval      The interval in milliseconds between two messages. Optional,
                  defaults to 1000.

  `)
  return
}
const mqtt_host = cmd_args[0];
const mqtt_port = cmd_args[1] || 1883;
const device_id = cmd_args[2] || getRandomInt(0, 256);
const sensor_id = cmd_args[3] || getRandomInt(0, 256);
const interval = cmd_args[4] || 1000;

const connection_string = "mqtt://" + mqtt_host + ":" + mqtt_port + "/"

console.log("MQTT host: " + mqtt_host);
console.log("MQTT port: " + mqtt_port);
console.log("Device ID: " + device_id);
console.log("Sensor ID: " + sensor_id);
console.log("Interval : " + interval);

const mqtt = require("mqtt");
const mqttClient = mqtt.connect(connection_string);

mqttClient.on("connect", async () => {
  console.log("connected to " + connection_string)

  setInterval(() => {
    const topic = "potpourri/devices/" + device_id + "/sensors/" + sensor_id
    const fake_data = getRandomInt(0, 1025)

    mqttClient.publish(
      topic,
      "" + fake_data
    );

    console.log("sent via " + topic + ": " + fake_data)
  }, interval);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
