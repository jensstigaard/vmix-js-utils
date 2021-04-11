// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './_data/transitions.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const transitions = vMixXmlApi.Transitions.extract(xmlDocument)

describe('xml-overlay-channels', function () {
    it('should have 4 transitions', function () {
        assert.strictEqual(typeof transitions, 'object')
        assert.strictEqual(typeof transitions['1'], 'object')
        assert.strictEqual(typeof transitions['2'], 'object')
        assert.strictEqual(typeof transitions['3'], 'object')
        assert.strictEqual(typeof transitions['4'], 'object')

        assert.strictEqual(transitions['1'].effect, 'Fade')
        assert.strictEqual(transitions['1'].duration, 500)
    })

})