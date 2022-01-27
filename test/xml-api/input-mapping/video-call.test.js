// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = `<vmix><inputs>
<input key="1de74a66-6c48-4081-a0b8-c5e688ded643" number="1" type="VideoCall" title="Call XYZ" shortTitle="Call XYZ" state="Running" position="0" duration="0" loop="False" muted="False" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0" gainDb="0" callPassword="2838532823" callConnected="False" callVideoSource="Output1" callAudioSource="Master">Call 2838532823</input>
</inputs></vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const input = inputs[0]

describe('xml-api-video-call-input-mapper', function () {
    it('should extend playable input', function () {
        // console.log(input)
        assert(typeof input, 'object')
        assert.strictEqual(input.type, 'VideoCall')

        // Assert the input were with correct playable data
        assert.strictEqual(input.shortTitle, 'Call XYZ')
        assert.strictEqual(input.state, 'Running')
        assert.strictEqual(input.position, 0)
    })
    it('has video call specific properties', function () {
        assert.strictEqual(input.videoCall.password, '2838532823')
        assert.strictEqual(input.videoCall.isConnected, false)
        assert.strictEqual(input.videoCall.videoSource, 'Output1')
        assert.strictEqual(input.videoCall.audioSource, 'Master')
    })
})
