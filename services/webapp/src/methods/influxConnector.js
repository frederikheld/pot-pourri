'use strict'

const Influx = require('influx')

/*
 * influxConnectionData = {
 *   host: '',
 *   port: '',
 *   username: '',
 *   password: '',
 *   database: ''
 * }
 */
const InfluxConnector = function (influxConnectionData) {
  this.influxConnectionData = influxConnectionData
}

/**
 * Returns the current value of the given sensor
 * on the given device.
 */
InfluxConnector.prototype.fetchCurrentSensorValueRaw = async function (deviceCode, sensor) {
  let currentSensorValue

  const influx = new Influx.InfluxDB(this.influxConnectionData)

  const query = 'SELECT last("value") FROM "autogen"."mqtt_consumer" WHERE ("topic" = \'potpourri/devices/' + deviceCode + '/sensors/' + sensor + '\')'

  const result = await influx.query(query)

  if (result && result[0]) {
    currentSensorValue = result[0].last
  }

  return currentSensorValue
}

/**
 * Same operation as fetchCurrentSensorValueRaw,
 * but converts the value into percent before
 * returning it.
 */
InfluxConnector.prototype.fetchCurrentSensorValuePercent = async function (deviceCode, sensor) {
  const currentSensorValueRaw = await this.fetchCurrentSensorValueRaw(deviceCode, sensor)

  const currentSensorValue = ((1024 - currentSensorValueRaw) / 1024) * 100

  return currentSensorValue
}

/**
 * Fetches all values of the given sensor on the given device
 * from now back to `timeLimit`.
 *
 * `timeLimit` needs to be in InfluxQL format.
 * Default ist `24h`.
 */
InfluxConnector.prototype.fetchSensorHistoryPercent = async function (deviceCode, sensor, timeLimit = '24h') {
  let sensorHistory

  const influx = new Influx.InfluxDB(this.influxConnectionData)

  const query = 'SELECT (1024 - "value") / 1024 * 100 FROM "autogen"."mqtt_consumer" WHERE ("topic" = \'potpourri/devices/' + deviceCode + '/sensors/' + sensor + '\') AND time > now() - ' + timeLimit + ' ORDER BY time DESC'

  const result = await influx.query(query)

  if (result) {
    sensorHistory = result
  }

  return sensorHistory
}

module.exports = InfluxConnector
