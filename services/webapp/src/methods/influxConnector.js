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
 *
 */
InfluxConnector.prototype.fetchCurrentSensorValuePercent = async function (deviceCode, sensor) {
  const currentSensorValueRaw = await this.fetchCurrentSensorValueRaw(deviceCode, sensor)

  const currentSensorValue = ((1024 - currentSensorValueRaw) / 1024) * 100

  return currentSensorValue
}

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

module.exports = InfluxConnector
