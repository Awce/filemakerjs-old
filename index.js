/**
 * Created by todd on 5/13/14.
 */


var request = require('superagent');
var customParser = require('./libs/fmsXML2jsparser');
var qs = require('qs');


module.exports = FileMaker;


function FileMaker(options){

    if(!(this instanceof FileMaker) ) return new FileMaker(options);

    var re = new RegExp("^(http|https)://", "i");
    this.url = options.url.replace(re , '');

    this.protocol = options.protocol || "http";

    this.userName = options.userName || "Admin";
    this.password = options.password || '';

    this.getBaseURL = function(){
        return this.protocol + "://"+ this.userName + ":" + this.password + "@" + this.url +"/fmi/xml/fmresultset.xml"
    }
}


FileMaker.prototype.req = function(object, cb){
    request
        .post(this.getBaseURL())
        .accept('xml')
        .query(object)
        .parse(customParser)
        .end(cb)
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
    return this
}



FMQuery.prototype.getURL = function(){
    return this.FM.getBaseURL() +"?" + qs.stringify(this.queryParams)
}

FMQuery.prototype.dbnames = function(){
    this.queryParams['-dbnames'] = null
    return this
}

FMQuery.prototype.layoutnames = function(){
    this.queryParams['-layoutnames'] = null
    return this
}

FMQuery.prototype.end = function(){
    this.FM.req(this.queryParams);
}







FileMaker.prototype.query =  function(){
    return new FMQuery(this)
};

