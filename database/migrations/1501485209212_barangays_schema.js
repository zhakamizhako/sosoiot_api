'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangaysSchema extends Schema {
  up () {
    this.create('barangays', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
    })
  }

  down () {
    this.drop('barangays')
  }
}

module.exports = BarangaysSchema
