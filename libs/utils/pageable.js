var fmsParams = require( '../FMServerParameters' );


function pageable(obj){


    /**
     * set the limit on the records to return
     * @param int
     * @returns {obj}
     */
    obj.prototype.max = function (numberOfRecords) {
        this.paging = this.paging || {};
        this.paging.max = numberOfRecords;
        return this
    };

    /**
     * @alias of max
     */
    obj.prototype.limit = this.max


    /**
     * set the number of records to skip
     * @param int
     * @returns {obj}
     */
    obj.prototype.skip = function (numberOfRecords) {
        this.paging = this.paging || {};
        this.paging.skip = numberOfRecords;
        return this
    }

    obj.prototype.addPaging = function(queryObject){

        if(!this.paging ){
            return
        }

        if(this.paging.skip){
            queryObject[fmsParams.SKIP] = this.paging.skip
        }
        if(this.paging.max){
            queryObject[fmsParams.MAX] = this.paging.max
        }
    }



}

module.exports = pageable