

module.exports = FMQuery


function FMQuery(FM){
    this.queryParams = {};
    this.FM = FM
}


FMQuery.prototype.db =  function(dbname){
    this.queryParams['-db'] = dbname
    return this
}
FMQuery.prototype.lay =  function(layoutName){
    this.queryParams['-lay']= layoutName
    return this
}

FMQuery.prototype.findAll =  function(){
    this.queryParams['-findall'] = null
    return this
}



FMQuery.prototype.getURL = function(){
    return this.FM.getBaseURL() +"?" + qs.stringify(this.queryParams)
}

FMQuery.prototype.dbnames = function(){
    this.queryParams['-dbnames'] = null
    return this
}

FMQuery.prototype.layoutnames = function(){
    this.queryParams['-layoutnames'] = null
    return this
}

FMQuery.prototype.end = function(){
    this.FM.req(this.queryParams);
}