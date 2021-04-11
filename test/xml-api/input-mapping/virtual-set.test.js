// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = `<vmix><inputs>
<input key="4b3321a9-c986-4b1e-8b66-387e54c0c571" number="6" type="VirtualSet" title="VDoubleBox-BlueDiamond" shortTitle="VDoubleBox-BlueDiamond" state="Paused" position="0" duration="0" loop="False" selectedIndex="0">
VDoubleBox-BlueDiamond
<overlay index="0" key="d2ecc7f3-b196-49dc-8b2a-49febe6927a5"/>
<overlay index="1" key="27a20978-424f-4c2b-95cd-0bf6722edf44"/>
<overlay index="2" key="99473051-f63b-4949-88bf-67d142c1a3b6">
<position panX="-0.49" panY="0.056" zoomX="0.70375" zoomY="0.70375"/>
</overlay>
<overlay index="3" key="47d2f4cb-a30c-407d-a210-d828bb40500d">
<position panX="0.49" panY="0.056" zoomX="0.70375" zoomY="0.70375"/>
</overlay>
<overlay index="4" key="42ca38af-ac4f-4600-bc3f-2da84463b516"/>
<overlay index="5" key="9ba1be73-47c4-48c1-b635-52637bed7e93"/>
</input>
</inputs></vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const input = inputs[0]

describe('xml-api-virtual-set-input-mapper', function () {
    it('should extend playable input', function () {
        // console.log(input)
        assert(typeof input, 'object')
        assert.strictEqual(input.type, 'VirtualSet')

    })
    it('should have 6 layers', function () {
        assert.strictEqual(input.layers.length, 6)
    })

    it('should have basic index and key info in each layer', function () {
        assert.strictEqual(typeof input.layers[0], 'object')
        assert.strictEqual(typeof input.layers[0].index, 'number')
        assert.strictEqual(typeof input.layers[0].key, 'string')
        assert.strictEqual(input.layers[0].index, 0)
        assert.strictEqual(input.layers[0].key, 'd2ecc7f3-b196-49dc-8b2a-49febe6927a5')
    })


    it('should have position data in layer with index 2', function () {
        const layer = input.layers[2]
        assert.strictEqual(typeof layer, 'object')
        assert.strictEqual(layer.index, 2)

        const position = layer.position

        assert.strictEqual(typeof position, 'object')
        assert.strictEqual(typeof position.pan, 'object')
        assert.strictEqual(typeof position.zoom, 'object')

        assert.strictEqual(typeof position.pan.x, 'number')
        assert.strictEqual(typeof position.pan.y, 'number')
        
        assert.strictEqual(typeof position.zoom.x, 'number')
        assert.strictEqual(typeof position.zoom.y, 'number')
        
        // console.log(position)
        // <position panX="-0.49" panY="0.056" zoomX="0.70375" zoomY="0.70375"/>
        assert.strictEqual(position.pan.x, -0.49)
        assert.strictEqual(position.pan.y, 0.056)

        assert.strictEqual(position.zoom.x, 0.70375)
        assert.strictEqual(position.zoom.y, 0.70375)

    })
})
