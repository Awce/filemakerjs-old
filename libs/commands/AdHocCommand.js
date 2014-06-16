var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    grammers        = require('../FMServerGrammers');

function AdHocCommand(qo){
    this.qo = qo
}

// mixins
authable(AdHocCommand);
parentable(AdHocCommand);
sendable(AdHocCommand);

AdHocCommand.prototype.queryObject = function(){
    return this.qo
};

AdHocCommand.prototype.getURL = function () {
    return this.getParent().getURL() + grammers.FMPRESULTSET_PATH
};

module.exports = AdHocCommand;