// Examples can be found in the /examples folder

// Exposing the util classes - used by npm
module.exports = {
    ApiDataParser: require('./src/api-data-parser'),

    Connection: require('./src/connection-tcp'),

    InputMapper: require('./src/input-mapper'),

    // StateFetcher: require('./src/state-fetcher'),

    // Legacy classes: 
    // HTTP connection and command-sender
    CommandSenderHTTP: require('./src/command-sender-http'),
    ConnectionHTTP: require('./src/connection-http'),
}