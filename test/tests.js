

var config = require('./config.json'),
    chai = require('chai'),
    expect = chai.expect,
    FileMaker = require('../')


var fm

before(function(){
    fm  = new FileMaker(config.fms);
})

describe("FileMakerJS", function(){



    describe('getBaseURL()', function(){
        it('expects to contain the correct url', function(){
            var url = config.fms.url;
            expect( fm.getBaseURL()).to.contain(url);
        })
    })

    describe('req({-dbnames : null}) ', function(){
        var options = {
            "-dbnames" : null
        };


        it('it expects to get a statusCode of 200', function(done){

            function callback(response){

                expect(response).to.have.property('statusCode')
                    .that.equals(200);
                done();
            }

            fm.req(options, callback);
        })

        it('expects to get an object with an error property equal to 0', function(done){
            function callback(response){
                var json = response.body
                expect(json).to.be.a('object')
                    .that.has.property('error')
                    .that.equals(0)
                done();
            }
            fm.req(options, callback);

        });

        it("expects to get a object with a 'count' of at least '0'", function(done) {
            function callback(response) {
                var count = response.body.count
                expect(count).to.be.at.least(0);
                done();
            }

            fm.req(options, callback);
        })

        it("expects to get a object with DATABASE_NAME property on the first itme of a 'data' array", function(done) {
            function callback(response) {
                var record = response.body.data[0]
                expect(record).to.have.property('DATABASE_NAME');
                done();
            }

            fm.req(options, callback);
        })

    })

    describe('req({-wrong : null}) ', function(){
        it( 'expects to get an error of 4' , function(done){

            var badOptions = {
                "-wrong" : null
            }

            function callback(response){
                var json = response.body
                expect(json).to.be.a('object')
                    .that.has.property('error')
                    .that.equals(4);
                done();
            }

            fm.req(badOptions, callback);

        } )
    })

    describe("req() get layouts", function(){
        var options = {
            "-db" : "FMServer_Sample",
            "-layoutnames" : null
        }

        it('expects to get back a array with more than 0 elements', function(done){
            function callback(response){
                var collection = response.body.data
                expect(collection).to.be.a('array')
                    .that.has.length.above(0)
                done();
            }
            fm.req(options, callback);
        })

        it("expects to get a record with a 'LAYOUT_NAME' field ", function(done){
            function callback(response){

                var record = response.body.data[0];
                expect(record).to.have.property('LAYOUT_NAME');
                done();
            }
            fm.req(options, callback);
        })

        describe("req() get scripts", function() {
            var options = {
                "-db": "FMServer_Sample",
                "-scriptnames": null
            }

            it('expects to get back a array with more than 0 elements', function (done) {
                function callback(response) {
                    var collection = response.body.data
                    expect(collection).to.be.a('array')
                        .that.has.length.above(0)
                    done();
                }

                fm.req(options, callback);
            })

            it("expects to get a record with a 'LAYOUT_NAME' field ", function (done) {
                function callback(response) {

                    var record = response.body.data[0];
                    expect(record).to.have.property('SCRIPT_NAME');
                    done();
                }

                fm.req(options, callback);
            })
        })
    })

})