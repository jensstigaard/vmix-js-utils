
import xmldom from 'xmldom'

const DOMParser = xmldom.DOMParser

// Parse string with XML data to a XML object that can be interpreted
export default class ApiDataParser {
    static parse(xmlData: string) {
        // Raw data from webController to XML dom
        return new DOMParser().parseFromString(xmlData)
    }
}
