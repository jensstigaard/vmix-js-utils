// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')


const TEST_DATA_FILE_PATH = './data/replay.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const inputs = vMixXmlApi.InputMapping.extractInputsFromXML(xmlDocument)

// Manipulate to wanted format
const inputsMap = vMixXmlApi.InputMapping.mapInputs(inputs)
const inputsList = Object.values(inputsMap)

describe('xml-replay', function () {
    it('should have a replay input and replay preview from the sample data', function () {
        const replayInput = inputsList.find(input => input.type === 'Replay')
        const replayPreviewInput = inputsList.find(input => input.type === 'ReplayPreview')

        // console.log(replayInput)

        // Assert the replay input
        assert.strictEqual(replayInput.type, 'Replay', 'Did not see expected replay input')
        assert.strictEqual(typeof replayInput.replay, 'object', 'Did not see expected replay input specific info')

        assert.strictEqual(replayPreviewInput.type, 'ReplayPreview', 'Did not see expected replay preview input')
    })

})