'use strict'
const { HttpException } = use('@adonisjs/generic-exceptions')
const User = use('App/Models/User')
const Hash = use('Hash')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

class AccountController {
    async getUsers({ response }) {
        try {
            let users = (await User.query().with('barangay').fetch()).toJSON()
            response.send(users)
        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }

    async createUser({ request, response }) {
        let { username, password, email, role, barangay } = request.all()
        try {
            let user = await User.findBy('username', username)
            if (user) {
                throw new HttpException(`User ${username} already exists`, HttpResponse.STATUS_CONFLICT)
            }
            else {
                user = new User()
                user.username = username
                user.password = password
                user.email = email
                user.role = role
                user.barangay_id = barangay
                await user.save()

                response.send(user)
            }

        } catch (e) {
            throw new HttpException(e.message, 500)
        }
    }

    async editUser({ request, response }) {
        let { id, username, password, email, role, barangay } = request.all()
        try {
            let user = await User.find(id)
            if(!user){
                throw new HttpException("User not found", 500)
            }
            user.username = username
            if(password){
                user.password = password
            }
            user.email = email
            user.role = role
            user.barangay_id = barangay

            await user.save()

            response.send(user)
        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }
}

module.exports = AccountController
