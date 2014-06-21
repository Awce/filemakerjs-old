

var authable        = require('./utils/authable'),
    parentable      = require('./utils/parentable'),
    SimpleCommand   = require('./commands/SimpleCommand'),
    fmsParams       = require('./FMServerParameters');


function FMLayout(name){
    this.name = name;
}

//mixins
authable( FMLayout );
parentable(FMLayout);


/**
 * gets the URL from the Parent object
 * @returns {*}
 */
FMLayout.prototype.getURL = function () {
    return this.getParent().getURL()
};

FMLayout.prototype.queryObject = function () {
    var qo = this.getParent().queryObject()
    qo[fmsParams.LAYOUT]=this.name;
    return qo;
};

FMLayout.prototype.findAll = function(){
    var command = new SimpleCommand(fmsParams.FINDALL);
    command.setParent(this);
    return command
};

FMLayout.prototype.findAny = function(){
    var command = new SimpleCommand(fmsParams.FINDANY);
    command.setParent(this);
    return command
};

module.exports = FMLayout;