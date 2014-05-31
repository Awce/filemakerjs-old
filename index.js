/**
 * Created by todd on 5/13/14.
 */


var request = require('superagent');
var customParser = require('./libs/fmsXML2jsparser');
var qs = require('qs');


/**
 * FileMaker connector
 * @constructor
 */
function FileMaker() {
}

FileMaker.prototype.init = function (options) {

    //if(!(this instanceof FileMaker) ) return new FileMaker(options);

    var re = new RegExp("^(http|https)://", "i");
    this.url = options.url.replace(re, '');

    this.protocol = options.protocol || "http";

    this.userName = options.userName || "Admin";
    this.password = options.password || '';

    this.getBaseURL = function () {
        return this.protocol + "://" + this.userName + ":" + this.password + "@" + this.url + "/fmi/xml/fmresultset.xml"
    }


}
/**
 * sends a request to the FileMaker Server
 * @param queryObject
 * @param callback
 */
FileMaker.prototype.req = function (queryObject, callback) {
    request
        .post(this.getBaseURL())
        .accept('xml')
        .query(queryObject)
        .parse(customParser)
        .end(function (err, response) {
            if (err) {
                callback(err)
            } else {
                callback(null, response.body)
            }
        })
}


FileMaker.prototype.getDatabases = function (callback) {

    this.req({'-dbnames': null}, callback)

}

FileMaker.prototype.getDatabase = function (databaseName, callback) {

    this.getDatabases(function (err, result) {


        if (err) {
            callback(err);
        } else {
            var db = result.data.filter(function (obj) {
                return obj.DATABASE_NAME == databaseName;
            })

            if(db == undefined){
                callback(new Error("Database name not vaild"))
            }else{
                callback(null, {
                    error : 0,
                    data : [db[0]]
                })
            }
        }
    })
};


module.exports = exports = new FileMaker();
