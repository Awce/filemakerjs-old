

var authable        = require('./utils/authable'),
    parentable      = require('./utils/parentable'),
    ScriptNames     = require('./commands/ScriptNames'),
    LayoutNames     = require('./commands/LayoutNames');
    FMLayout        = require('./FMLayout');

function FMDatabase( name){
    this.name = name
}

//mixins
authable( FMDatabase );
parentable(FMDatabase);

FMDatabase.prototype.getURL = function () {
    return this.getParent().getURL()
};

FMDatabase.prototype.queryObject = function () {
    return {
        '-db': this.name
    }
};

FMDatabase.prototype.scriptNames =function(){
    var command = new ScriptNames();
    command.setParent(this);
    return command;
};

FMDatabase.prototype.layoutNames =function(){
    var command = new LayoutNames();
    command.setParent(this);
    return command;
};

FMDatabase.prototype.layout =function(name){
    var command = new FMLayout(name);
    command.setParent(this);
    return command;
};



module.exports = FMDatabase;