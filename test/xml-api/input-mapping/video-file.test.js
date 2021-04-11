
// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = `<vmix><inputs>
<input key="28143da4-fe95-4ea8-a41d-2dd7c588cd21" number="1" type="Video" title="Grey 3D Flourish.mp4" shortTitle="Grey 3D Flourish.mp4" state="Running" position="22797" duration="30000" markIn="15320" loop="True" muted="False" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0" gainDb="0">Grey 3D Flourish.mp4</input>
</inputs></vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const input = inputs[0]

describe('xml-api-video-input-mapper', function () {
    it('should extend playable input', function () {
        // console.log(input)
        assert(typeof input, 'object')
        assert.strictEqual(input.type, 'Video')

        // Assert the input were with correct playable data
        assert.strictEqual(input.shortTitle, 'Grey 3D Flourish.mp4')
        assert.strictEqual(input.state, 'Running')
        assert.strictEqual(input.position, 22797)
    })
})
