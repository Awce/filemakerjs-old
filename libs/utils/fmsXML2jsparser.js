/**
 * module to parse FileMaker Server query results into nice JSON
 * @type {exports.parseString}
 */

var parseString = require('xml2js').parseString;


function parseRecord(object){
    var record = {};
    record['modid'] = parseInt(object.$['mod-id']);
    record['recordid'] = parseInt(object.$['record-id']);

    object.field.forEach(function (field) {
        var value = field.data[0]
        record[field.$.name] = value
    });
    return record
}



function fmResultSetParser(xml, fn) {
    var d2 = [],
        fieldDefinitions = {},
        collection,
        thereIsSomeData,
        relatedSetDefinitions;

    xml.fmresultset.metadata[0]['field-definition'].forEach(function (field) {
        var fieldName = field.$.name;
        delete  field.$.name;
        fieldDefinitions[fieldName] = (field.$);
    });

    relatedSetDefinitions = xml.fmresultset.metadata[0]['relatedset-definition']
    if(relatedSetDefinitions) {

        var arr = {};
        relatedSetDefinitions.forEach(function (relatedSetDefinition) {
            var table = relatedSetDefinition.$.table;
            var fields = relatedSetDefinition['field-definition'];
            var fieldDefinitions = {}

            fields.forEach(function (field) {

                var fieldName = field.$.name;
                delete  field.$.name;
                fieldDefinitions[fieldName] = (field.$);
            });

            arr[table] = fieldDefinitions;
        });
        fieldDefinitions.relatedSetFieldDefinitions = arr
    }

    thereIsSomeData = xml.fmresultset.resultset[0].$.count > 0;

    if (thereIsSomeData) {
        xml.fmresultset.resultset[0].record.forEach(function (object) {
            var record, relatedSets

            record = parseRecord(object);

            relatedSets =  object.relatedset;
            if(relatedSets){
                relatedSets.forEach(function (relatedSet) {
                    var count, tableName,
                        relatedRecords = [];
                    count = relatedSet.$.count;
                    tableName = relatedSet.$.table;
                    if(count != 0){
                        relatedSet.record.forEach(function (relatedObject) {
                            relatedRecords.push( parseRecord(relatedObject) )
                        });
                    }
                    record[tableName] = {
                        count: count,
                        data : relatedRecords
                    }
                })
            }
            d2.push(record);

        })
    }


    collection = {
        error: parseInt(xml.fmresultset.error[0].$.code),
        meta: {
            datasource: xml.fmresultset.$,
            fieldDefinitions: fieldDefinitions,
            product: xml.fmresultset.product[0].$
        },
        count: parseInt(xml.fmresultset.resultset[0].$.count),
        fetchSize: parseInt(xml.fmresultset.resultset[0].$['fetch-size']),
        data: d2
    }

    fn(null, collection)


}

function parser(xml, fn) {
    parseString(xml, function (err, xml) {
        fmResultSetParser(xml, fn);
    })
}

// export the superagent parser
module.exports = function (res, fn) {
    res.text = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        res.text += chunk;
    });
    res.on('end', function () {
        try {
            parser(res.text, fn);
        } catch (err) {
            fn(err);
        }
    });
};