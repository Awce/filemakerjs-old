fm = require('../'),
    config = require('./config.json'),


/*

   Setup the FileMaker Server for the tests

 */

before(function(done){

    global.fms = fm.
        fms(config.fms.url)
        .auth(config.fms.userName, config.fms.password);


    //get a layout
    var layout = fms.db(config.testData.dbName).layout(config.testData.layout);
    var records = config.testData.records;

    //run a script on the server
    layout.script('resetTest').findAny().send()

        // then create new records in order

        .then(function (result) {
            return layout.newRecord(records[0]).send()
        })
        .then(function (result) {
            return layout.newRecord(records[1]).send()
        })
        .then(function (result) {
            return layout.newRecord(records[2]).send()
        })
        .then(function (result) {
            return layout.newRecord(records[3]).send()
        })
        .then(function (result) {
            return layout.newRecord(records[4]).send()
        })
        .then(function () {
            done()
        })




});
