// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './_data/overlay-channels.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const overlays = vMixXmlApi.OverlayChannels.extract(xmlDocument)

describe('xml-overlay-channels', function () {
    it('should have 6 channels - 4 regular channels and 2 stinger channels', function () {

        assert.strictEqual(typeof overlays, 'object')
        assert.strictEqual(typeof overlays['1'], 'object')
        assert.strictEqual(typeof overlays['2'], 'object')
        assert.strictEqual(typeof overlays['3'], 'object')
        assert.strictEqual(typeof overlays['4'], 'object')
        assert.strictEqual(typeof overlays['5'], 'object')
        assert.strictEqual(typeof overlays['6'], 'object')

        assert.strictEqual(overlays['1'].inputNumber, null)
        assert.strictEqual(overlays['1'].inPreview, false)
    })

    it('should have input 1 in overlay channel 2 in preview mode', function () {
        assert.strictEqual(typeof overlays, 'object')
        assert.strictEqual(typeof overlays['2'], 'object')

        assert.strictEqual(overlays['2'].inputNumber, 1)
        assert.strictEqual(overlays['2'].inPreview, true)
    })

})