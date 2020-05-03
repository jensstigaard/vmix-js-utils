// Using assert library
const assert = require('assert')

// Import the modules
const { XmlApiDataParser, XmlGeneralState } = require('../dist/index')

const data = `
<vmix>
<version>24.0.0.22</version>
<edition>Pro</edition>
<preset>C:\Users\jens\AppData\Roaming\last.vmix</preset>
<inputs>
...
</inputs>
<overlays>
...
</overlays>
<preview>6</preview>
<active>2</active>
<fadeToBlack>False</fadeToBlack>
<transitions>
...
</transitions>
<recording>False</recording>
<external>False</external>
<streaming>False</streaming>
<playList>False</playList>
<multiCorder>False</multiCorder>
<fullscreen>False</fullscreen>
<audio>
...
</audio>
</vmix>
`
const xmlDocument = XmlApiDataParser.parse(data)
const vMixGeneralState = new XmlGeneralState(xmlDocument)

describe('xml-general-state', function () {
    it('should have software version number', function () {
        assert.equal(vMixGeneralState.softwareVersion(), '24.0.0.22', 'Did not see expected version')
    })

    it('should have a software edition', function () {
        assert.equal(vMixGeneralState.softwareEdition(), 'Pro')
    })

    it('should state whether is faded to black or not', function () {
        assert.equal(vMixGeneralState.fadedToBlack(), false)
    })

    it('should state whether is recording or not', function () {
        assert.equal(vMixGeneralState.recording(), false)
    })

    it('should state whether external is active or not', function () {
        assert.equal(vMixGeneralState.external(), false)
    })

    it('should state whether is streaming or not', function () {
        assert.equal(vMixGeneralState.streaming(), false)
    })

    it('should state whether playlist is active or not', function () {
        assert.equal(vMixGeneralState.playlist(), false)
    })

    it('should state whether multicorder is active or not', function () {
        assert.equal(vMixGeneralState.multiCorder(), false)
    })

    it('should state whether fullscreen is active or not', function () {
        assert.equal(vMixGeneralState.fullscreen(), false)
    })
})