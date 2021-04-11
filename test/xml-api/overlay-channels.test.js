// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './_data/overlay-channels.xml'

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
	<overlays>
		<overlay number="1"/>
		<overlay number="2" preview="True">1</overlay>
		<overlay number="3">2</overlay>
		<overlay number="4"/>
		<overlay number="5"/>
		<overlay number="6"/>
		<overlay number="7"/>
		<overlay number="8"/>
	</overlays>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const overlays = vMixXmlApi.OverlayChannels.extract(xmlDocument)

describe('xml-overlay-channels', function () {
    it('should have 8 channels - 4 regular overlay channels and 4 stinger channels', function () {

        assert.strictEqual(typeof overlays, 'object')
        assert.strictEqual(typeof overlays['1'], 'object')
        assert.strictEqual(typeof overlays['2'], 'object')
        assert.strictEqual(typeof overlays['3'], 'object')
        assert.strictEqual(typeof overlays['4'], 'object')
        assert.strictEqual(typeof overlays['5'], 'object')
        assert.strictEqual(typeof overlays['6'], 'object')
        assert.strictEqual(typeof overlays['7'], 'object')
        assert.strictEqual(typeof overlays['8'], 'object')

        assert.strictEqual(overlays['1'].inputNumber, null)
        assert.strictEqual(overlays['1'].inPreview, false)
    })

    it('should have input 1 in overlay channel 2 in preview mode', function () {
        assert.strictEqual(typeof overlays, 'object')
        assert.strictEqual(typeof overlays['2'], 'object')

        assert.strictEqual(overlays['2'].inputNumber, 1)
        assert.strictEqual(overlays['2'].inPreview, true)
    })

    it('should have input 2 in overlay channel 3', function () {
        assert.strictEqual(typeof overlays, 'object')
        assert.strictEqual(typeof overlays['3'], 'object')

        assert.strictEqual(overlays['3'].inputNumber, 2)
        assert.strictEqual(overlays['3'].inPreview, false)
    })

})