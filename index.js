const Connection = require('./src/connection')
const StateFetcher = require('./src/state-fetcher')
const InputMapper = require('./src/input-mapper')
const ApiDataParser = require('./src/api-data-parser')
const CommandSender = require('./src/command-sender')

// Connection - where is your vMix web controller located?
let connection = new Connection('localhost', 8088)

let stateFetcher = new StateFetcher(connection)

// Register callback on success - when data was fetched, what to do with it?
stateFetcher.registerCallbackOnSuccess(data => {
    let xmlContent = ApiDataParser.parse(data)
    let inputs = InputMapper.extractInputsFromXML(xmlContent)
    let inputsMap = InputMapper.mapInputs(inputs)
    let inputsList = Object.values(inputsMap)

    console.log("I did read from the vMix API! Inputs: ", inputs.length)
})

stateFetcher.registerCallbackOnError(error => {
    console.error(`Error.. Not able to read API data from a vMix web controller.. Trying again in ${stateFetcher.currentRefreshRate()}ms`)
    //console.error(error)
})

stateFetcher.start()

let commandSender = new CommandSender(connection)

// Perform a command - Cut!
commandSender.send({ Function: 'Cut' })
    .catch(error => console.error('Could not perform cut'))
    .then(response => console.log('Performed cut', response))