
const { XmlApi: vMixXmlApi } = require('../../dist/index')

// XML API data from vmix
// This is just an example
// You can use the node-vmix package to fetch this data
const data = `<vmix><inputs>
<input key="69aa648d-3984-41bf-bd62-7255edff9a6d" number="1" type="Blank" title="Camera 1" state="Paused" position="0" duration="0" loop="False">Blank</input>
<input key="6723ec7c-6c15-409c-a838-0bf51a05711e" number="2" type="Blank" title="Camera 2" state="Paused" position="0" duration="0" loop="False">Blank</input>
</inputs></vmix>`


const xmlDocument = vMixXmlApi.DataParser.parse(data)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)

// Manipulate to wanted format
const inputs = vMixXmlApi.Inputs.map(xmlInputs)

console.log('Number of inputs in vMix')
console.log(inputs.length)

console.log('All data extract - selective')
console.log(inputs)
