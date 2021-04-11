
// Imports
import xpath from 'xpath'

// Types
import { TallySummary } from '../../types/tcp'
import { GenericInput } from '../../types/input'

import { BaseInput } from '../../types/input'

// Input mappers
import { InputMappers } from './input-mapping/index'

/**
 * XML API Inputs
 */
export default class Inputs {

    /**
     * Extract inputs (XML DOM nodes) from full XML document
     * Using XPath
     * 
     * @param {Document} xmlDocument
     * @returns {Element[]}
     */
    static extractInputsFromXML(xmlDocument: Document, filters: { type?: string[], hasAttr?: string[] } = {}): Element[] {
        let xpathQuery = '//vmix/inputs/input'

        // Inject attributes-filter into XPath query
        if (filters.hasAttr) {
            xpathQuery += [
                '[',
                filters.hasAttr.map(attr => {
                    return `@${attr}`
                }).join(' and '),
                ']'
            ].join('')
        }

        // Inject 'specific input-types'-filter into XPath query
        if (filters.type) {
            xpathQuery += [
                '[',
                '@type=(',
                filters.type.map(type => {
                    return `"${type}"`
                }).join(','),
                ')',
                ']'
            ].join('')
        }

        return xpath.select(xpathQuery, xmlDocument) as Element[]
    }

    /**
     * Map single input
     *
     * @param {Element} input
     * @returns {BaseInput}
     */
    static mapSingle(input: Element): BaseInput {
        // Guard no attributes in xml dom element
        if (!input.attributes) {
            console.error('FAILING INPUT', input)
            throw new Error(`Input did not have any attributes...`)
        }

        // Read input type-attribute
        const inputTypeAttribute = input.attributes.getNamedItem('type')

        // Guard attribute was not found
        if (!inputTypeAttribute) {
            console.error('FAILING INPUT', input)
            throw new Error(`Input did not have type attribute...`)
        }

        const inputType = inputTypeAttribute.value

        // Guard no node value
        if (!inputType) {
            throw new Error(`Input type attribute did not have any value... ${JSON.stringify(inputTypeAttribute)}`)
        }

        // Attempt to find mapper based on name of input type
        // And use it to map input
        if (InputMappers.hasOwnProperty(inputType)) {
            return InputMappers[inputType].map(input)
        }

        // Additional custom mapping of types of mappers
        switch (inputType) {
            // If input is a title
            case 'GT':
            case 'Xaml':
                return InputMappers.Title.map(input)
            default:
                throw new Error(`Not implemented yet. There was not found an Input mapper for input type... ${inputType}`)
        }
    }



    /**
     * Map inputs
     *
     * @param {Element[]} xmlInputs
     */
    static map(xmlInputs: Element[]): BaseInput[] {

        // Map all data from raw input
        const xmlInputsMapped = xmlInputs.map(input => Inputs.mapSingle(input))

        // // Make a dictionary and populate it
        // const inputsDictionary: any = {}
        // xmlInputsMapped.forEach((input: any) => {
        //     inputsDictionary[input.key] = input
        // })

        // return inputsDictionary

        return xmlInputsMapped
    }
    /**
     * Map single input (generic)
     * Legacy method
     *
     * @param {Element} input
     * @param {string | string[]} wantedAttributes
     * @returns {BaseInputType}
     */
    static mapSingleGeneric(input: Element, wantedAttributes: string | string[] = '*'): GenericInput {
        const output: { [key: string]: any } = {}

        // Map all base attributes of input
        for (const attrName in input.attributes) {
            const attr: Attr = input.attributes[attrName]

            // Guard attribute not having name, being a function or nodeValue being a function
            if (!attr.name
                || typeof attr.name !== 'string'
                || typeof attr === 'function'
                || attr.value === 'function'
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
                        name: nameAttr.value,
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
                        || attr.value === 'function'
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
     * Map inputs (generic)
     * Legacy method
     *
     * @param {Element[]} xmlInputs
     * @param wantedAttributes
     * @returns {GenericInput[]}
     */
    static mapGeneric(xmlInputs: Element[], wantedAttributes: string | string[] = '*'): GenericInput[] {

        // Map all data from raw input
        const xmlInputsMapped = xmlInputs.map(input => Inputs.mapSingleGeneric(input, wantedAttributes))

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

        const numberOfInputs = Inputs.extractInputsFromXML(xmlDocument).length
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
     * Extract active program input number from full XML document
     * using XPath
     * 
     * @param {Document} xmlDocument
     */
    static extractProgramInputNumber(xmlDocument: Document): number {
        const element = xpath.select1("//vmix/active", xmlDocument) as Element

        if (!element) {
            throw new Error('Could not find active program in xml doc...')
        }

        return Number(element.textContent)
    }

    /**
     * Extract preview input number from full XML document
     * using XPath
     * 
     * @param {Document} xmlDocument
     */
    static extractPreviewInputNumber(xmlDocument: Document): number {
        const el = xpath.select1("//vmix/preview", xmlDocument) as Element

        if (!el) {
            throw new Error('Could not find preview program element in xml doc...')
        }

        return Number(el.textContent)
    }
}