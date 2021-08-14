'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: ['Admin'][i],
    email: ['solon.rolandkimandre@gmail.com'][i],
    password: ['1234'][i],
    barangay_id:['1'][i],
    role: ['999'][i]
  }
})

Factory.blueprint('App/Models/Barangay', (faker, i, data) => {
  return {
    name: [
        '1-A',
        '2-A',
        '3-A',
        '4-A',
        '5-A',
        '6-A',
        '7-A',
        '8-A',
        '9-A',
        '10-B',
        '11-B',
        '12-B',
        '13-B',
        '14-B',
        '15-B',
        '16-B',
        '17-B',
        '18-B',
        '19-B',
        '20-B',
        '21-C',
        '22-C',
        '23-C',
        '24-C',
        '25-C',
        '26-C',
        '27-C',
        '28-C',
        '29-C',
        '30-C',
        '31-D',
        '32-D',
        '33-D',
        '34-D',
        '35-D',
        '36-D',
        '37-D',
        '38-D',
        '39-D',
        '40-D',
    ][i]
  }
})
