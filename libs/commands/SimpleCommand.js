/**
 * can be used to create a Simple Command like dbnames, scriptnames
 * @type {authable|exports}
 */

var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    pageable        = require('../utils/pageable'),
    grammars        = require('../FMServerGrammers');


function SimpleCommand(name){
    this.name = name
}

// mixins
authable(SimpleCommand);
parentable(SimpleCommand);
sendable(SimpleCommand);
pageable(SimpleCommand);

SimpleCommand.prototype.queryObject = function(){
    var qo = this.getParent().queryObject();
    this.addPaging(qo);
    qo[this.name]=null;
    return qo
};

SimpleCommand.prototype.getURL = function () {
    return this.getParent().getURL() + grammars.FMPRESULTSET_PATH
};

module.exports = SimpleCommand;