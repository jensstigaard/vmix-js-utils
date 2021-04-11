// File system
const fs = require('fs')
const path = require('path')

// Using assert library
const assert = require('assert')

// Import the modules
const vMixApi = require('../../dist/modules/xml-api')
const { XmlApi } = require('../../dist')

describe('xml-api', function () {
    it('it can be imported directly in main module and in submodule', function () {
        assert.strictEqual(vMixApi, XmlApi)
    })
})