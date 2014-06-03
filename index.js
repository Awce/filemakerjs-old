

var fmRequest = require('./libs/filemakerRequest');
var db = require('./libs/db');
var _ = require('lodash');


/**
 * Creates FileMaker Server Objects
 * @param url
 * @returns {{url: Function, auth: Function, getUser: Function, getPassword: Function, send: Function, dbnames: Function, queryObject: Function, db: Function}}
 */
function fms(url) {

    var _url = url;
    var _command = "";

    var obj =  {

        url: function(){
            return _url;
        },

        /**
         *
         * @returns {string} the user name
         */
        getUser : function(){
            return this.user
        },

        /**
         *
         * @returns {string} password
         */
        getPassword : function(){
            return this.password
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
            return db(this, name);
        }
    };

    // add the fmRequest methods
    return _.extend(  obj, fmRequest );
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