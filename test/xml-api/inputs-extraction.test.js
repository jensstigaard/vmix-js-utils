// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './_data/inputs.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)


describe('xml-api-inputs-extraction', function () {

    it('should have 2 inputs having input number 5, 6 or 7', function () {
        // Input number 7 does not exist
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { number: [5, 6, 7] } })
        assert.strictEqual(inputs.length, 2)
    })

    it('should have 2 inputs of type Blank', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { type: 'Blank' } })
        assert.strictEqual(inputs.length, 2)
    })

    it('should have 1 input of type GT', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { type: 'GT' } })
        assert.strictEqual(inputs.length, 1)
    })

    it('should have 2 inputs of type Xaml', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { type: 'Xaml' } })
        assert.strictEqual(inputs.length, 2)
    })

    it('should have 1 input of type GT or Xaml', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { type: ['GT', 'Xaml'] } })
        assert.strictEqual(inputs.length, 3)
    })

    it('should have 4 inputs having state-attribute', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { hasAttrs: 'state' } })
        assert.strictEqual(inputs.length, 4)
    })

    it('should have 3 inputs having selectedIndex-attribute', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { hasAttrs: 'selectedIndex' } })
        assert.strictEqual(inputs.length, 3)
    })

    it('should have 2 inputs having state and selectedIndex attribute', function () {
        const inputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument, { filters: { hasAttrs: ['state', 'selectedIndex'] } })
        assert.strictEqual(inputs.length, 2)
    })
})