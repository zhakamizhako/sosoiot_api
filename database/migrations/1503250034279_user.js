'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable()
      table.string('password', 60).notNullable()
      table.integer('barangay_id').unsigned().references('id').inTable('barangays')
      table.integer('role').unsigned()//999 - admin, 0 - regular user, 1 - tanod
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
