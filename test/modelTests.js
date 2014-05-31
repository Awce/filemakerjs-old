
var chai = require('chai'),
    expect = chai.expect,
    fm = require('../'),
    config = require('./config.json');



describe('FileMakerjs Models', function(){

    describe("getDataBases", function(){

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

    describe('getDataBase(databaseName)', function(){

        it('expects to return an object with DATABASE_NAME=databaseName ', function(done){

            fm.getDatabase(config.testData.dbName, function(err, body){
                expect(body.data[0].DATABASE_NAME).equal(config.testData.dbName )
                done();
            });
        });
    });


});