'use strict';

var Stepper = require('../index');
require('should');
var sinon = require('sinon');
var GPIO = require('node-arch-cubie-gpio');
var gpio, gpioWriter, gpioActivator;


describe('Stepper', function () {

    beforeEach(function () {
        var settings = {pinsFilename: __dirname + '/fixture/pins'};
        gpio = new GPIO(settings);

        gpioWriter = sinon.spy(gpio, 'write');
        gpioActivator = sinon.spy(gpio, 'activatePinsOutput');
    });

    afterEach(function () {
        gpio.write.restore();
        gpio.activatePinsOutput.restore();
    });

    it('run by round', function () {

        var stepper = new Stepper({gpio: gpio});
        stepper.options.IN1.should.be.equal('PG3');

        stepper.runByRound(1 / 4, 1);

        gpioActivator.callCount.should.be.equal(1);
        gpioWriter.callCount.should.be.equal(1 / 4 * stepper.stepsProRound * 8 * stepper.pins.length);
        gpioWriter.args[0][0].should.be.equal('PG3');
        gpioWriter.args[0][1].should.be.equal('1');
        gpioWriter.args[1][0].should.be.equal('PG1');
        gpioWriter.args[1][1].should.be.equal('0');
    });

    it('run by degree', function () {

        var stepper = new Stepper({gpio: gpio});
        stepper.options.IN1.should.be.equal('PG3');

        stepper.runByDegree(90, 1);

        gpioActivator.callCount.should.be.equal(1);
        gpioWriter.callCount.should.be.equal(1 / 4 * stepper.stepsProRound * 8 * stepper.pins.length);
        gpioWriter.args[0][0].should.be.equal('PG3');
        gpioWriter.args[0][1].should.be.equal('1');
        gpioWriter.args[1][0].should.be.equal('PG1');
        gpioWriter.args[1][1].should.be.equal('0');
    });

});