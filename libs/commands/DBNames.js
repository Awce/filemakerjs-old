
var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    pageable        = require('../utils/pageable'),
    grammers        = require('../FMServerGrammers');

function DBNames (){}


// mixins
authable(DBNames);
parentable(DBNames);
sendable(DBNames);
pageable(DBNames);


DBNames.prototype.queryObject = function(){

    var qo = {
        '-dbnames': null
    }
    this.addPaging(qo);
    return qo;
};

DBNames.prototype.getURL = function () {
    return this.getParent().getURL() + grammers.FMPRESULTSET_PATH
};

module.exports = DBNames;