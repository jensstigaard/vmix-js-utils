// Imports
import xpath, { SelectedValue } from 'xpath'

// Types
import { TallySummary } from '../types/tcp'

export default class XmlInputMapper {

    /**
     * Extract inputs XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractInputsFromXML(xmlContent: Node): SelectedValue[] {
        return xpath.select("//vmix/inputs/input", xmlContent)
    }

    /**
     * Map input
     *
     * @param input
     * @param wantedAttributes 
     */
    static mapInput(input: Element, wantedAttributes: string | string[] = '*') {
        const output: { [key: string]: any } = {}

        // Map all base attributes of input
        for (let attrName in input.attributes) {
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
                for (let i in input.childNodes) {
                    const titleEl: Element = input.childNodes[i] as Element

                    // Guard child node does not have node name and the node is not of correct type
                    if (!titleEl.nodeName || !['image', 'text'].includes(titleEl.nodeName)) {
                        continue
                    }

                    const nameAttr = titleEl.attributes.getNamedItem('name')
                    // Guard child node does not have a name attribute
                    if (!nameAttr) {
                        continue
                    }

                    // Build fields of object from its attributes
                    const titleField: { [key: string]: any } = {
                        type: titleEl.nodeName,
                        name: nameAttr.nodeValue,
                        value: (titleEl as Node).textContent?.trim()
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
    static mapInputs(xmlInputs: Element[], wantedAttributes: string | string[] = '*') {

        // Map all data from raw input
        var xmlInputsMapped = xmlInputs.map(input => XmlInputMapper.mapInput(input, wantedAttributes))
        // Make a dictionary
        let inputsDictionary: any = {}
        xmlInputsMapped.forEach((input: any) => {
            inputsDictionary[input.key] = input
        })

        return inputsDictionary
    }

    static mapTallyInfo(xmlContent: Node): TallySummary {
        const inputInProgram: number = this.extractProgramFromXML(xmlContent)
        const inputInPreview: number = this.extractPreviewFromXML(xmlContent)

        const numberOfInputs = XmlInputMapper.extractInputsFromXML(xmlContent).length
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
     * Extract active in prgoram XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractProgramFromXML(xmlContent: Node): number {
        const node: Node = xpath.select("//vmix/active", xmlContent, true) as Node

        if (!node) {
            throw new Error('Could not find active program...')
        }

        return Number(node.lastChild!.nodeValue)
    }

    /**
     * Extract preview XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractPreviewFromXML(xmlContent: Node): number {
        const node: Node = xpath.select("//vmix/preview", xmlContent, true) as Node

        if (!node) {
            throw new Error('Could not find preview program...')
        }

        return Number(node.lastChild!.nodeValue)
    }
}