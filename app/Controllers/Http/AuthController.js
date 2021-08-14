'use strict'
const { HttpException } = use('@adonisjs/generic-exceptions')
const User = use('App/Models/User')
const Hash = use('Hash')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

class AuthController {
    async login({ auth, request, response }) {
        let { username, password } = request.all()
        // console.log(username, password)
        if (username == '' || password == '') {
            throw new HttpException('Invalid Username or Password',HttpResponse.STATUS_BAD_REQUEST)
        }
        try {
            let user = await User.findBy('username', username)
            let pass = await Hash.verify(password, user.password)

            if (pass) {
                var { token } = await auth.generate(user)

                let returnData = {
                    message: 'Login Success',
                    user: user,
                    accessToken: token
                }

                response.send(returnData)
            }
            else {
                throw new HttpException('Invalid Username or Password',HttpResponse.STATUS_BAD_REQUEST)
            }


        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }

    async me({ auth, request, response }) {
        // console.log('me!')
        let userID = auth.user.id
        let user = await User.query()
          .where('id', userID)
          .fetch()
    
        if (!user) {
          throw new HttpException('Invalid Token / Token Expired.', 404)
        }
    
        let data = user.toJSON()
    
        response.send(data[0])
    }
}

module.exports = AuthController
