fm = require('../'),
    config = require('./config.json'),


/*

   Setup the FileMaker Server for the tests

 */

before(function(done){

    global.fms = fm.
        fms(config.fms.url)
        .auth(config.fms.userName, config.fms.password);
    done()
});

