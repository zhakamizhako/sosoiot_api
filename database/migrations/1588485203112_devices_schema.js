'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DevicesSchema extends Schema {
  up () {
    this.create('devices', (table) => {
      table.increments()
      table.timestamps()
      table.string('sensor_name')
      table.integer('barangay_id').unsigned().references('id').inTable('barangays')
      table.double('sensor_reading')
      table.datetime('time_started_high_db')
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DevicesSchema
