fm = require('../'),
    config = require('./config.json'),


/*

   Setup the FileMaker Server for the tests

 */

before(function(done){

    global.fms = fm.
        fms(config.fms.url)
        .auth(config.fms.userName, config.fms.password);


    //get a query going based on a layout
    var query = fms.db(config.testData.dbName).layout(config.testData.layout);
    var records = config.testData.records;

    //run a script on the server
    query.script('resetTest').findAny().send()

        // then create new records in order

        .then(function (result) {
            return query.new(records[0]).send()
        })
        .then(function (result) {
            return query.new(records[1]).send()
        })
        .then(function (result) {
            return query.new(records[2]).send()
        })
        .then(function (result) {
            return query.new(records[3]).send()
        })
        .then(function (result) {
            return query.new(records[4]).send()
        })
        .then(function () {
            done()
        })




});
