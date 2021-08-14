'use strict'
const User = use('App/Models/User')
const Barangay = use('App/Models/Barangay')
const Device = use('App/Models/Device')
const _ = use('lodash')
const Ws = use('Ws')
let socketList = []
let simDeviceList = []

class WebsocketMonitorController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    this.socket.emit("pong", {socketId: socket.id})
  }

  async onConnected(data){
    let b = (await User.query().where('id',data.userId).with('barangay').fetch()).toJSON()
    if(b){
      socketList.push({
        userId: b[0].id,
        barangay: b[0].barangay_id,
        status: 'Connected',
        socketId:data.socketId
      })
    }
    console.table(socketList)

    //query devices from barangay
    let c = (await Device.query().where('barangay_id', b[0].barangay_id).fetch()).toJSON()
    this.socket.emit("info", {user: b[0], devices:c});
  }

  async onUpdateData(data){
    let b = await Device.find(data.id)
    if(!b){
      let c = new Device()
      c.sensor_name = data.sensor_name
      c.id = data.id
      c.sensor_reading = data.sensor_value
      c.barangay_id = data.barangay_id
      await c.save()
      b = c;
    }else{
      b.sensor_name = data.sensor_name
      b.sensor_reading = data.sensor_value
      b.barangay_id = data.barangay_id
      await b.save();
    }
    let k = (await Device.query().where('barangay_id', b.barangay_id).orderBy('created_at', 'ASC').fetch()).toJSON()
    try{
      const c = Ws.getChannel('monitor').topic('monitor')
      c.broadcast('dataUpdate', {devices: k})
    } catch (e){
      console.log('No listeners.')
    }
  }

  async onConnectSimulation(data){
    let b = (await User.query().where('id',data.userId).with('barangay').fetch()).toJSON()
    if(b){
      simDeviceList.push({
        userId: b[0].id,
        sensor_name: '',
        id: '',
        sensor_reading: '0',
        barangay_id: null,
      })
    }
    console.table(simDeviceList)
    let c = (await Barangay.query().fetch()).toJSON()
    this.socket.emit("confirmsimulation", {user: b[0], barangays: c});
  }

  async onClose(){
    let b = _.findIndex(socketList, {socketId:this.socket.id})
    socketList.splice(b, 1)
    console.table(socketList)
  }
}

module.exports = WebsocketMonitorController
