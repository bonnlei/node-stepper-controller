'use strict';

var Stepper = require('../index');
var GPIO = require('node-arch-cubie-gpio');
var gpio = new GPIO({});
var stepper = new Stepper({gpio: gpio});
require('should');

describe('Stepper', function () {


    it('run by round', function () {

        console.log('start: run 1/4 round');

        stepper.options.IN1.should.be.equal('PG3');
        stepper.runByRound(1 / 4, 1);

        console.log('end: run 1/4 round');

    });

    it('run by degree', function () {

        console.log('start: run 90 degree');

        stepper.options.IN1.should.be.equal('PG3');
        stepper.runByDegree(90, 0);

        console.log('start: run 90 degree');

    });

});