// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Read XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
    <inputs>
        <input key="28143da4-fe95-4ea8-a41d-2dd7c588cd21" number="1" type="Blank" title="MyInputTitle" shortTitle="MyInputTitle">MyInputTitle</input>
    </inputs>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)
const inputsWithoutLayers = vMixXmlApi.Inputs.map(xmlInputs, includeLayers = false)
const input = inputs[0]
const inputWithoutLayers = inputsWithoutLayers[0]

describe('xml-api-base-input-mapper', function () {
    it('should have mapped data', function () {
        // console.log('Blank input', input)

        assert.strictEqual(typeof input, 'object')
        assert.deepStrictEqual(Object.keys(input), ['key', 'type', 'number', 'title', 'layers'])

        // Assert the input were with correct base data
        assert.strictEqual(input.number, 1)
        assert.strictEqual(input.type, 'Blank')
        assert.strictEqual(input.title, 'MyInputTitle')
    })

    it('should have mapped data but without layers', function () {
        // console.log('Blank input', input)

        assert.strictEqual(typeof inputWithoutLayers, 'object')
        assert.deepStrictEqual(Object.keys(inputWithoutLayers), ['key', 'type', 'number', 'title'])

        // Assert the input were with correct base data
        assert.strictEqual(inputWithoutLayers.number, 1)
        assert.strictEqual(inputWithoutLayers.type, 'Blank')
        assert.strictEqual(inputWithoutLayers.title, 'MyInputTitle')
    })
})