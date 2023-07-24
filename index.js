var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-occupancy-switch", "Occupancy Switch", OccupancySwitchAccessory);
}

function OccupancySwitchAccessory(log, config) {
  this.log = log;
  this.occupancySensorName = config["occupancy_sensor_name"];
  this.switchName = config["switch_name"];
  this.switchState = false;
  this.occupancySensorState = false;

  this.occupancySensorService = new Service.OccupancySensor(this.occupancySensorName);
  this.occupancySensorService
    .getCharacteristic(Characteristic.OccupancyDetected)
    .on('get', this.getOccupancySensorState.bind(this));

  this.switchService = new Service.Switch(this.switchName);
  this.switchService
    .getCharacteristic(Characteristic.On)
    .on('get', this.getSwitchState.bind(this))
    .on('set', this.setSwitchState.bind(this));
}

OccupancySwitchAccessory.prototype.getOccupancySensorState = function(callback) {
  callback(null, this.occupancySensorState)
}

OccupancySwitchAccessory.prototype.getSwitchState = function(callback) {
  callback(null, this.switchState)
}

OccupancySwitchAccessory.prototype.setSwitchState = function(state, callback) {
  this.switchState = state

  // When we turn this on, we also want to turn on the occupancy sensor
  this.trigger()
  callback(null);
}

OccupancySwitchAccessory.prototype.trigger = function() {
  if (this.switchState) {
    this.occupancySensorState = 1;
    this.occupancySensorService.setCharacteristic(Characteristic.OccupancyDetected, Boolean(this.occupancySensorState));
  }
}

OccupancySwitchAccessory.prototype.getServices = function() {
  return [this.occupancySensorService, this.switchService];
}
