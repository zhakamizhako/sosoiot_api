'use strict'
const { HttpException } = use('@adonisjs/generic-exceptions')
const User = use('App/Models/User')
const Barangay = use('App/Models/Barangay')
const HttpResponse = use('App/Controllers/Http/HttpResponse')


class BarangayController {
    async create({ request, response }) {
        let { name } = request.all()
        try {
            let barangay = await Barangay.findBy('name', name)
            if (barangay) {
                throw new HttpException("A Barangay with the same name already exists.", HttpResponse.STATUS_BAD_REQUEST)
            }
            barangay = new Barangay()
            barangay.name = name
            await barangay.save()

            response.send(barangay)
        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }

    async edit({ request, response }) {
        let { name, id } = request.all()
        try {
            let barangay = await Barangay.find(id, name)
            if (!barangay) {
                throw new HttpException("A Barangay with the same name already exists.", HttpResponse.STATUS_BAD_REQUEST)
            }
            barangay.name = name
            await barangay.save()

            response.send(barangay)
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.code)
        }
    }

    async getBarangays({ response }) {
        try {
            let barangays = (await Barangay.query().orderByRaw(`SUBSTRING(name FROM '([0-9]+)')::BIGINT ASC, name`).fetch()).toJSON()
            response.send(barangays) 
        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }
}

module.exports = BarangayController
