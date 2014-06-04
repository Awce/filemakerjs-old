
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
    var _skip, _max;
    var _data = {}
    var _script


    var obj = {
        url: function(){
            return this.fms().url();
        },

        name : function () {
            return _name
        },

        // get the query
        queryObject : function(){
            var obj = {}
            obj["-db"] = this.db().name();
            obj['-lay'] = _name;

            if(_max){
                obj['-max'] = _max
            }
            if(obj !== {}){
                obj = _.assign(obj, _options);
            }

            if(_command == "-new"){
                _.assign(obj, _data);
            }else if('-script'){
                _.assign(obj, _script);
            }

            if(_skip){
                obj['-skip'] = _max
            }




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

        findAny : function () {
            _command = "-findany";
            return this
        },

        find : function (options) {
            _options = options ;
            _command = "-find";
            return this
        },

        max: function (int) {
            _max = int
            return this
        },

        skip: function (int) {
            _skip = int
            return this
        },

        delete : function (recordid) {
            _command='-delete';
            _data['-recid'] = recordid;
            return this
        },

        script : function (name, parameter) {
            var obj = {}
            obj['-script'] = name;
            if (parameter)
            obj['-script.param'] = parameter

            _script = obj;

            return this
        },


        edit : function () {
            _command = '-edit';
            return this
        },

        /**
         *
         * @param data
         * @returns {obj}
         */
        newRecord : function (data) {
            _command = '-new';
            _data = data
            return this
        },

         _reset : function () {
             _data = {}
             _options = {}
             _script = ''
;         }
    };
    // add the fmRequest methods
    return _.extend(  obj, fmRequest );
}

module.exports = exports = layout