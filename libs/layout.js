
var _ = require('lodash');
var fmRequest = require('./filemakerRequest');


/**
 * creates Layout Objects
 * @param name
 * @returns {{name: Function, auth: Function, getUser: Function, getPassword: Function, fms: Function, db: Function, findAll: Function}}
 */
function layout(db, name){
    var _db = db
    var _name = name;
    var _command ='';
    var _options = {};

    var obj = {
        url: function(){
            return this.fms().url();
        },

        name : function () {
            return _name
        },

        // get the query
        queryObject : function(){
            obj = _options;
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

        /**
         *
         * @returns {string} the user name
         */
        getUser : function(){
            return this.user || this.db().getUser()
        },

        /**
         *
         * @returns {string} password
         */
        getPassword : function(){
            return this.password || this.db().getUser()
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

        max: function (int) {
            _options['-max'] = int
            return this
        },

        skip: function (int) {
            _options['-skip'] = int
            return this
        },


        /* not sure about this one */
        set : function(fieldName, value, operator){
            options[fieldName]=value;
            if(operator){
                options[fieldName+'op']=operator
            }
            return this
        }
    };
    // add the fmRequest methods
    return _.extend(  obj, fmRequest );
}

module.exports = exports = layout