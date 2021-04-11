// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')
const { PlayableInput } = require('../../../dist/types/input')

const TEST_DATA_FILE_PATH = './_data/video.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const inputs = vMixXmlApi.Inputs.map(
    vMixXmlApi.Inputs.extractInputsFromXML(
        xmlDocument
    )
)
const input = inputs[0]

describe('xml-api-video-input-mapper', function () {
    it('should extend playable input', function () {
        // console.log(input)
        assert(typeof input, 'object')
        assert.strictEqual(input.type, 'Video')

        // Assert the input were with correct playable data
        assert.strictEqual(input.shortTitle, 'Grey 3D Flourish.mp4')
        assert.strictEqual(input.state, 'Running')
        assert.strictEqual(input.position, 22797)
    })
})
