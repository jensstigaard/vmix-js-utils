// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../../dist/index')

// Raw XML data
const RAW_XML_DATA = String.raw`<vmix><inputs>
<input key="44727194-61c4-4af4-83db-21f438d414db" number="1" type="VideoList" title="List - Bokeh Background.mp4" shortTitle="List" state="Paused" position="0" duration="10010" loop="False" muted="False" volume="100" balance="0" solo="False" audiobusses="M" meterF1="0" meterF2="0" gainDb="0" selectedIndex="1">
List - Bokeh Background.mp4
<list>
<item selected="true">C:\Users\abc\Desktop\Bokeh Background.mp4</item>
<item>C:\Users\abc\Desktop\Background_4_f_Videvo.mov</item>
</list>
</input>
</inputs></vmix>`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

const input = inputs[0]

describe('xml-api-video-list-mapper', function () {
    it('should extend video input', function () {
        // console.log(input)
        assert(typeof input, 'object')
        assert.strictEqual(input.type, 'VideoList')
        
        // Assert the input were with correct video list data
        assert.strictEqual(input.shortTitle, 'List')
        assert.strictEqual(input.title, 'List - Bokeh Background.mp4')
        assert.strictEqual(input.state, 'Paused')
        assert.strictEqual(input.position, 0)
    })

    it('should include 2 video list items', function () {
        assert(typeof input.items, 'array')
        assert(input.items.length, 2)
    })
  
    it('should have first video list item as selected one', function () {
        const item = input.items[0]
        assert(item.filePath, 'C:\Users\abc\Desktop\Bokeh Background.mp4')
        assert(item.selected === true)
    })
  
    it('should have second video list item as non-selected one', function () {
        const item = input.items[1]
        assert(item.filePath, 'C:\\Users\\abc\\Desktop\\Background_4_f_Videvo.mov')
        assert(item.selected === false)
    })
})
