// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './_data/transitions.xml'

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <inputs>
        <input key="a3d30f16-3d62-485a-8c7f-0bbeb844e78b" number="1" type="Mix" title="Mix2" shortTitle="Mix2" state="Paused" position="0" duration="0" loop="False">
            Mix2
            <overlay index="0" key="69d87c32-54e0-4450-a356-315932d72efb"/>
            <overlay index="1" key="b445c868-23c0-45ea-817f-a7c5ddca8e66"/>
        </input>
        <input key="69d87c32-54e0-4450-a356-315932d72efb" number="2" type="GT" title="text middle centre left right sharp.gtzip" shortTitle="text middle centre left right sharp.gtzip" state="Running" position="0" duration="0" loop="False" selectedIndex="0">
            text middle centre left right sharp.gtzip
        </input>
        <input key="b445c868-23c0-45ea-817f-a7c5ddca8e66" number="3" type="GT" title="Scoreboard 2- Lineup.gtzip" shortTitle="Scoreboard 2- Lineup.gtzip" state="Paused" position="0" duration="0" loop="False" selectedIndex="0">
            abc
        </input>
        <input key="a9967373-edee-4322-9efe-e29885d6bc25" number="4" type="VirtualSet" title="1 virtualstudiosets.com_9B-MID" shortTitle="1 virtualstudiosets.com_9B-MID" state="Paused" position="0" duration="0" loop="False" selectedIndex="1">
            1 virtualstudiosets.com_9B-MID
            <overlay index="0" key="69d87c32-54e0-4450-a356-315932d72efb"/>
            <overlay index="1" key="5addb368-dc84-4797-81e3-1791b3b3190c"/>
            <overlay index="2" key="c4f3834b-1844-49c8-a190-b3a0bcf0565c"/>
            <overlay index="3" key="0adf56e8-b1fa-4e6d-a6f7-9735429cd466">
                <position panY="-0.7" zoomY="0.3"/>
            </overlay>
            <position zoomX="2" zoomY="2"/>
        </input>
    </inputs>
    <preview>1</preview>
    <active>2</active>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const tallyInfo = vMixXmlApi.Inputs.mapTallyInfo(xmlDocument)

describe('xml-transitions', function () {
    it('has a tally state', function () {
        assert.strictEqual(typeof tallyInfo, 'object')
        assert.strictEqual(typeof tallyInfo['program'], 'object')
        assert.strictEqual(typeof tallyInfo['preview'], 'object')

        assert.deepStrictEqual(tallyInfo['program'], [2])
        assert.deepStrictEqual(tallyInfo['preview'], [1,2,3])
    })

})