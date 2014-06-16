
var request         = require('superagent'),
    customParser    = require('./fmsXML2jsparser'),
    qs              = require('qs'),
    FileMakerError  = require('../FileMakerError'),
    Promise         = require('bluebird');

//add promises to superAgent
require('./superagentPromise');


/**
 * adds the ability to send a request to a FilerMaker server and parse the result to an object.
 * @param obj
 */
function sendable(obj){

    obj.prototype.send = function (callback) {

        // these are provided by the object that sendable gets mixed into
        var url     = this.getURL(),
            q       = this.queryObject(),
            user    = this.getUser();



        var userName    = user.name,
            password    = user.password,
            fullURL     = url + "?" + qs.stringify(q);


        var promise     = request
            .post(url)
            .accept('xml')
            .auth(userName, password)
            .query(q)
            .parse(customParser)
            .promise();

        return promise
            .then(function (response) {
                if (response.ok) {
                    if (response.body.error != 0) {
                        throw new FileMakerError(response.body.error, fullURL)
                    }
                    return response.body
                } else {
                    throw response.error
                }

            }).catch(function (e) {
                if (e.status == 401) {
                    e['FileMaker_Hint'] = "This usually means that login failed. Check the user name and password";
                    e.username = user;
                    e.password = password;
                }
                return new Promise.reject(e)
            }).nodeify(callback)

    };

}

module.exports = sendable;