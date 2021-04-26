
// Imports
import xpath from 'xpath'

// Types
import { TallySummary } from '../../types/tcp'

import { BaseInput } from '../../types/inputs'

// Input mappers
import { InputMappers } from './input-mapping/index'

// Utility
import { arrayWrap } from '../../utility'

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
    static extractInputsFromXML(
        xmlDocument: Document,
        options: {
            filters?: { number?: number[], type?: string[], hasAttrs?: string[] }
        } = {}
    ): Element[] {
        // console.log('Options', options)
        let xpathQuery = '//vmix/inputs/input'


        if (options.filters) {
            // XPath filtering
            // Attribute existance:https://stackoverflow.com/questions/3737906/xpath-how-to-check-if-an-attribute-exists
            // Attribute value(s) query: https://stackoverflow.com/questions/46503195/xpath-one-of-multiple-attribute-values-with-condition
            // Multiple attributes and/or query: https://stackoverflow.com/questions/2009268/how-to-write-an-xpath-query-to-match-two-attributes

            const filters = options.filters
            // Inject 'specific input-numbers'-filter into XPath query
            // Inclusive filter
            if (filters.number) {
                xpathQuery += [
                    '[',
                    arrayWrap(filters.number).map(inputNumber => {
                        return `@number="${inputNumber}"`
                    }).join(' or '),
                    ']'
                ].join('')
            }

            // Inject 'specific input-types'-filter into XPath query
            // Inclusive filter
            if (filters.type) {
                xpathQuery += [
                    '[',
                    arrayWrap(filters.type).map(type => {
                        return `@type="${type}"`
                    }).join(' or '),
                    ']'
                ].join('')
            }

            // Inject attributes-filter into XPath query
            // Exclusive filter
            if (filters.hasAttrs) {
                xpathQuery += [
                    '[',
                    arrayWrap(filters.hasAttrs).map(attr => {
                        return `@${attr}`
                    }).join(' and '),
                    ']'
                ].join('')
            }
        }

        // console.log('XPATH QUERY', xpathQuery)
        // process.exit()

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