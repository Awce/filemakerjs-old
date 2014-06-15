
var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    grammers        = require('../FMServerGrammers');

function DBNames (){}


// mixins
authable(DBNames);
parentable(DBNames);
sendable(DBNames);


DBNames.prototype.queryObject = function(){
    return {
        '-dbnames' : null
    }
};

DBNames.prototype.getURL = function () {
    return this.getParent().getURL() + grammers.FMPRESULTSET_PATH
};

module.exports = DBNames;