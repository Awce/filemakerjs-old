/**
 * module to parse FileMaker Server query results into nice JSON
 * @type {exports.parseString}
 */

var parseString = require('xml2js').parseString;




function fmsParser(xml, fn){
    var d2 = []
    xml.fmresultset.resultset[0].record.forEach(function(object){

        var record = {}
        record['modid'] = parseInt(object.$['mod-id']);
        record['recordid'] = parseInt(object.$['record-id']);

        object.field.forEach(function(field){
            var value = field.data[0]
            record[field.$.name] = value
        })


        d2.push(record);
    })

    var collection = {
        error: parseInt(xml.fmresultset.error[0].$.code),
        count: parseInt(xml.fmresultset.resultset[0].$.count),
        fetchSize: parseInt(xml.fmresultset.resultset[0].$['fetch-size']),
        data: d2
    }

    fn(null, collection)


}

function parser(xml, fn){
    parseString( xml, function(err, xml){
         fmsParser(xml, fn);
    })
}

// export the superagent parser
module.exports = function(res, fn){
    res.text = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){ res.text += chunk; });
    res.on('end', function(){
        try {
            parser(res.text, fn);
        } catch (err) {
            fn(err);
        }
    });
};