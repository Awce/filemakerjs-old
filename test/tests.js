

var config = require('./config.json'),
    chai = require('chai'),
    expect = chai.expect,
    fm = require('../')


before(function(){
    fm.init(config.fms);
})

describe("FileMakerJS", function(){



    describe('getBaseURL()', function(){
        it('expects to contain the correct url', function(){
            var url = config.fms.url;
            expect( fm.getBaseURL()).to.contain(url);
        })
    })


})