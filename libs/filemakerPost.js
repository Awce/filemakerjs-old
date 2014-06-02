

var Promise = require('bluebird'),
    request = Promise.promisifyAll( require('superagent')),
    customParser = require('./fmsXML2jsparser'),
    qs = require('qs'),

    FileMakerError = require('./FileMakerError')

//add promises to superAgent
require('./superagentPromise');


var post = function(url, username, pwd, queryObject, callback){

    var fullURL =  url+ "?" + qs.stringify(queryObject);
    var promise = request.post(url)
        .accept('xml')
        .auth(username, pwd)
        .query(queryObject)
        .parse(customParser).promise();

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
                e.username = username ;
                e.password = pwd;
            }
            return new Promise.reject(e)
        }).nodeify(callback)
};


module.exports = post