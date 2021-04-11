// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')
const { AudioBusses } = vMixXmlApi

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
    <audio>
        <master volume="100" muted="False" meterF1="0.01" meterF2="0.02" headphonesVolume="100"/>
        <busA volume="100" muted="False" meterF1="0" meterF2="0"/>
        <busB volume="100" muted="False" meterF1="0" meterF2="0" name="MyBus"/>
    </audio>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)

describe('audio-busses', function () {
    it('should have a master bus from the sample data', function () {
        const masterBus = AudioBusses.master(xmlDocument)

        // console.log(masterBus)

        // Assert the master bus were found and has volume 100
        assert.strictEqual(masterBus.volume, 100, 'Did not see expected volume')
        assert.strictEqual(masterBus.muted, false, 'Did not see expected muted state')
        assert.strictEqual(masterBus.headphonesVolume, 100, 'Did not see expected headphones volume')
    })

    it('should have three busses in total including master bus from the sample data', function () {

        const audioBussesDict = AudioBusses.all(xmlDocument)

        const audioBussesList = Object.values(audioBussesDict)

        // Assert the master bus were found and has volume 100
        assert.strictEqual(audioBussesList.length, 3, 'Did not see expected number of audio busses')
    })

    it('should have two audio busses besides the master audio from the sample data', function () {

        const audioBussesDict = AudioBusses.busses(xmlDocument)
        const audioBussesList = Object.values(audioBussesDict)

        // Assert the master bus were found and has volume 100
        assert.strictEqual(audioBussesList.length, 2, 'Did not see expected number of audio busses')

        assert.strictEqual(audioBussesList[0].abbr, 'A', 'Did not see expected abbr of audio bus A')
        assert.strictEqual(audioBussesList[1].abbr, 'B', 'Did not see expected abbr of audio bus B')
    })
})