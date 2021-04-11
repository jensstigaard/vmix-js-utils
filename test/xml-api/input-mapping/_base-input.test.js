// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Read XML data
const RAW_XML_DATA = `<vmix><inputs>
<input key="28143da4-fe95-4ea8-a41d-2dd7c588cd21" number="1" type="Blank" title="MyInputTitle" shortTitle="MyInputTitle">MyInputTitle</input>
</inputs></vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
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