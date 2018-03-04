const Connection = require('./src/connection')
const StateFetcher = require('./src/state-fetcher')
const InputMapper = require('./src/input-mapper')
const ApiDataParser = require('./src/api-data-parser')

let connection = new Connection()
let stateFetcher = new StateFetcher(connection)

stateFetcher.registerCallbackOnSuccess(data => {
    let xmlContent = ApiDataParser.parse(data)
    let inputs = InputMapper.extractInputsFromXML(xmlContent)
    let inputsMap = InputMapper.mapInputs(inputs)
    let inputsList = Object.values(inputsMap)

    console.log("YES", inputs.length, inputsList[0])
})

stateFetcher.registerCallbackOnError(data => {
    console.error("Error..", data)
})

stateFetcher.start()