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
<input key="c652efa9-edce-4d34-b4e2-bc49b092a290" number="4" type="GT" title="Scoreboard 3- Lineup 12.gtzip" shortTitle="Scoreboard 3- Lineup 12.gtzip" state="Paused" position="0" duration="0" loop="False" selectedIndex="0">
Scoreboard 3- Lineup 12.gtzip
<text index="0" name="Team Lineups.Text">team lineups</text>
<text index="1" name="Home Team.Text">HOME TEAM</text>
<text index="2" name="Away Team.Text">AWAY TEAM</text>
<text index="3" name="Home-Player1.Text">Home 1</text>
<text index="4" name="Home-Player2.Text">Home 2</text>
<text index="5" name="Home-Player3.Text">Home 3</text>
<text index="6" name="Home-Player4.Text">Home 4</text>
<text index="7" name="Home-Player5.Text">Home 5</text>
<text index="8" name="Home-Player6.Text">Home 6</text>
<text index="9" name="Home-Player7.Text">Home 7</text>
<text index="10" name="Home-Player8.Text">Home 8</text>
<text index="11" name="Home-Player9.Text">Home 9</text>
<text index="12" name="Home-Player10.Text">Home 10</text>
<text index="13" name="Home-Player11.Text">Home 11</text>
<text index="14" name="Home-Player12.Text">Home 12</text>
<text index="15" name="Away-Player1.Text">Away 1</text>
<text index="16" name="Away-Player2.Text">Away 2</text>
<text index="17" name="Away-Player3.Text">Away 3</text>
<text index="18" name="Away-Player4.Text">Away 4</text>
<text index="19" name="Away-Player5.Text">Away 5</text>
<text index="20" name="Away-Player6.Text">Away 6</text>
<text index="21" name="Away-Player7.Text">Away 7</text>
<text index="22" name="Away-Player8.Text">Away 8</text>
<text index="23" name="Away-Player9.Text">Away 9</text>
<text index="24" name="Away-Player10.Text">Away 10</text>
<text index="25" name="Away-Player11.Text">Away 11</text>
<text index="26" name="Away-Player12.Text">Away 12</text>
</input>
<input key="022ddaa1-3b10-4583-bbbc-ad8acc8c42d6" number="5" type="Xaml" title="TextHD.xaml" shortTitle="TextHD.xaml" state="Paused" position="0" duration="0" loop="False" selectedIndex="0">
TextHD.xaml
<text index="0" name="Message">Message</text>
<text index="1" name="Title">Title</text>
</input>
<input key="5ed442a6-fc56-4a1a-8a6f-944333f9752b" number="6" type="Xaml" title="SocialTitle1.xaml" shortTitle="SocialTitle1.xaml" state="Paused" position="0" duration="0" loop="False" selectedIndex="0">
SocialTitle1.xaml
<text index="0" name="FromUsername">Username</text>
<text index="1" name="Title">Title</text>
<text index="2" name="FromName">Name</text>
<text index="3" name="Message">Message goes here</text>
<image index="0" name="Object">
file:///C:/Program Files (x86)/vMix/titles/Social/SocialTitle1.png
</image>
<image index="1" name="FromPhoto">
file:///C:/Program Files (x86)/vMix/titles/Social/blank.png
</image>
<image index="2" name="Source">
file:///C:/Program Files (x86)/vMix/titles/Social/blank.png
</image>
<image index="3" name="Photo">
file:///C:/Program Files (x86)/vMix/titles/Social/blank.png
</image>
</input>
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
const xmlContent = XmlApiDataParser.parse(data)
const inputs = XmlInputMapper.extractInputsFromXML(xmlContent)

// Manipulate to wanted format
const inputsMap = XmlInputMapper.mapInputs(inputs)
const inputsList = Object.values(inputsMap)

describe('xml-input-mapper', function () {
    it('should have 5 inputs from the sample data', function () {
        // console.log(inputsList)

        // Assert the inputs were found
        assert.equal(inputsList.length, 5, 'Did not See expected number of inputs')
    })

    it('should have 2 default inputs from the sample data which is both blank', function () {

        // Assert the inputs were found
        assert.equal(inputsList[0].type, 'Blank')
        assert.equal(inputsList[1].type, 'Blank')
    })

    it('should have input 1 as active preview', function () {
        const preview = XmlInputMapper.extractPreviewFromXML(xmlContent)

        // Assert the preview input number
        assert.equal(preview, 1)
    })

    it('should have input 2 as active program', function () {
        const program = XmlInputMapper.extractProgramFromXML(xmlContent)

        // Assert the program input number
        assert.equal(program, 2)
    })

    it('should have a GT title on input 3 with title fields extracted', function () {
        const titleInput = inputsList[2]

        // console.log(titleInput)

        // Assert the input were found and with specific type
        assert.equal(titleInput.type, 'GT')
        // Assert all title fields loaded
        assert.equal(titleInput.fields.length, 27)
        // Assert all title fields loaded
        assert.equal(titleInput.fields[0].name, 'Team Lineups.Text')
    })

    it('should have a Xaml title on input 5 with title fields extracted', function () {
        const titleInput = inputsList[4]

        // console.log(titleInput)

        // Assert the input were found and with specific type
        assert.equal(titleInput.type, 'Xaml')
        // Assert all title fields loaded
        assert.equal(titleInput.fields.length, 8)
        // Assert all title fields loaded
        assert.equal(titleInput.fields[0].name, 'FromUsername')
    })
})