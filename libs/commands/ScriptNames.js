
var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    pageable        = require('../utils/pageable'),
    grammers        = require('../FMServerGrammers');


function ScriptNames(){}

// mixins
authable(ScriptNames);
parentable(ScriptNames);
sendable(ScriptNames);
pageable(ScriptNames);

ScriptNames.prototype.queryObject = function(){
    var qo = this.getParent().queryObject();
    this.addPaging(qo);
    qo['-scriptnames']=null;
    return qo
};

ScriptNames.prototype.getURL = function () {
    return this.getParent().getURL() + grammers.FMPRESULTSET_PATH
};

module.exports = ScriptNames;