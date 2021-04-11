// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

// Raw XML data
const RAW_XML_DATA = `

<vmix>
	<version>24.0.0.56</version>
	<edition>Pro</edition>
	<fadeToBlack>False</fadeToBlack>
	<recording>False</recording>
	<external>False</external>
	<streaming>False</streaming>
	<playList>False</playList>
	<multiCorder>False</multiCorder>
	<fullscreen>False</fullscreen>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const vMixGeneralState = new vMixXmlApi.GeneralState(xmlDocument)

describe('xml-general-state', function () {
    it('should have software version number', function () {
        assert.strictEqual(vMixGeneralState.softwareVersion(), '24.0.0.56', 'Did not see expected version')
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
        assert.strictEqual(vMixGeneralState.externalOutput(), false)
    })

    it('should state whether fullscreen is active or not', function () {
        assert.strictEqual(vMixGeneralState.fullscreenOutput(), false)
    })

    it('should state whether is streaming or not', function () {
        assert.strictEqual(vMixGeneralState.streaming(), false)
    })

    it('should state whether playlist is active or not', function () {
        assert.strictEqual(vMixGeneralState.playlistActive(), false)
    })

    it('should state whether multicorder is active or not', function () {
        assert.strictEqual(vMixGeneralState.multiCorder(), false)
    })
})