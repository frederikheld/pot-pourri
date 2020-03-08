const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://192.168.0.105:1883");

mqttClient.on("connect", async () => {
  await mqttClient.subscribe("devices/+/sensors/+");
});

mqttClient.on("message", (topic, message) => {
  let timestamp = new Date().toISOString();

  console.log(timestamp + " - " + topic.toString() + ": " + message.toString());
});
