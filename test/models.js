
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    fm = require('../'),
    config = require('./config.json'),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('Models', function(){

    describe('Callback Flow', function(){

        describe("getDataBases(callback)", function(){

            it('expects to get a object back with an error property = 0', function(done){

                fm.getDatabases( function (err, object){
                    expect(object).to.be.an('object')
                        .that.has.property('error')
                        .that.equals(0);

                    done(err)

                });
            });

            it('expects to have an array of objects with a property "DATABASE_NAME"', function(done){

                fm.getDatabases( function (err, object){
                    var record = object.data[0];
                    expect(record).to.have.property('DATABASE_NAME');
                    done(err);

                });
            });
        });



        describe('getDataBase(databaseName, callback)', function(){

            it('callback expects an object with DATABASE_NAME=databaseName ', function(done){

                fm.getDatabase(config.testData.dbName, function(err, body){
                    var dbName = body.data[0].DATABASE_NAME;

                    expect(dbName).to.equal(config.testData.dbName );

                    done(err);
                });
            });

            it('callback expects an err when given a bad name ', function(done){

                fm.getDatabase("WRONG", function(err, body){
                    expect(err).to.be.an.instanceOf(Error);
                    done()

                });
            });
        });


    });


    describe("Promise Flow", function(){


        describe('getDataBases()' , function(){
            it('should get a promise with an array named "data"', function(){
                var dbNamesPromise =  fm.getDatabases()
                    .then(function(body){
                        return body.data
                    });

                return dbNamesPromise.should.eventually.be.an('array');
            })

        });
        describe('getDataBase(databaseName)', function(){
            it('expects a promise for an object with DATABASE_NAME=databaseName', function(){

                var dbNamePromise = fm.getDatabase(config.testData.dbName)
                    .then(function(body){
                        return body.data[0].DATABASE_NAME
                    });

                return (dbNamePromise).should.eventually.equal(config.testData.dbName)
            });

            it('expects to be rejected when giving a bad dbName', function(){

                var dbNamePromise = fm.getDatabase("WRONG DBNAME");

                return dbNamePromise.should.eventually.be.rejected


            });
        });



    });


})

