// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Read XML 
const RAW_XML_DATA = `
<vmix>
    <inputs>
        <input key="5bc97c3d-99e6-4bec-baae-30e358983c72" number="1" type="Replay" title="1080p50-vmix24 - A" shortTitle="1080p50-vmix24" state="Paused" position="62740" duration="106920" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0">
        1080p50-vmix24 - A
            <replay live="False" recording="False" channelMode="B" events="1" eventsA="1" eventsB="1" cameraA="1" cameraB="1" speed="1" speedA="1" speedB="1">
                <timecode>2020-04-26T10:50:22.720</timecode>
                <timecodeA>2020-04-26T10:50:51.740</timecodeA>
                <timecodeB>2020-04-26T10:50:22.720</timecodeB>
            </replay>
        </input>
        <input key="d6b08e7f-f616-4000-9e7d-4cedfda66367" number="2" type="ReplayPreview" title="1080p50-vmix24 - B" shortTitle="Replay" state="Paused" position="33720" duration="106920" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0">1080p50-vmix24 - B</input>
    </inputs>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)

const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const replayInput = inputs.find(input => input.type === 'Replay')
const replayPreviewInput = inputs.find(input => input.type === 'ReplayPreview')

// Check replay attributes
const replay = replayInput.replay

describe('xml-api-replay-input-mapper', function () {

    it('should have a replay input and replay preview from the sample data', function () {
        // console.log(replayInput)
        // console.log(replayPreviewInput)

        // Assert the replay input
        assert.strictEqual(replayInput.type, 'Replay', 'Did not see expected replay input')
        assert.strictEqual(replayPreviewInput.type, 'ReplayPreview', 'Did not see expected replay preview input')

    })
})
