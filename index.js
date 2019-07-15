// Examples can be found in the /examples folder

// Exposing the util classes - used by npm
module.exports = {
    ApiDataParser: require('./src/api-data-parser'),
    // CommandSender: require('./src/command-sender'),
    Connection: require('./src/connection-tcp'),
    ConnectionHTTP: require('./src/connection-http'),
    InputMapper: require('./src/input-mapper'),
    // StateFetcher: require('./src/state-fetcher'),
}