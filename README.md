# node-stepper-controller

## Environment

+ Cubieboard 2 (A20)
+ ArchLinux
+ NodeJS v5.7.*
+ Stepper motor 28BYJ-48
+ Motor Driver ULN2003

## Defaults

1. Registered pins list: /sys/kernel/debug/pinctrl/1c20800.pinctrl/pins
2. Links between motor driver and Cubieboad:
    * PG3 => IN1
    * PG1 => IN2
    * PG4 => IN3
    * PG6 => IN4
    

## References

+ [28BYJ-48 Stepper Motor and ULN2003 Driver Intro (Youtube)](https://www.youtube.com/watch?v=B86nqDRskVU)
+ [Control stepper motors with Raspberry Pi and node.js](http://www.sundh.com/blog/2014/02/control-stepper-motors-with-raspberry-pi-and-node-js/)