
import xmldom from 'xmldom'

const DOMParser = xmldom.DOMParser

// Parse string with XML data to a XML object that can be interpreted
export default class XmlApiDataParser {
    static parse(rawXmlData: string): Document {
        // Raw data from webController to XML dom
        return new DOMParser().parseFromString(rawXmlData)
    }
}
