
// Imports
import xpath from 'xpath'

// Types
import { Input as InputType } from '../../types/input'
import { TallySummary } from '../../types/tcp'

/**
 * XML API Input mapping
 */
export default class InputMapping {

    /**
     * Extract inputs XML from full XML document using XPath
     * 
     * @param {Document} xmlDocument
     * @returns {Element[]}
     */
    static extractInputsFromXML(xmlDocument: Document): Element[] {
        return xpath.select("//vmix/inputs/input", xmlDocument) as Element[]
    }

    /**
     * Map input
     *
     * @param {Element} input
     * @param {string | string[]} wantedAttributes
     * @returns {InputType} 
     */
    static mapInput(input: Element, wantedAttributes: string | string[] = '*'): InputType {
        const output: { [key: string]: any } = {}

        // Map all base attributes of input
        for (const attrName in input.attributes) {
            const attr: Attr = input.attributes[attrName]

            // Guard attribute not having name, being a function or nodeValue being a function
            if (!attr.name
                || typeof attr.name !== 'string'
                || typeof attr === 'function'
                || attr.nodeValue === 'function'
            ) {
                continue
            }

            // Only add the attribute to the output object if it is mandatory or desired by user
            if (
                ['key', 'type'].includes(attr.name)
                || wantedAttributes === '*'
                || wantedAttributes.includes(attr.name)
            ) {
                output[attr.name] = attr.value
            }
        }

        switch (output.type) {
            // If input is a title
            case 'GT':
            case 'Xaml':

                // Guard - Attach fields only if "field" attributes is desired
                if (wantedAttributes !== '*' && !wantedAttributes.includes('fields')) {
                    break
                }

                output.fields = []
                // A regular .forEach doesn't work on this somehow...
                for (const i in input.childNodes) {
                    const titleFieldEl: Element = input.childNodes[i] as Element

                    // Guard child node does not have node name and the node is not of correct type
                    if (!titleFieldEl.nodeName || !['image', 'text'].includes(titleFieldEl.nodeName)) {
                        continue
                    }

                    const nameAttr = titleFieldEl.attributes.getNamedItem('name')
                    // Guard child node does not have a name attribute
                    if (!nameAttr) {
                        continue
                    }

                    // Build fields of object from its attributes
                    const titleField: { [key: string]: any } = {
                        type: titleFieldEl.nodeName,
                        name: nameAttr.nodeValue,
                        value: (titleFieldEl as Node).textContent?.trim()
                    }

                    output.fields.push(titleField)
                }

                break
            case 'Replay':
                // Replay input - extract child node info
                const replayChildNode = input.childNodes[1]! as Element

                output.replay = {}
                for (const attrName in replayChildNode.attributes) {
                    const attr: Attr = replayChildNode.attributes[attrName]

                    // Guard attribute not having name, being a function or nodeValue being a function
                    if (!attr.name
                        || typeof attr.name !== 'string'
                        || typeof attr === 'function'
                        || attr.nodeValue === 'function'
                    ) {
                        continue
                    }

                    // console.log('ADD REPLAY ATTR', attr.name, attr.value)
                    output.replay[attr.name] = attr.value
                }

                // A regular .forEach doesn't work on this somehow...
                for (const i in replayChildNode.childNodes) {
                    const replayEl: Node = replayChildNode.childNodes[i]

                    // Guard entry does not have node name and the node is not of correct type
                    if (
                        !replayEl.nodeName
                        || !['timecode', 'timecodeA', 'timecodeB'].includes(replayEl.nodeName)
                    ) {
                        continue
                    }
                    // console.log('REPLAY CHILD NODE', replayEl.nodeName, replayEl.textContent)

                    output.replay[replayEl.nodeName] = replayEl.textContent?.trim()
                }
                break
            default:
                break
        }

        return output
    }


    /**
     * Map inputs
     *
     * @param xmlInputs
     * @param wantedAttributes
     */
    static mapInputs(xmlInputs: Element[], wantedAttributes: string | string[] = '*'): InputType[] {

        // Map all data from raw input
        var xmlInputsMapped = xmlInputs.map(input => InputMapping.mapInput(input, wantedAttributes))

        // Make a dictionary and populate it
        const inputsDictionary: any = {}
        xmlInputsMapped.forEach((input: any) => {
            inputsDictionary[input.key] = input
        })

        return inputsDictionary
    }

    /**
     * Map tally info
     * 
     * @param {Document} xmlDocument
     * @returns {TallySummary}
     */
    static mapTallyInfo(xmlDocument: Document): TallySummary {
        const inputInProgram: number = this.extractProgramInputNumber(xmlDocument)
        const inputInPreview: number = this.extractPreviewInputNumber(xmlDocument)

        const numberOfInputs = InputMapping.extractInputsFromXML(xmlDocument).length
        if (inputInPreview > numberOfInputs) {
            throw new Error(`Invalid preview input number... ${inputInPreview} of ${numberOfInputs} inputs`)
        }
        if (inputInProgram > numberOfInputs) {
            throw new Error(`Invalid program input number... ${inputInProgram} of ${numberOfInputs} inputs`)
        }

        return {
            program: [inputInProgram],
            preview: [inputInPreview],

            numberOfInputs
        }
    }


    /**
     * Extract active program input number from full XML document using XPath
     * @param {Document} xmlDocument
     */
    static extractProgramInputNumber(xmlDocument: Document): number {
        const node: Node = xpath.select("//vmix/active", xmlDocument, true) as Node

        if (!node) {
            throw new Error('Could not find active program...')
        }

        return Number(node.lastChild!.nodeValue)
    }

    /**
     * Extract preview input number from full XML document using XPath
     * @param {Document} xmlDocument
     */
    static extractPreviewInputNumber(xmlDocument: Document): number {
        const node: Node = xpath.select("//vmix/preview", xmlDocument, true) as Node

        if (!node) {
            throw new Error('Could not find preview program...')
        }

        return Number(node.lastChild!.nodeValue)
    }
}