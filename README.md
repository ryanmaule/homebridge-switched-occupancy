## Homebridge Occupancy Switch

Can be used to trigger a occupancy detected event when a switch is turned on, via Siri for example.

#### Setup

`npm install -g homebridge-occupancy-switch`

And add the following to the accessories list in your Homebridge config. Change names as you wish.

```
{
  "accessory": "Occupancy Switch",
  "motion_sensor_name": "Occupancy Sensor",
  "switch_name": "Occupancyn Switch",
  "name": "Occupancy Switch"
}
```

Then add it to HomeKit, once added, you will need to turn on Notifications for the Occupancy sensor you just added.
