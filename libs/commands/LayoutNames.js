
var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    grammers        = require('../FMServerGrammers');


function LayoutNames(){}

// mixins
authable(LayoutNames);
parentable(LayoutNames);
sendable(LayoutNames);

LayoutNames.prototype.queryObject = function(){
    var qo = this.getParent().queryObject()
    qo['-layoutnames']=null;
    return qo
};

LayoutNames.prototype.getURL = function () {
    return this.getParent().getURL() + grammers.FMPRESULTSET_PATH
};

module.exports = LayoutNames;