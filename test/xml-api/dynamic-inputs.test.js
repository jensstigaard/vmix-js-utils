// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

// Raw XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
    <dynamic>
        <input1>3</input1>
        <input2/>
        <input3/>
        <input4/>
    </dynamic>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const dynamicInputs = vMixXmlApi.DynamicInputs.extract(xmlDocument)

describe('xml-api-dynamic-inputs', function () {
    it('should have 4 dynamic inputs', function () {
        assert.strictEqual(typeof dynamicInputs, 'object')

        // First value is set
        assert.strictEqual(typeof dynamicInputs['1'], 'number')
        assert.strictEqual(dynamicInputs['1'], 3)

        // Rest (2,3,4) is null
        assert.strictEqual(dynamicInputs['2'], null)
        assert.strictEqual(dynamicInputs['3'], null)
        assert.strictEqual(dynamicInputs['4'], null)
    })
})
