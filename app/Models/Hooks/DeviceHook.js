'use strict'

const DeviceHook = exports = module.exports = {}

DeviceHook.updateTime = async (Device) => {
    try{
        if(Device.sensor_reading > 70){
            if(Device.time_started_high_db==null){
                Device.time_started_high_db = new Date();
            }
        }else{
            Device.time_started_high_db = null;
        }
    } catch(e){
        console.log('ngik')
        console.log(e)
    }
}
