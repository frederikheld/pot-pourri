const cmd_args = process.argv.slice(2);
const mqtt_host = cmd_args[0];
const mqtt_port = cmd_args[1] || 1883;
const device_id = cmd_args[2] || getRandomInt(0, 256);
const interval = cmd_args[3] || 1000;

console.log("MQTT host: " + mqtt_host);
console.log("MQTT port: " + mqtt_port);
console.log("Device ID: " + device_id);
console.log("Interval : " + interval);

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://" + mqtt_host + ":" + mqtt_port);

client.on("connect", async () => {
  setInterval(() => {
    client.publish(
      "devices/" + device_id + "/sensors/1",
      "" + getRandomInt(0, 1025)
    );
  }, interval);
});

client.on("message", (topic, message) => {
  let date = new Date();
  console.log(
    date.getTime() + " - " + topic.toString() + ": " + message.toString()
  );
  // client.end()
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
