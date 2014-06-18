var chai = require('chai'),
    should = chai.should(),
    FMServer = require('../index').Server;


describe.only('FMServer', function () {

    describe('#constructor' , function () {
        it('should get back an instance even when forgetting new' , function () {
            var fmServer = FMServer();
            fmServer.should.be.an.instanceOf(FMServer);
        })
    });

    describe('#getURL()', function () {
        it('should get back the correct url', function () {
            var url = "http://www.google.com";
            var fmServer = new FMServer(url);
            fmServer.getURL().should.equal(url);
        });

    });

    describe('#auth()', function () {
        it('should return the Server', function(){
            var fmServer = new FMServer();
            var authedServer = fmServer.auth('admin', 'password');
            authedServer.should.be.an.instanceOf(FMServer);
        });
    });

    describe('#getUser()', function () {
        it('should set the user name correctly', function(){
            var fmServer = new FMServer();
            var userName = fmServer.auth('admin', 'password').getUser().name;

            userName.should.equal("admin")
        });
    });

    describe('#dbNames(callback)', function(){
        it( 'should receive an object with a data array with at least 1 item' , function(done){

            fms.dbNames().send(callback);

            function callback(err, body){

                body.should.be.an('object')
                    .with.property('data')
                    .that.has.length.of.at.least(1)

                done()
            }
        })
    })

    describe('#dbNames()', function(){
        it( 'should resolve to an object with a data array with a length of at least 1' , function(){

            var promiseOfDBNames = fms.dbNames().send();

            return promiseOfDBNames.should.eventually.be.an('object')
                .that.has.property('data')
                .that.has.length.of.at.least(1);
        })
    })

    describe('#query({"-db": "TestDB", "-layoutnames":null})', function () {
        it('should return an array', function (done) {
            fms.query({'-db': "TestDB", '-layoutnames':null}).send(function(err, result){
                result.data.should.be.an('Array')
                done()
            })
        })
    })


});