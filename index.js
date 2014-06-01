/**
 * Created by todd on 5/13/14.
 */


var Promise = require('bluebird'),
    request = Promise.promisifyAll( require('superagent')),
    customParser = require('./libs/fmsXML2jsparser'),
    FMQuery = require('./libs/FMQuery');


//add a .promise method to superagent
require('./libs/superagentPromise');



/**
 * FileMaker connector
 * @constructor
 */
function FileMaker() {}



FileMaker.prototype.init = function (options) {

    //if(!(this instanceof FileMaker) ) return new FileMaker(options);

    var re = new RegExp("^(http|https)://", "i");
    this.url = options.url.replace(re, '');

    this.protocol = options.protocol || "http";

    this.userName = options.userName || "Admin";
    this.password = options.password || '';

};

FileMaker.prototype.getBaseURL = function () {
    return this.protocol + "://" + this.userName + ":" + this.password + "@" + this.url + "/fmi/xml/fmresultset.xml"
};

FileMaker.prototype.getBaseURLnoAuth = function () {
    return this.protocol + "://" + this.url + "/fmi/xml/fmresultset.xml"
};

/**
 * sends a request to the FileMaker Server
 * @param queryObject
 * @param callback
 */
FileMaker.prototype.req = function (queryObject, callback) {

    var promise = request.post(this.getBaseURL())
        .accept('xml')
        .query(queryObject)
        .parse(customParser).promise()

    return promise
        .then(function(response){
            return response.body
        }).catch(function(e){
            return new Promise.reject(e)
        }).nodeify(callback)

}

FileMaker.prototype.getDatabases = function (callback) {

    var requestPromise =  this.req({'-dbnames': null})
    return requestPromise.nodeify(callback)

}

FileMaker.prototype.getDatabase = function (databaseName, callback) {

    // get a Promise here, by leaving out the callback
    // it will be applied later
    var requestPromise = this.getDatabases()

        .then(function(result){
            var db = result.data.filter(function (obj) {
                return obj.DATABASE_NAME == databaseName;
            })
            if(db.length == 0){

                throw new Error("Database Can't be Found")

            }else{
                return {
                    error : 0,
                    data : [db[0]]
                }
            }
        })

        return requestPromise.nodeify(callback); // apply the callback if requested.

};





module.exports = exports = new FileMaker();

