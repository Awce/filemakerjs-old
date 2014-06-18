var authable        = require('../utils/authable'),
    parentable      = require('../utils/parentable'),
    sendable        = require('../utils/sendable'),
    pageable        = require('../utils/pageable'),
    grammers        = require('../FMServerGrammers');

function FindAll(){}

// mixins
authable(FindAll);
parentable(FindAll);
sendable(FindAll);
pageable(FindAll);

FindAll.prototype.queryObject = function(){
    var qo = this.getParent().queryObject();
    this.addPaging(qo);
    qo['-findall']=null;
    return qo
};

FindAll.prototype.getURL = function () {
    return this.getParent().getURL() + grammers.FMPRESULTSET_PATH
};

module.exports = FindAll