
import xmldom from 'xmldom'

const DOMParser = xmldom.DOMParser

/**
 * Parses the raw (text) XML data from the XML API from a vMix instance
 * The data is parsed into XML document which can be more easily interpreted and manipulated in JavaScript.
 * All *full* XML responses from the API needs to be used to convert the content to a proper XML DOM object.
 * 
 * This is a essential function for this library
 * 
 */
export default class XmlApiDataParser {
    /**
     * Do the parsing
     * @param rawXmlData
     * @returns
     */
    static parse(rawXmlData: string): Document {
        // Raw data from webController to XML dom
        return new DOMParser().parseFromString(rawXmlData)
    }
}
