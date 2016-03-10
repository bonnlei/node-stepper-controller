'use strict';

var Stepper = require('../index');
var GPIO = require('node-arch-cubie-gpio');
var gpio = new GPIO({});
var stepper = new Stepper({gpio: gpio});
var step = require('mocha-steps');


describe('Stepper', function () {


    step('run by round', function () {

        console.log('start: run 1/4 round');

        stepper.options.IN1.should.be.equal('PG3');
        stepper.runByRound(1 / 4, 1);

        console.log('end: run 1/4 round');

    });

    step('run by degree', function () {

        console.log('start: run 90 degree');

        stepper.options.IN1.should.be.equal('PG3');
        stepper.runByDegree(90, 1);

        console.log('start: run 90 degree');
        

    });

});