"use strict";


var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    XMLGrammers = require('../').XMLGrammers,
    Parameters = require('../').Parameters;

describe('FMServerConstants', function(){
    describe('XMLGrammers', function(){
        it('should be frozen', function(){
            expect(function(){
                XMLGrammers.a = 1;
            }).to.throw("Can't add property a, object is not extensible");

        });


    });


    describe('Parameters', function() {
        it('should be frozen', function () {

            expect(function () {
                Parameters.a = 1;
            }).to.throw("Can't add property a, object is not extensible");

        })
    })
})
