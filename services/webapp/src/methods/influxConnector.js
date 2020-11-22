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
InfluxConnector.prototype.fetchCurrentSensorValueRaw = async function (deviceCode, sensor, maxAge = undefined) {
  let currentSensorValue

  const influx = new Influx.InfluxDB(this.influxConnectionData)

  let query = 'SELECT last("value") FROM "autogen"."mqtt_consumer_integer" WHERE ("topic" = \'potpourri/devices/' + deviceCode + '/sensors/' + sensor + '\')'

  if (maxAge) {
    query += ' AND time >= now() - ' + maxAge
  }

  query += ' ORDER BY time DESC'

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
InfluxConnector.prototype.fetchCurrentSensorValuePercent = async function (deviceCode, sensor, maxAge = undefined) {
  const currentSensorValueRaw = await this.fetchCurrentSensorValueRaw(deviceCode, sensor, maxAge)

  if (!currentSensorValueRaw) {
    return undefined
  }

  return ((1024 - currentSensorValueRaw) / 1024) * 100
}

/**
 * Fetches all values of the given sensor on the given device
 * from now back to `timeLimit`.
 *
 * `timeLimit` needs to be in InfluxQL format.
 * Default ist `24h`.
 */
InfluxConnector.prototype.fetchSensorHistoryPercent = async function (deviceCode, sensor, maxAge = '24h') {
  let sensorHistory

  const influx = new Influx.InfluxDB(this.influxConnectionData)

  const query = 'SELECT (1024 - "value") / 1024 * 100 FROM "autogen"."mqtt_consumer_integer" WHERE ("topic" = \'potpourri/devices/' + deviceCode + '/sensors/' + sensor + '\') AND time >= now() - ' + maxAge + ' ORDER BY time DESC'

  const result = await influx.query(query)

  if (result) {
    sensorHistory = result
  }

  return sensorHistory
}

module.exports = InfluxConnector
