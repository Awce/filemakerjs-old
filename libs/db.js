var _ = require('lodash');
var fmRequest = require('./filemakerRequest');
var layout = require('./layout');

/**
 * Creates Database Objects
 * @param name
 * @returns {{name: Function, auth: Function, getUser: Function, getPassword: Function, fms: Function, layoutNames: Function, scriptNames: Function, send: Function, layout: Function}}
 */
function db(fms, name){
    var _fms = fms;
    var _name = name;
    var _command ='';
    var obj =  {
        type: 'Database',
        url: function(){
            return this.fms().url()
        },

        name : function () {
            return _name
        },

        /**
         *
         * @returns {string} the user name
         */
        getUser : function(){
            return this.user || this.fms().getUser()
        },

        /**
         *
         * @returns {string} password
         */
        getPassword : function(){
            return this.password || this.fms().getUser()
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
            return layout(this, name)
        }

    };

    // add the fmRequest methods
    return _.extend(  obj, fmRequest );


}

module.exports = exports = db