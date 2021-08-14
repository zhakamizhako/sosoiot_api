'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Device extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeSave', 'DeviceHook.updateTime');
    }
}

module.exports = Device
