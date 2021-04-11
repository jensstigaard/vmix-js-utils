
const { XmlApi: vMixXmlApi } = require('../../dist/index')

// Read XML data
const RAW_XML_DATA = `
<vmix>
    <version>24.0.0.56</version>
    <audio>
        <master volume="100" muted="False" meterF1="0.01" meterF2="0.02" headphonesVolume="100"/>
        <busA volume="100" muted="False" meterF1="0" meterF2="0"/>
        <busB volume="100" muted="False" meterF1="0" meterF2="0" name="MyBus"/>
    </audio>
</vmix>
`

const xmlDocument = vMixXmlApi.DataParser.parse(RAW_XML_DATA)

const masterBus = vMixXmlApi.AudioBusses.master(xmlDocument)
const busses = vMixXmlApi.AudioBusses.busses(xmlDocument)
const all = vMixXmlApi.AudioBusses.all(xmlDocument)

console.log('Master audio bus', masterBus)
console.log('Additional audio busses', busses)

console.log('All audio busses (master + additional)', busses)
