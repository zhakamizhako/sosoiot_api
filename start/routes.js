'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() =>{
  Route.get('/me', 'AuthController.me').middleware(['auth:api'])
  Route.post('/login', 'AuthController.login')
  Route.post('/create', 'AccountController.createUser').middleware(['auth:api'])
  Route.get('/getusers', 'AccountController.getUsers').middleware(['auth:api'])
  Route.put('/edit', 'AccountController.editUser').middleware(['auth:api'])
}).prefix('v1/accounts')


Route.group(() =>{
  Route.post('/create', 'BarangayController.create').middleware(['auth:api'])
  Route.get('/getbarangay', 'BarangayController.getBarangays').middleware(['auth:api'])
  Route.put('/edit', 'BarangayController.edit').middleware(['auth:api'])
}).prefix('v1/barangay')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
