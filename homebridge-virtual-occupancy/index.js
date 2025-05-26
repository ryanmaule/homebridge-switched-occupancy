var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-virtual-occupancy", "VirtualOccupancy", VirtualOccupancyAccessory);
}

function VirtualOccupancyAccessory(log, config) {
  this.log = log;
  this.name = config["name"] || "Virtual Occupancy"; // Default name if not provided
  this.switchState = false;
  this.occupancySensorState = false; // Initial state is no occupancy

  // Create the Occupancy Sensor service
  this.occupancySensorService = new Service.OccupancySensor(this.name);
  this.occupancySensorService
    .getCharacteristic(Characteristic.OccupancyDetected)
    .on('get', this.getOccupancySensorState.bind(this));

  // Create the Switch service
  this.switchService = new Service.Switch(this.name); // You might want a different name for the switch itself, e.g., this.name + " Switch"
  this.switchService
    .getCharacteristic(Characteristic.On)
    .on('get', this.getSwitchState.bind(this))
    .on('set', this.setSwitchState.bind(this));
  
  // Set initial states
  this.switchService.setCharacteristic(Characteristic.On, this.switchState);
  this.occupancySensorService.setCharacteristic(Characteristic.OccupancyDetected, this.occupancySensorState);
}

VirtualOccupancyAccessory.prototype.getOccupancySensorState = function(callback) {
  this.log.debug("Getting occupancy state: %s", this.occupancySensorState ? "OCCUPANCY_DETECTED" : "OCCUPANCY_NOT_DETECTED");
  callback(null, this.occupancySensorState ? Characteristic.OccupancyDetected.OCCUPANCY_DETECTED : Characteristic.OccupancyDetected.OCCUPANCY_NOT_DETECTED);
}

VirtualOccupancyAccessory.prototype.getSwitchState = function(callback) {
  this.log.debug("Getting switch state: %s", this.switchState ? "ON" : "OFF");
  callback(null, this.switchState);
}

VirtualOccupancyAccessory.prototype.setSwitchState = function(state, callback) {
  this.switchState = state;
  this.log.info("Switch state set to: %s", this.switchState ? "ON" : "OFF");

  // When the switch changes, update the occupancy sensor state
  this.occupancySensorState = this.switchState;
  this.log.info("Occupancy sensor state updated to: %s", this.occupancySensorState ? "OCCUPANCY_DETECTED" : "OCCUPANCY_NOT_DETECTED");
  this.occupancySensorService.getCharacteristic(Characteristic.OccupancyDetected).updateValue(this.occupancySensorState ? Characteristic.OccupancyDetected.OCCUPANCY_DETECTED : Characteristic.OccupancyDetected.OCCUPANCY_NOT_DETECTED);
  
  callback(null);
}

VirtualOccupancyAccessory.prototype.getServices = function() {
  return [this.occupancySensorService, this.switchService];
}
