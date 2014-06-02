var chai = require('chai'),
    should = chai.should(),
    fm = require('../'),
    config = require('./config.json'),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);


describe('Layout Functions - Callbacks', function () {

    var layout;
    before(function (done) {
        layout = fms.db( config.testData.dbName ).layout( config.testData.layout )
        done()
    });

    describe('#findAll()', function () {
        it('should receive an object with a property "data" that is an array', function (done) {

            layout.findAll().send(callback);

            function callback(err, body){
                body.should.be.an('object')
                    .that.has.a.property('data')
                    .that.is.an('array')
                done()
            }


        })

        it('should contain an array of objects that have a property "recordid"', function (done) {

            layout.findAll().send(callback);

            function callback(err, body){

                var firstDataObject = body.data[0]
                firstDataObject.should.be.an('object')
                    .with.a.property('recordid');
                done()
            }


        })

    })
})