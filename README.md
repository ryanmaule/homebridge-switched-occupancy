## Homebridge Switched Occupance

Can be used to trigger a occupancy detected event when a switch is turned on, via Siri for example.

#### Setup

`npm install -g homebridge-switched-occupancy`

And add the following to the accessories list in your Homebridge config. Change names as you wish.

```
{
  "accessory": "Occupancy Switch",
  "occupancy_sensor_name": "Occupancy Sensor",
  "switch_name": "Occupancy Switch",
  "name": "Occupancy Switch"
}
```

Unlike the homebridge-occupancy-switch plugin, there is no automatic reset.  The occupancy sensor will remain sync'd to the switch.
