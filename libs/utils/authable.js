/**
 * mixin
 * adds the ability to store username and password to an object.
 * also allows the object to look up the user from a "parent" if it exists
 * @param obj
 */
function authable(obj){

   // obj.user = {};

    obj.prototype.auth = function(userName, password){
        this.user = {}
        this.user.name = userName;
        this.user.password = password;
        return this
    };

    obj.prototype.getUser = function(){
        if(this.getParent){
            return this.user || this.getParent().getUser();
        }else{
            return this.user
        }
    }

}

module.exports = authable;