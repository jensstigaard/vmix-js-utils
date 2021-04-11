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
	<version>20.0.0.55</version>
	<transitions>
		<transition number="1" effect="Fade" duration="500"/>
		<transition number="2" effect="Merge" duration="1000"/>
		<transition number="3" effect="Wipe" duration="1000"/>
		<transition number="4" effect="CubeZoom" duration="1000"/>
	</transitions>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const transitions = vMixXmlApi.Transitions.extract(xmlDocument)

describe('xml-replay', function () {
    it('has a replay state when replay input is present', function () {
        assert.strictEqual(typeof transitions, 'object')
        assert.strictEqual(typeof transitions['1'], 'object')
        assert.strictEqual(typeof transitions['2'], 'object')
        assert.strictEqual(typeof transitions['3'], 'object')
        assert.strictEqual(typeof transitions['4'], 'object')

        assert.strictEqual(transitions['1'].effect, 'Fade')
        assert.strictEqual(transitions['1'].duration, 500)
    })

})