var Promise = require('bluebird'),
    request = Promise.promisifyAll( require('superagent')),
    customParser = require('./utils/fmsXML2jsparser'),
    qs = require('qs'),
    FileMakerError = require('./FileMakerError');




//add promises to superAgent
require('./utils/superagentPromise');




/**
 * FileMaker Server Request Object
 *
 * used to extend the filemaker objects. ( using _.extend )
 * smells tightly coupled to me. Other object must implement several methods.
 * This is not obvious...  but it is working
 *
 * @type {{url: Function, queryObject: Function, auth: Function, getUser: Function, getPassword: Function, send: Function}}
 */
var fmRequest = {

    /**
     * saves the credentials to use for any requests
     * @param user
     * @param password
     * @returns {fmRequest}
     */
    auth : function (user, password){
        this.user = user;
        this.password = password;
        return this
    },

    /**
     * send the request off to the server.
     * if no callback is specified it returns a promise.
     *
     * @param {Function} [callback]
     * @returns {undefined|Promise}
     */
    send : function(callback){
        var url = this.url() + '/fmi/xml/fmresultset.xml';
        var q = this.queryObject();
        var user = this.getUser();
        var password = this.getPassword();

        var fullURL =  url+ "?" + qs.stringify(q);

        var promise = request.post(url)
            .accept('xml')
            .auth(user, password)
            .query(q)
            .parse(customParser)
            .promise();

        return promise
            .then(function(response){
                if (response.ok){
                    if(response.body.error != 0){
                        throw new FileMakerError(response.body.error, fullURL)
                    }
                    return response.body
                }else{
                    throw response.error
                }

            }).catch(function(e){
                if(e.status==401){
                    e['FileMaker_Hint'] = "This usually means that login failed. Check the user name and password";
                    e.username = user ;
                    e.password = password;
                }
                return new Promise.reject(e)
            }).nodeify(callback)
    }

}



module.exports = exports = fmRequest;

