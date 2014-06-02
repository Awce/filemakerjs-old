
var postToFMS = require( './libs/filemakerPost');


/**
 * auth mixin
 * @param user
 * @param password
 */
function auth(user, password){
    this.user = user;
    this.password = password;
}


/**
 *
 * @param callback
 * @returns {*|exports}
 */
var post = function(callback){

    var url = this.url() + '/fmi/xml/fmresultset.xml';
    var q = this.queryObject();
    var user = this.getUser();
    var password = this.getPassword();
    return postToFMS(url, user, password, q ,callback)

};

/**
 * Creates FileMaker Server Objects
 * @param url
 * @returns {{url: Function, auth: Function, getUser: Function, getPassword: Function, send: Function, dbnames: Function, queryObject: Function, db: Function}}
 */
function fms(url) {

    var _url = url;
    var _command = "";
    return {

        url: function(){
            return _url;
        },

        auth: function(){
            auth.apply(this, arguments);
            return this
        },
        getUser : function(){
            return this.user
        },
        getPassword : function(){
            return this.password
        },

        send : function(callback){
            return post.call(this, callback)
        },

        //commands
        dbNames : function(){
            _command = '-dbnames';
            return this
        },

        // get the query
        queryObject : function(){
            obj = {};
            obj[_command] = null;
            return obj;
        },

        //factory
        db : function(name){
            return db.call(this, name);
        }


    }

}


/**
 * Creates Database Objects
 * @param name
 * @returns {{name: Function, auth: Function, getUser: Function, getPassword: Function, fms: Function, layoutNames: Function, scriptNames: Function, send: Function, layout: Function}}
 */
function db(name){
    var _fms = this // will get the FMS instance
    var _name = name;
    var _command ='';
    return {
        url: function(){
            return _fms.url();
        },

        name : function () {
            return _name
        },

        auth: function(){
            auth.apply(this, arguments);
            return this
        },
        getUser : function(){
            return this.user || _fms.getUser()
        },
        getPassword : function(){
            return this.password || _fms.getPassword()
        },


        send : function(callback){
            return post.call(this, callback)
        },


        // get the query
        queryObject : function(){
            obj = {};
            obj[_command] = null;
            obj["-db"] = _name
            return obj;
        },


        //commands

        layoutNames : function () {
            _command = "-layoutnames";
            return this
        },

        scriptNames: function () {
            _command = "-scriptnames";
            return this
        },



        fms : function(){
            return _fms;
        },

        // factories
        layout : function(name){
            return layout.call(this, name)
        }

    }
}

/**
 * creates Layout Objects
 * @param name
 * @returns {{name: Function, auth: Function, getUser: Function, getPassword: Function, fms: Function, db: Function, findAll: Function}}
 */
function layout(name){
    var _db = this // will get the DB obj that created it
    var _name = name;
    var _command ='';
    var _options = '';

    return {
        url: function(){
            return this.fms().url();
        },

        name : function () {
            return _name
        },
        auth: function(){
            auth.apply(this, arguments);
            return this
        },
        getUser : function(){
            return this.user || _db.getUser()
        },
        getPassword : function(){
            return this.password || _db.getPassword()
        },

        send : function(callback){
            return post.call(this, callback)
        },


        // get the query
        queryObject : function(){
            obj = {};
            obj["-db"] = this.db().name();
            obj['-lay'] = _name;
            obj[_command] = null;
            return obj;
        },


        fms : function(){
            return _db.fms();
        },
        db : function(){
            return _db
        },

        //commands
        findAll : function () {
            _command = "-findall";
            return this
        },

        find : function (options) {
            _options = options ;
            _command = "-find";
            return this
        },

        set : function(fieldName, value, operator){
            options[fieldName]=value;
            if(operator){
                options[fieldName+'op']=operator
            }
            return this
        }


    }
}

module.exports.fms = fms;

/*

 may want some of this logic later.

 var re = new RegExp("^(http|https)://", "i");
 this.url = options.url.replace(re, '');

 this.protocol = options.protocol || "http";

 this.userName = options.userName || "Admin";
 this.password = options.password || '';
 */