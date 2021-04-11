// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.51</version>
    <dynamic>
        <value1>ABC</value1>
        <value2/>
        <value3/>
        <value4/>
    </dynamic>
</vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
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