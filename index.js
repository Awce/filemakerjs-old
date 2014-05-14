/**
 * Created by todd on 5/13/14.
 */


var request = require('superagent');
var customParser = require('./libs/fmsXML2jsparser');
var qs = require('qs');


module.exports = FileMaker;


function FileMaker(options){

    if(!(this instanceof FileMaker) ) return new FileMaker(options)
    this.url = options.url;
    this.userName = options.userName || "Admin";
    this.password = options.password || '';

    this.getBaseURL = function(){
        return this.url +'/fmi/xml/fmresultset.xml'
    }
}


FileMaker.prototype.getInfo = function(){
    request
        .post(this.url +'/fmi/xml/fmresultset.xml?-db=FMServer_Sample&-lay=PHP Technology Test&-findall=')
        .accept('xml')
        .parse(customParser)
        .end(function(err, res){
            console.log(res.body)
        })
}


FileMaker.prototype.req = function(object){

    request
        .post(this.getBaseURL())
        .auth()
        .accept('xml')
        .query(object)
        .parse(customParser)
        .end(function(err, res){
            console.log(res.body);
        })
}

function FMQuery(FM){
    this.queryParams = {};
    this.FM = FM
}

FMQuery.prototype.db =  function(dbname){
    this.queryParams['-db'] = dbname
    return this
}
FMQuery.prototype.lay =  function(layoutName){
    this.queryParams['-lay']= layoutName
    return this
}

FMQuery.prototype.findAll =  function(){
    this.queryParams['-findall'] = null
    this.FM.req(this.queryParams);
}



FMQuery.prototype.getURL = function(){
    return this.FM.getBaseURL() +"?" + qs.stringify(this.queryParams)
}

FMQuery.prototype.dbnames = function(){
    this.queryParams['-dbnames'] = null
    this.FM.req(this.queryParams);
}


FileMaker.prototype.query =  function(){
    return new FMQuery(this)
};

