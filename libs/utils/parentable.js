

function parentable(obj){

    obj.prototype.setParent = function (parentObj) {
        this._parent = parentObj;
    }

    obj.prototype.getParent = function () {
        return this._parent
    }


}

module.exports = parentable