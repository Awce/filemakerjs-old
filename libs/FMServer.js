

var authable        = require('./utils/authable'),
    FMDatabase      = require('./FMDatabase'),
    DBNames         = require('./commands/DBNames'),
    AdHocQuery      = require('./commands/AdHocCommand');

function FMServer(url){

    if (!(this instanceof FMServer)) {
        return new FMServer(url);
    }

    var _url = url;
    this.getURL = function () {
        return _url;
    }

}

//mixins
authable(FMServer);

FMServer.prototype.db = function(name){
    var db =  new FMDatabase(name);
    db.setParent(this);
    return db
};

FMServer.prototype.dbNames = function(){
    var command = new DBNames();
    command.setParent(this);
    return command
};

FMServer.prototype.query = function(object){
    var query = new AdHocQuery(object);
    query.setParent(this);
    return query
}


module.exports = FMServer;




/*

 may want some of this logic later.

 var re = new RegExp("^(http|https)://", "i");
 this.url = options.url.replace(re, '');

 this.protocol = options.protocol || "http";

 this.userName = options.userName || "Admin";
 this.password = options.password || '';
 */