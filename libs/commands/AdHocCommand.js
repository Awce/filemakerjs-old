/**
 * AdHoc Command
 *
 * This will create a command based on the qo that has been passed in.
 *
 * @type {authable|exports}
 */

var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    grammers        = require('../FMServerGrammers');


/**
 *
 * @param {object} queryObject the complete object dictating the params to pass to FM
 * @constructor
 */
function AdHocCommand(queryObject){
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