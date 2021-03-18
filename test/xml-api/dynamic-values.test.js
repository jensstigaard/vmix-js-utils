// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './data/dynamic-values.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const dynamicValues = vMixXmlApi.DynamicValues.extract(xmlDocument)

describe('xml-api-dynamic-values', function () {
    it('should have 4 dynamic values', function () {

        // console.log(dynamicValues)

        assert.strictEqual(typeof dynamicValues, 'object')
        // First value is set
        assert.strictEqual(typeof dynamicValues['1'], 'string')
        assert.strictEqual(dynamicValues['1'], 'ABC')

        // Rest (2,3,4) is null
        assert.strictEqual(dynamicValues['2'], null)
        assert.strictEqual(dynamicValues['3'], null)
        assert.strictEqual(dynamicValues['4'], null)
    })
})