import xpath from 'xpath'

export default class InputMapper {

    /**
     * Extract inputs XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractInputsFromXML(xmlContent: Node) {
        return xpath.select("//vmix/inputs/input", xmlContent)
    }

    /**
     * Map inputs
     * @param xmlInputs
     * @param wantedAttributes
     */
    static mapInputs(xmlInputs: any[], wantedAttributes: string = '*') {
        // Map all data from raw input
        var xmlInputsMapped = xmlInputs.map((input: any) => {
            const output: any = {}

            // Map all base attributes of input
            for (let i in input.attributes) {
                let attribute = input.attributes[i]

                // Guard attribute not having name, being a function or nodeValue being a function
                if (!attribute.name || typeof attribute === 'function' || attribute.nodeValue === 'function' || typeof attribute.name !== 'string') {
                    continue
                }

                // Only add the attribute to the output object if it is wanted
                if (wantedAttributes === '*' || wantedAttributes.includes(attribute.name)) {
                    output[attribute.name] = attribute.nodeValue
                }
            }

            let fields = []
            for (let i in input.childNodes) {
                let entry = input.childNodes[i]
                if (entry.localName && ['image', 'text'].includes(entry.localName)) {
                    const obj: any = {} // Build advanced fields of object from its advanced attributes

                    // Map attributes
                    if (entry.attributes && (typeof entry.attributes === 'object' || Array.isArray(entry.attributes))) {
                        for (let name in entry.attributes) {
                            let attribute = entry.attributes[name]
                            obj[attribute.name] = attribute.nodeValue
                        }
                    }

                    // Append field type
                    obj.type = entry.localName
                    if (entry.childNodes.length) {
                        obj.value = entry.childNodes[0].data
                    }

                    fields.push(obj)
                }
            }
            output.fields = fields

            return output
        })
        // Make a dictionary
        let inputsDictionary: any = {}
        xmlInputsMapped.forEach((input: any) => {
            inputsDictionary[input.key] = input
        })

        return inputsDictionary
    }
}