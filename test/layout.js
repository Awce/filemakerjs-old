var chai = require('chai'),
    config = require('./config.json'),
    chaiAsPromised = require("chai-as-promised");

var should = chai.should()
chai.use(chaiAsPromised);

describe('Layout Functions - Callbacks', function () {

    var layout;
    before(function (done) {
        layout = fms.db( config.testData.dbName ).layout( config.testData.layout );
        done();
    });

    describe('#findAll()', function () {
        it('should receive an object with a property "data" that is an array', function (done) {

            layout.findAll().send(callback);
            function callback(err, body){
                body.should.be.an('object')
                    .that.has.a.property('data')
                    .that.is.an('array');
                done()
            }

        });

        it('should contain an array of objects that have a property "recordid"', function (done) {

            layout.findAll().send(callback);
            function callback(err, body){
                var firstDataObject = body.data[0];
                firstDataObject.should.be.an('object')
                    .with.a.property('recordid');
                done()
            }

        });

        it('should contain an array with 2 items when using skip and max', function (done) {

            var testFirstName = config.testData.records[2].FirstName

            layout.findAll().max(2).skip(2).send(callback)
            function callback(err, body){

                var array = body.data;
                array.should.have.a.lengthOf(2);

                array[0]['FirstName'].should.equal(testFirstName);
                done();
            }

        })

    })

    describe('#findAny()', function () {
        it( 'should receive a object with a array property "data" that has a length of 1 ', function (done) {

            layout.findAny().max().skip().send(callback);

            function callback(err, body){

                var records = body.data;
                body.should.be.an('object');
                records.should.have.a.lengthOf(1)
                done()
            }
        } )
    });

    describe('#script()', function () {
        it('should receive an error when give a valid script name' , function (done) {
            layout.findAny().script(config.testData.script).send(callback)

            function callback(err, body){
                body.should.be.an('object');
                should.not.exist(err)
                done()
            }
        })
    });

    describe('#new({data})', function () {
        it('should return a single record', function (done) {
            var data = {firstName : 'test', city: 'Newbury Park'}

            layout.new(data).send(callback);

            function callback(err, result){
                var records = result.data;
                var record = records[0];
                var firstName = record.FirstName

                records.should.have.a.lengthOf(1)
                firstName.should.equal(data.firstName)
                done()
            }

        });


    });


    describe('#new().setField(field,value)', function () {
        it('should return an error of 0', function (done) {

            layout
                .new()
                .setField("FirstName", "Freddie" )
                .setField('State', "CA")
                .send(callback);

            function callback(err, result){
                var error = result.error;
                error.should.equal(0)
                done()
            }

        });
    });


    describe( "#delete(recordID)", function () {
        it('should recieve an error value of 0', function (done) {

            layout.findAny().send(function(err, result){
                var recordID = result.data[0].recordid
                layout.delete(recordID).send(callback)
                function callback(err, result){
                    result.error.should.equal(0)
                    done()
                }

            })


        })
    })

});