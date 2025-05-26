# Homebridge Virtual Occupancy

This is a Homebridge plugin that provides a virtual occupancy sensor whose state is controlled by a switch. When the switch is turned ON, the occupancy sensor detects occupancy. When the switch is OFF, the occupancy sensor stops detecting occupancy.

This plugin allows you to manually control an occupancy sensor for various HomeKit automations. It is a simplified version inspired by other occupancy switch plugins but without any automatic timers – the state is solely dependent on the switch.

## Installation

1. Install Homebridge using the official instructions.
2. Install this plugin globally using npm:
   ```sh
   sudo npm install -g homebridge-virtual-occupancy
   ```
3. Update your Homebridge `config.json` file. See the example below.

## Configuration

Add the following accessory definition to your Homebridge `config.json` file within the `accessories` array:

```json
{
  "accessory": "VirtualOccupancy",
  "name": "My Virtual Occupancy Sensor"
}
```

**Fields:**

*   `accessory` (required): Must be `"VirtualOccupancy"`.
*   `name` (required): The name you want to use for the occupancy sensor and switch in HomeKit (e.g., "Living Room Virtual Occupancy").

## How it Works

This plugin creates a single HomeKit accessory that exposes two services:
*   An **Occupancy Sensor** service.
*   A **Switch** service.

When you toggle the Switch ON, the Occupancy Sensor will report "Occupancy Detected".
When you toggle the Switch OFF, the Occupancy Sensor will report "Occupancy Not Detected".

There are no timers or automatic changes. The occupancy status mirrors the switch status directly.

## Development

This plugin was created to provide a simple, manual way to control a virtual occupancy sensor. It is based on the structure of typical Homebridge plugins.

If you are forking or modifying this, remember that the plugin name used for registration in `index.js` is `"homebridge-virtual-occupancy"` and the accessory identifier is `"VirtualOccupancy"`.

---

This plugin was inspired by the `homebridge-occupancy-switch` plugin but is a fresh implementation with different (manual) behavior.
