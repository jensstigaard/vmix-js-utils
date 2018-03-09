const xpath = require('xpath')

module.exports = class InputMapper {
    
    static extractInputsFromXML(xmlContent) {
        return xpath.select("//vmix/inputs/input", xmlContent)
    }

    static mapInputs(xmlInputs, wantedAttributes = '*') {
        // Map all data from raw input
        var xmlInputsMapped = xmlInputs.map(input => {
            var output = {}

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
                    let obj = {} // Build advanced fields of object from its advanced attributes

                    // Map attributes
                    if (entry.attributes && Array.isArray(entry.attributes)) {
                        entry.attributes.forEach(attribute => {
                            obj[attribute.name] = attribute.nodeValue
                        })
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
        let inputsDictionary = {}
        xmlInputsMapped.forEach((input, i) => {
            inputsDictionary[input.key] = input
        })

        return inputsDictionary
    }
}