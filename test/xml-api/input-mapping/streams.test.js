// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
    <inputs>
        <input key="2423ad3c-184f-44ad-a062-932aa3486585" number="9" type="SRT" title="SRT localhost 10000" shortTitle="SRT localhost 10000" state="Running" position="0" duration="0" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0" gainDb="0">SRT localhost 10000</input>
        <input key="15418420-16c4-4fd6-bc27-d7b95d10c4e1" number="10" type="Stream" title="RTSPUDP rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" shortTitle="RTSPUDP rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" state="Running" position="0" duration="0" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0.01793959" meterF2="0.0171895" gainDb="0">RTSPUDP rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov</input>
        <input key="7dcd7270-234f-4ae5-a8e3-101d0cca9e17" number="13" type="VLC" title="VLC rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" shortTitle="VLC rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" state="Running" position="0" duration="0" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0.2591553" meterF2="0.185791" gainDb="0">VLC rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov</input>
    </inputs>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const input = inputs[0]

describe('xml-api-streams-input-mapper', function () {
    it('should have srt stream as first input', function () {
        // console.log(input)
        assert(typeof inputs[0], 'object')
        assert.strictEqual(inputs[0].type, 'SRT')
    })

    it('should have rtsp stream as second input', function () {
        // console.log(input)
        assert(typeof inputs[1], 'object')
        assert.strictEqual(inputs[1].type, 'Stream')
    })

    it('should have VLC stream as second input', function () {
        // console.log(input)
        assert(typeof inputs[2], 'object')
        assert.strictEqual(inputs[2].type, 'VLC')
    })
})
