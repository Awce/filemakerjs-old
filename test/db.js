
var chai = require('chai'),
    should = chai.should(),
    fm = require('../'),
    config = require('./config.json'),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);



describe('Database Functions Callback Flow', function(){

    describe('fms', function(){

        var db
        before(function(done){
            db = fms.db(config.testData.dbName);
            done()
        });

        describe('#dbNames()', function(){
            it( 'it should receive an object with a data array with at least 1 item' , function(done){

                fms.dbNames().send(callback);

                function callback(err, body){

                    body.should.be.an('object')
                        .with.property('data')
                        .that.has.length.of.at.least(1)

                    done()
                }
            })
        })

        describe('#layoutNames()', function () {


            it('it should receive an object with a data array with a length of at least 1', function (done) {

                db.layoutNames().send(callback);

                function callback(err, body){
                    body.should.be.an('object')
                        .with.property('data')
                        .that.has.length.of.at.least(1);
                    done()
                }

            })
        })

        describe('#scriptNames()', function () {


            it('it should receive an object with a data array with a length of at least 1', function (done) {

                db.scriptNames().send(callback);

                function callback(err, body){

                    body.should.be.an('object')
                        .with.property('data')
                        .that.has.length.of.at.least(1);

                    done()
                }

            });

            it('it should receive an error with status 401 when given bad credentials', function (done) {

                db.scriptNames().auth("bad", "credentials").send(callback);

                function callback(err, body){

                    err.should.be.an.instanceOf(Error)
                    err.should.have.property('status').that.equals(401)

                    done()
                }

            })

        })

    })
});

describe('Database Functions With Promises', function(){

    describe('fms', function(){

        var db
        before(function(done){
            db = fms.db(config.testData.dbName);
            done()
        });



        describe('#layoutNames()', function () {


            it('it should eventually be an object with a data array with a length of at least 1', function () {

                var promiseOfLayoutNames = db.layoutNames().send();

                return promiseOfLayoutNames.should.eventually.be.an('object')
                    .that.has.property('data')
                    .that.has.length.of.at.least(1);


            })
        })

        describe('#scriptNames()', function () {


            it('it should eventually be an object with a data array with a length of at least 1', function () {

                var promiseOfScriptNames = db.scriptNames().send();

                return promiseOfScriptNames.should.eventually.be.an('object')
                    .that.has.property('data')
                    .that.has.length.of.at.least(1);
            });

            it('it should be rejected when given bad credentials', function () {

                var promiseOfScriptNames = db.scriptNames().auth("bad", "credentials").send();

                return promiseOfScriptNames.should.eventually.be.rejectedWith(Error)

            });

            it('it should be rejected with a status of 401 when given bad credentials', function () {

                var promiseOfScriptNames = db.scriptNames().auth("bad", "credentials").send();

                return promiseOfScriptNames.catch(function(err){
                    return err instanceof Error && err.status === 401
                })

            })

        })

    })
});