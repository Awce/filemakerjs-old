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

AdHocCommand.prototype.set = function(name, val){
    if (1 == arguments.length) {
        for (var key in name) {
            this.set(key, name[key]);
        }
    } else {
        this.qo[name] = val;
    }

    return this;
};

module.exports = AdHocCommand;