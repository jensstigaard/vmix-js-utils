
// Libraries
import xpath from 'xpath'

// Types
import { TallySummary } from '../types/tcp'
import { BaseInput } from '../types/inputs'

// Input mappers
import { InputMappers } from './input-mapping/index'
import { BaseInputMapper } from './input-mapping/base-input-mapper'

// Utility
import { arrayWrap } from '../utility'

// Exceptions
import InputMissingAttributesError from '../exceptions/input-missing-attributes.error'
import UnknownInputTypeError from '../exceptions/unknown-input-type-error'

type OptionsFilter = {
    key?: string[] // Filter on key
    number?: number[] // Filter on number
    type?: string[] // Filter on input type
    hasAttrs?: string[] // Filter on inputs having specific attribute(s)
}

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
        options?: {
            filters?: OptionsFilter
        }
    ): Element[] {
        // console.log('Options', options)
        let xpathQuery = '//vmix/inputs/input'

        if (options && options.filters) {
            // XPath filtering
            // Attribute existance:https://stackoverflow.com/questions/3737906/xpath-how-to-check-if-an-attribute-exists
            // Attribute value(s) query: https://stackoverflow.com/questions/46503195/xpath-one-of-multiple-attribute-values-with-condition
            // Multiple attributes and/or query: https://stackoverflow.com/questions/2009268/how-to-write-an-xpath-query-to-match-two-attributes

            const filters = options.filters

            // Inject 'specific input-key'-filter into XPath query
            // Inclusive filter
            if (filters.key) {
                xpathQuery += [
                    '[',
                    arrayWrap(filters.key).map(key => {
                        return `@key="${key}"`
                    }).join(' or '),
                    ']'
                ].join('')
            }

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
     * @param {boolean} includeLayers
     * @param {boolean} failOnUnknownInputType
     * @returns {BaseInput}
     */
    static mapSingle(
        input: Element,
        includeLayers: boolean = true,
        failOnUnknownInputType: boolean = false
    ): BaseInput {
        // Guard no attributes in xml dom element
        if (!input.attributes) {
            // console.error('FAILING INPUT', input)
            throw new InputMissingAttributesError(`Input did not have any attributes...`)
        }

        // Read input type-attribute
        const inputTypeAttribute = input.attributes.getNamedItem('type')

        // Guard attribute was not found
        if (!inputTypeAttribute) {
            console.error('FAILING INPUT', input)
            throw new InputMissingAttributesError(`Input did not have type attribute...`)
        }

        const inputType = inputTypeAttribute.value

        // Guard no node value
        if (!inputType) {
            throw new Error(`Input type attribute did not have any value... ${JSON.stringify(inputTypeAttribute)}`)
        }

        // Attempt to find mapper based on name of input type
        // And use it to map input
        if (inputType in InputMappers) {
            return InputMappers[inputType].map(input, includeLayers)
        }

        // Additional custom mapping of types of mappers
        switch (inputType) {
            // If input is a title
            case 'GT':
            case 'Xaml':
                return InputMappers.Title.map(input, includeLayers)
            default:
                // Check if should fail on unknown input type
                if (failOnUnknownInputType) {
                    throw new UnknownInputTypeError(
                        `Unknown input type '${inputType}'. There was not found an input mapper for this input type...`
                    )
                }

                // Attempt map the input using the base/master input mapper
                return (new BaseInputMapper).map(input, includeLayers)
        }
    }



    /**
     * Map (multiple) inputs
     *
     * @param {Element[]} xmlInputs
     * @param {boolean} includeLayers
     * @param {boolean} failOnUnknownInputType
     * 
     * @returns {BaseInput[]} inputs
     */
    static map(
        xmlInputs: Element[],
        includeLayers: boolean = true,
        failOnUnknownInputType: boolean = false,
    ): BaseInput[] {
        // Map all data from raw input
        const xmlInputsMapped = xmlInputs.map(
            input => Inputs.mapSingle(input, includeLayers, failOnUnknownInputType)
        )

        // // Make a dictionary and populate it
        // const inputsDictionary: any = {}
        // xmlInputsMapped.forEach((input: any) => {
        //     inputsDictionary[input.key] = input
        // })

        // return inputsDictionary

        return xmlInputsMapped
    }

    /**
     * Map (multiple) inputs with allowing nullable
     * @param xmlInputs
     * @param includeLayers
     * @param failOnUnknownInputType
     * @returns 
     */
    static mapAllowNullable(
        xmlInputs: Element[],
        includeLayers: boolean = true,
        failOnUnknownInputType: boolean = false
    ): (BaseInput | null)[] {
        return xmlInputs.map(input => {
            try {
                return Inputs.mapSingle(input, includeLayers, failOnUnknownInputType)
            } catch (e) {
                return null
            }
        })
    }


    /**
     * Map tally info
     * including layers
     * 
     * @param {Document} xmlDocument
     * @returns {TallySummary}
     */
    static mapTallyInfo(xmlDocument: Document): TallySummary {
        const inputNumberInProgram: number = this.extractProgramInputNumber(xmlDocument)
        const inputNumberInPreview: number = this.extractPreviewInputNumber(xmlDocument)

        const numberOfInputs = Inputs.extractInputsFromXML(xmlDocument).length
        if (inputNumberInPreview > numberOfInputs) {
            throw new Error(`Invalid preview input number... ${inputNumberInPreview} of ${numberOfInputs} inputs`)
        }
        if (inputNumberInProgram > numberOfInputs) {
            throw new Error(`Invalid program input number... ${inputNumberInProgram} of ${numberOfInputs} inputs`)
        }

        const programInputs = this.extractInputsFromXML(xmlDocument, { filters: { number: [inputNumberInProgram] } })
        const previewInputs = this.extractInputsFromXML(xmlDocument, { filters: { number: [inputNumberInPreview] } })

        const programInput = programInputs.length ? programInputs[0] : undefined
        const previewInput = previewInputs.length ? previewInputs[0] : undefined

        const programInputLayers = programInput ? this.mapSingle(programInput, true).layers : []
        const previewInputLayers = previewInput ? this.mapSingle(previewInput, true).layers : []

        // console.log('PROGRAM INPUT LAYERS', programInputLayers)
        // console.log('PREVIEW INPUT LAYERS', programInputLayers)

        const programInputLayersInputNumbers = programInputLayers && programInputLayers.length > 0 ? this.map(
            this.extractInputsFromXML(xmlDocument, { filters: { key: programInputLayers?.map(i => i.key) } })
        ).map(i => i.number) : []
        const previewInputLayersInputNumbers = previewInputLayers && previewInputLayers.length > 0 ? this.map(
            this.extractInputsFromXML(xmlDocument, { filters: { key: previewInputLayers?.map(i => i.key) } })
        ).map(i => i.number) : []

        return {
            program: [inputNumberInProgram, ...programInputLayersInputNumbers],
            preview: [inputNumberInPreview, ...previewInputLayersInputNumbers],

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