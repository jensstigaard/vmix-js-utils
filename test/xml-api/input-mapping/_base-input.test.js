// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')


const TEST_DATA_FILE_PATH = './_data/blank.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)
const input = inputs[0]

describe('xml-api-base-input-mapper', function () {
    it('should have mapped data', function () {
        // console.log('Blank input', input)

        assert.strictEqual(typeof input, 'object')

        // Assert the input were with correct base data
        assert.strictEqual(input.number, 1)
        assert.strictEqual(input.type, 'Blank')
        assert.strictEqual(input.title, 'MyInputTitle')
    })
})