// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './data/general-state.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const vMixGeneralState = new vMixXmlApi.GeneralState(xmlDocument)

describe('xml-general-state', function () {
    it('should have software version number', function () {
        assert.strictEqual(vMixGeneralState.softwareVersion(), '24.0.0.22', 'Did not see expected version')
    })

    it('should have a software edition', function () {
        assert.strictEqual(vMixGeneralState.softwareEdition(), 'Pro')
    })

    it('should state whether is faded to black or not', function () {
        assert.strictEqual(vMixGeneralState.fadedToBlack(), false)
    })

    it('should state whether is recording or not', function () {
        assert.strictEqual(vMixGeneralState.recording(), false)
    })

    it('should state whether external is active or not', function () {
        assert.strictEqual(vMixGeneralState.external(), false)
    })

    it('should state whether is streaming or not', function () {
        assert.strictEqual(vMixGeneralState.streaming(), false)
    })

    it('should state whether playlist is active or not', function () {
        assert.strictEqual(vMixGeneralState.playlist(), false)
    })

    it('should state whether multicorder is active or not', function () {
        assert.strictEqual(vMixGeneralState.multiCorder(), false)
    })

    it('should state whether fullscreen is active or not', function () {
        assert.strictEqual(vMixGeneralState.fullscreen(), false)
    })
})