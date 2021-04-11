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

const allInputsXml = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const allInputs = vMixXmlApi.Inputs.map(allInputsXml)

describe('xml-api-inputs', function () {
    it('should have 5 inputs from the sample data', function () {
        // console.log(inputsList)

        // Assert the inputs were found
        assert.strictEqual(allInputs.length, 5, 'Did not see expected number of inputs')
    })

    it('should have 2 default inputs from the sample data which is both blank', function () {

        // Assert the inputs were found
        assert.strictEqual(allInputs[0].type, 'Blank')
        assert.strictEqual(allInputs[1].type, 'Blank')
    })

    it('should have input 1 as active preview', function () {
        const preview = vMixXmlApi.Inputs.extractPreviewInputNumber(xmlDocument)

        // Assert the preview input number
        assert.strictEqual(preview, 1)
    })

    it('should have input 2 as active program', function () {
        const program = vMixXmlApi.Inputs.extractProgramInputNumber(xmlDocument)

        // Assert the program input number
        assert.strictEqual(program, 2)
    })
})