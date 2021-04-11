// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

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
const instantReplayInput = vMixXmlApi.InstantReplay.get(xmlDocument)

// Check replay attributes
const replay = instantReplayInput.replay

describe('xml-replay', function () {

    it('should have a replay input and replay preview from the sample data', function () {
        // console.log(replayInput)
        // console.log(replayPreviewInput)

        // Assert the replay input
        assert.strictEqual(instantReplayInput.type, 'Replay', 'Did not see expected replay input')

    })

    it('should have a replay input which has states whether in live mode or not', function () {
        assert.strictEqual(typeof replay.live, 'boolean')
        assert.strictEqual(replay.live, false)
    })

    it('should have a replay input which has states whether recording or not', function () {
        assert.strictEqual(typeof replay.recording, 'boolean')
        assert.strictEqual(replay.live, false)
    })

    it('should have a replay input which has states whether channelMode is AB, A or B', function () {
        assert.strictEqual(typeof replay.channelMode, 'string')
        assert.strictEqual(replay.channelMode, 'B')
    })

    it('should have a replay input which has timecode date', function () {
        assert.strictEqual(typeof replay.timecode, 'object')
        assert.strictEqual(replay.timecode.toISOString(), '2020-04-26T08:50:22.720Z')
    })

    it('should have a replay input which has replay channel A state', function () {
        assert.strictEqual(typeof replay.channelA, 'object')

        assert.strictEqual(replay.channelA.eventBank, 1)
        assert.strictEqual(replay.channelA.camera, 1)
        assert.strictEqual(replay.channelA.speed, 1)

        assert.strictEqual(typeof replay.channelA.timecode, 'object')
        assert.strictEqual(replay.channelA.timecode.toISOString(), '2020-04-26T08:50:51.740Z')
    })

    it('should have a replay input which has replay channel A state', function () {
        assert.strictEqual(typeof replay.channelB, 'object')

        assert.strictEqual(replay.channelB.eventBank, 1)
        assert.strictEqual(replay.channelB.camera, 1)
        assert.strictEqual(replay.channelB.speed, 1)

        assert.strictEqual(typeof replay.channelB.timecode, 'object')
        assert.strictEqual(replay.channelB.timecode.toISOString(), '2020-04-26T08:50:22.720Z')
    })

})