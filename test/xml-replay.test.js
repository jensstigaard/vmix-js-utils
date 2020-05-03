// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApiDataParser, XmlInputMapper } = require('../dist/index')

const data = `
<vmix>
<version>20.0.0.55</version>
<edition>Pro</edition>
<inputs>
<input key="69aa648d-3984-41bf-bd62-7255edff9a6d" number="1" type="Blank" title="Blank" state="Paused" position="0" duration="0" loop="False">Blank</input>
<input key="6723ec7c-6c15-409c-a838-0bf51a05711e" number="2" type="Blank" title="Blank" state="Paused" position="0" duration="0" loop="False">Blank</input>
<input key="5bc97c3d-99e6-4bec-baae-30e358983c72" number="7" type="Replay" title="1080p50-vmix24 - A" shortTitle="1080p50-vmix24" state="Paused" position="62740" duration="106920" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0">
1080p50-vmix24 - A
<replay live="False" recording="False" channelMode="B" events="1" eventsA="1" eventsB="1" cameraA="1" cameraB="1" speed="1" speedA="1" speedB="1">
<timecode>2020-04-26T10:50:22.720</timecode>
<timecodeA>2020-04-26T10:50:51.740</timecodeA>
<timecodeB>2020-04-26T10:50:22.720</timecodeB>
</replay>
</input>
<input key="d6b08e7f-f616-4000-9e7d-4cedfda66367" number="8" type="ReplayPreview" title="1080p50-vmix24 - B" shortTitle="Replay" state="Paused" position="33720" duration="106920" loop="False" muted="True" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0">1080p50-vmix24 - B</input>
</inputs>
<overlays>
<overlay number="1"/>
<overlay number="2"/>
<overlay number="3"/>
<overlay number="4"/>
<overlay number="5"/>
<overlay number="6"/>
</overlays>
<preview>1</preview>
<active>2</active>
<fadeToBlack>False</fadeToBlack>
<transitions>
<transition number="1" effect="Fade" duration="500"/>
<transition number="2" effect="Merge" duration="1000"/>
<transition number="3" effect="Wipe" duration="1000"/>
<transition number="4" effect="CubeZoom" duration="1000"/>
</transitions>
<recording>False</recording>
<external>False</external>
<streaming>False</streaming>
<playList>False</playList>
<multiCorder>False</multiCorder>
<fullscreen>False</fullscreen>
<audio>
<master volume="100" muted="False" meterF1="0.01" meterF2="0.02" headphonesVolume="100"/>
<busA volume="100" muted="False" meterF1="0" meterF2="0"/>
<busB volume="100" muted="False" meterF1="0" meterF2="0"/>
</audio>
</vmix>
`

const xmlContent = XmlApiDataParser.parse(data)
const inputs = XmlInputMapper.extractInputsFromXML(xmlContent)

// Manipulate to wanted format
const inputsMap = XmlInputMapper.mapInputs(inputs)
const inputsList = Object.values(inputsMap)

describe('xml-replay', function () {
    it('should have a replay input and replay preview from the sample data', function () {
        const replayInput = inputsList.find(input => input.type === 'Replay')
        const replayPreviewInput = inputsList.find(input => input.type === 'ReplayPreview')

        // console.log(replayInput)

        // Assert the replay input
        assert.equal(replayInput.type, 'Replay', 'Did not see expected replay input')
        assert.equal(typeof replayInput.replay, 'object', 'Did not see expected replay input specific info')

        assert.equal(replayPreviewInput.type, 'ReplayPreview', 'Did not see expected replay preview input')
    })

})