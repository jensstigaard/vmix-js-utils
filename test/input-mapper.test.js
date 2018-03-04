// Using assert library
const assert = require('assert')

// Import the modules
const { ApiDataParser, InputMapper } = require('../index')

let data = `
<vmix>
<version>20.0.0.55</version>
<edition>Pro</edition>
<inputs>
<input key="69aa648d-3984-41bf-bd62-7255edff9a6d" number="1" type="Blank" title="Blank" state="Paused" position="0" duration="0" loop="False">Blank</input>
<input key="6723ec7c-6c15-409c-a838-0bf51a05711e" number="2" type="Blank" title="Blank" state="Paused" position="0" duration="0" loop="False">Blank</input>
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
<master volume="100" muted="False" meterF1="0" meterF2="0" headphonesVolume="100"/>
<busA volume="100" muted="False" meterF1="0" meterF2="0"/>
<busB volume="100" muted="False" meterF1="0" meterF2="0"/>
</audio>
</vmix>
`

describe('input-mapper', function () {
    it('should have 2 inputs from the sample data', function () {
        let xmlContent = ApiDataParser.parse(data)
        let inputs = InputMapper.extractInputsFromXML(xmlContent)

        // Manipulate to wanted format
        let inputsMap = InputMapper.mapInputs(inputs)
        let inputsList = Object.values(inputsMap)

        // Assert the inputs were found
        assert.equal(inputsList.length, 2, 'Did not find inputs')
        assert.equal(inputsMap['69aa648d-3984-41bf-bd62-7255edff9a6d'].type, 'Blank')
        assert.equal(inputsMap['69aa648d-3984-41bf-bd62-7255edff9a6d'].state, 'Paused')
    })
})