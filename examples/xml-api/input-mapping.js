
const { XmlApi: vMixXmlApi } = require('../../dist/index')

// XML API data from vmix
// This is just an example
// You can use the node-vmix package to fetch this data 
const data = `
<vmix>
<more>...</more>
<inputs>
<input key="69aa648d-3984-41bf-bd62-7255edff9a6d" number="1" type="Blank" title="Camera 1" state="Paused" position="0" duration="0" loop="False">Blank</input>
<input key="6723ec7c-6c15-409c-a838-0bf51a05711e" number="2" type="Blank" title="Camera 2" state="Paused" position="0" duration="0" loop="False">Blank</input>
</inputs>
<more>...</more>
</vmix>
`


const xmlDocument = vMixXmlApi.DataParser.parse(data)
const inputs = vMixXmlApi.InputMapping.extractInputsFromXML(xmlDocument)

// Manipulate to wanted format
const inputsMap = vMixXmlApi.InputMapping.mapInputs(inputs)
const inputsList = Object.values(inputsMap)

console.log('Number of inputs in vMix')
console.log(inputsList.length)

console.log('Title of first input')
console.log(inputsList[0].title)
