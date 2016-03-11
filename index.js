'use strict';

var _ = require('lodash');
var sleep = require('sleep');


/**
 * Stepper Motor Controller
 * @class
 * @param {Object} options - settings
 * @param {Object} options.gpio - node-arch-cubie-gpio object
 * @param {String} [options.IN1 ='PG3'] - gpio to IN1
 * @param {String} [options.IN2 ='PG1'] - gpio to IN2
 * @param {String} [options.IN3 ='PG6'] - gpio to IN3
 * @param {String} [options.IN4 ='PG8'] - gpio to IN4
 */
function stepper(options) {

    this.options = _.defaults(options, {'IN1': 'PG3'}, {'IN2': 'PG1'}, {'IN3': 'PG6'}, {'IN4': 'PG8'});

    if (_.isObject(this.options.gpio)) {
        this.gpio = this.options.gpio;
    } else {
        throw new Error('An object node-arch-cubie-gpio is required!');
    }

    this.stepsProRound = 256;

    this.fullStep = [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [1, 0, 0, 1]
    ];

    this.pins = [
        this.gpio.getPin(this.options.IN1),
        this.gpio.getPin(this.options.IN2),
        this.gpio.getPin(this.options.IN3),
        this.gpio.getPin(this.options.IN4)
    ];

    var self = this;

    _.forEach(this.pins, function (pin) {
        self.gpio.activatePin(pin, 'out');
    });


    /**
     * Run Motor By Round
     * @param {Number}round - number of round
     * @param {Number} direction - 0: anti-clockwise, 1: clockwise
     * @returns {void}
     */
    this.runByRound = function (round, direction) {

        var steps = round * this.stepsProRound;
        this.runByStep(steps, direction);
    };


    /**
     * Run Motor By Degree
     * @param {Number} degree - number of degree
     * @param {Number} direction - 0: anti-clockwise, 1: clockwise
     * @returns {void}
     */
    this.runByDegree = function (degree, direction) {

        var steps = degree / 360 * this.stepsProRound;
        this.runByStep(steps, direction);
    };

    this.runByStep = function (steps, direction) {
        var start = new Date();
        for (var i = 0; i < steps; i++) {
            this.runStep(direction);
        }
        var stop = new Date();
        var diff = stop.getTime() - start.getTime();
        console.log('duration: ' + diff / 1000 + ' seconds');
    };

    this.runStep = function (direction) {

        var pulses = this.fullStep
        if (direction === 1) {
            _.reverse(pulses);
        }

        for (var j = 0; j < pulses.length; j++) {
            this.generatePulse(pulses[j]);
        }


    };

    this.generatePulse = function (pulse) {
        for (var i = 0; i < this.pins.length; i++) {
            this.gpio.writeToPin(this.pins[i], _.toString(pulse[i]));
            sleep.usleep(900);
        }
    };

    this.stop = function () {
        for (var i = 0; i < 4; i++) {
            this.gpio.writeToPin(this.pins[i], '0');
        }
    };

}


module.exports = stepper;