

var authable        = require('./utils/authable'),
    parentable      = require('./utils/parentable'),
    ScriptNames     = require('./commands/ScriptNames'),
    LayoutNames     = require('./commands/LayoutNames'),
    FindAll         = require('./commands/FindAll');


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
    qo['-lay']=this.name;
    return qo;
};

FMLayout.prototype.findAll = function(){
    var findAll = new FindAll();
    findAll.setParent(this);
    return findAll
}

module.exports = FMLayout