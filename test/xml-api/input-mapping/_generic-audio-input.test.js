// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
    <inputs>
        <input key="38cc6e59-9877-4982-bc43-f3a34bcb3a79" number="2" type="Audio" title="Audio Microphone" shortTitle="Audio Microphone" state="Running" position="0" duration="0" loop="False" muted="False" volume="100" balance="0" solo="False" audiobusses="MA" meterF1="0.03915471" meterF2="0.0791242" gainDb="0">Audio Microphone</input>
    </inputs>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)
const input = inputs[0]

describe('xml-api-generic-audio-input-mapper', function () {
    it('should have mapped audio data', function () {
        // console.log('Blank input', input)

        assert.strictEqual(typeof input, 'object')

        // Assert the input were with correct base data
        assert.strictEqual(input.solo, false, 'Input containing audio channels should be abled to be soloed')
        assert.strictEqual(input.muted, false, 'Input containing audio channels should be abled to be muted')
        assert.strictEqual(input.balance, 0, 'Input containing audio channels should have a balance')
        assert.strictEqual(input.volume, 100, 'Input containing audio channels should have a volume')
        assert.strictEqual(typeof input.audioMeter, 'object', 'Input containing audio channels should have a audio meter object')
        assert.strictEqual(input.audioMeter.left, 0.03915471, 'Input containing audio channels should have a audio meter left')
        assert.strictEqual(input.audioMeter.right, 0.0791242, 'Input containing audio channels should have a audio meter right')
    })
})
