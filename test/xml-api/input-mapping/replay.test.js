// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

const TEST_DATA_FILE_PATH = './_data/replay.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)

// Manipulate to wanted format
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

describe('xml-replay', function () {
    it('should have a replay input and replay preview from the sample data', function () {
        const replayInput = inputs.find(input => input.type === 'Replay')
        const replayPreviewInput = inputs.find(input => input.type === 'ReplayPreview')


        // console.log(replayInput)
        // console.log(replayPreviewInput)

        // Assert the replay input
        assert.strictEqual(replayInput.type, 'Replay', 'Did not see expected replay input')
        assert.strictEqual(replayPreviewInput.type, 'ReplayPreview', 'Did not see expected replay preview input')

        // Check replay attributes
        const replay = replayInput.replay
        assert.strictEqual(typeof replay.live, 'boolean')
        assert.strictEqual(replay.live, false)
    })

})