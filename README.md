# vMix-js-utils
Javascript utilities for communicating with vMix API either via TCP or HTTP.

It is recommended to use TCP, however, there is currently not implemented feedback/response.
It is possible to implement this yourself if necessary, by analysing the responses, but it is not supported out of the box.

[![package json version](https://img.shields.io/github/package-json/v/jensstigaard/vmix-js-utils.svg)](https://www.github/jensstigaard/vmix-js-utils)
[![npm version](https://badge.fury.io/js/vmix-js-utils.svg)](https://www.npmjs.com/package/vmix-js-utils)

NOTE: Currently work in progress to implement TCP api. No tests for TCP implemented yet

```javascript
const { Connection, StateFetcher } = require('vmix-js-utils')

const connection = new Connection('localhost', 8088)
const stateFetcher = new StateFetcher(connection)

stateFetcher.onSuccess(response => {
 // Your logic here!
 // See example to parse the XML correctly
})

stateFetcher.start()
```
# Purpose
The utilities consists of several modules. Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.
The modules is as following:
 - Connection
 - ApiDataParser - Parses the raw XML data from into parsed and structured XML
 - InputMapper - Maps the inputs from the vMix instance state to JSON objects
 - StateFetcher - Fetches the current state of the vMix instance

The modules are coded as classes, meaning that they are constructed with specific parameters, e.g. that the instanciation of a connection needs a host and a port. 

# Description of modules
## Connection
The 'Connection' module is the core of the utils, and allows you to establish communication to a vMix instance.
It let you define which vMix TCP endpoint you want to receive from and send commands to, by passing the IP address to the constructor. You are also able to pass a custom port if it is not using the default port 8099. 

`.send(commands)`

Parameters:
 - **commands**: `{Array|Object|String}` - Array, Object or String of the command(s) to be send. Commands parsed as objects are treated as commands that is executing as FUNCTION. These fust include the Function parameter, e.g. 'Cut'. The object may also include other parameters such as Input, Value, or any necessary parameters for the command.

`.on(type, callback)`

Parameters:
 - **type**: `{String}` - Which event to listen for? Available types: xmlData, data, connect, error
 - **callback**: `{Function}` - What should happen on the event? 

It allows you to listen for incoming messages received on the socket.

Use `.on('xmlData', (xmlData) => {})` to receive XML data of the vMix state. See examples below for how to parse the xml data received into usable data structures.

Use `.on('data', (data) => {})` to receive data from the socket. Will also receive XML responses if no listener for 'xmlData' is registered.


## Installation and use
### As a dependency using npm
The utilities are published at npmjs, meaning that you can easily add the utilities as a dependency in your project.
Found here: https://www.npmjs.com/package/vmix-js-utils
```
npm install vmix-js-utils --save
```
In your code the simplest way to import the modules is the following:
```javascript
const { Connection, StateFetcher } = require('vmix-js-utils')

const connection1 = new Connection('localhost')
const connection2 = new Connection('192.168.1.50')

const conn1cmdSender = new CommandSender(connection1)
const conn2cmdSender = new CommandSender(connection2)

conn1cmdSender.send({ Function: 'Cut' })
conn2cmdSender.send({ Function: 'Merge' })

```
You are also able to import all of the modules as a gathered variable, less elegant way:
```javascript
const vMixUtils = require('vmix-js-utils')

const connection = new vMixUtils.Connection('localhost')
const secondConnection = new vMixUtils.Connection('192.168.1.50')


const cmdSender1stConn = new vMixUtils.CommandSender(connection)
cmdSender1stConn.send({ Function: 'Cut' })
```

## Standalone project / Fork
The code can be cloned and tested as needed from the source code.
```
git clone https://github.com/jensstigaard/vmix-js-utils.git
cd vmix-js-utils

npm install # or 'yarn'
npm test # or 'yarn test'

node ./index.js
```
# Examples and use
Review index.js for some basic example of how to use the utilities
 - [Send single command example](../../blob/master/examples/send-single-command.js)
 - [Multiple commands example](../../blob/master/examples/send-multiple-commands.js)
 - [Multiple commands mixed strings/objects example](../../blob/master/examples/send-multiple-commands-mixed.js)
 - [Read all inputs from vMix state basic example](../../blob/master/examples/read-state-basic.js)


Legacy:
 - [CommandSenderHTTP example](../../blob/master/examples/command-sender-http.js)
 - [StateFetcher Basic example](../../blob/master/examples/state-fetcher-basic.js)

# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)

# Contribution
You are more than welcome to contribute to the repository!

# Roadmap
 - TCP command sender: feedback/responses on commands sent
 - More tests
 - Perhaps more functionality