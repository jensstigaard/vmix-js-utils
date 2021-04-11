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
    <mix number="2">
        <preview>1</preview>
        <active>3</active>
    </mix>
    <mix number="3">
        <preview>0</preview>
        <active>0</active>
    </mix>
    <mix number="4">
        <preview>0</preview>
        <active>0</active>
    </mix>
</vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const mixes = vMixXmlApi.Mixes.all(xmlDocument)

describe('xml-api-mixes', function () {
    it('should have up to 3 mixes', function () {

        // console.log(mixes)

        assert.strictEqual(typeof mixes, 'object')
        assert.strictEqual(mixes.length, 3)
        // Mix 2
        assert.strictEqual(typeof mixes[0], 'object')
        assert.strictEqual(mixes[0].number, 2)
        assert.strictEqual(mixes[0].preview, 1)
        assert.strictEqual(mixes[0].active, 3)

        // Mix 3 and 4 has no inputs set as preview or active
        assert.strictEqual(mixes[1].number, 3)
        assert.strictEqual(mixes[1].preview, 0)
        assert.strictEqual(mixes[1].active, 0)

        assert.strictEqual(mixes[2].number, 4)
        assert.strictEqual(mixes[2].preview, 0)
        assert.strictEqual(mixes[2].active, 0)
    })
})