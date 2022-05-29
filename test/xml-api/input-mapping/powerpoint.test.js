// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = `<vmix><inputs>
<input key="5a2176ce-64ef-41bd-a077-3c4fcb45b52a" number="3" type="PowerPoint" title="vmix_test.pptx - Slide2" shortTitle="vmix_test.pptx" state="Paused" position="1" duration="2" loop="False" selectedIndex="2">vmix_test.pptx - Slide2</input>
</inputs></vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const input = inputs[0]

describe('xml-api-powerpoint-input-mapper', function () {
    it('should extend playable input', function () {
        // console.log(input)
        assert(typeof input, 'object')
        assert.strictEqual(input.type, 'PowerPoint')

        // Assert the input were with correct playable data
        assert.strictEqual(input.shortTitle, 'vmix_test.pptx')
        // Title is including the slide number
        assert.strictEqual(input.title, 'vmix_test.pptx - Slide2')
        assert.strictEqual(input.state, 'Paused')
        assert.strictEqual(input.position, 1) // Don't know actually what this value is for powerpoint inputs
        assert.strictEqual(input.currentSlideNumber, 2) // Current slide number
        assert.strictEqual(input.duration, 2) // Number of slides
    })
})
