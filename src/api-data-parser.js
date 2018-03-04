
const xmldom = require('xmldom').DOMParser

// Parse string with XML data to a XML object that can be interpreted
module.exports = class ApiDataParser {
    static parse(xmlData) {
        // Raw data from webController to XML dom
        return new xmldom().parseFromString(xmlData)
    }
}