# vMix-js-utils
Javascript utilities for communicating with vMix web API.

The utilities consists of several modules. Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.
The modules is as following:
 - Connection - Let you define which vMix endpoint you want to receive and send to (Normally it is something like localhost:8088/api)
 - CommandSender - Sends commands to the vMix instance ApiDataParser
 - StateFetcher - Fetches the current state of the vMix instance
 - InputMapper - Maps the inputs from the vMix instance state to JSON objects
 - ApiDataParser - Parses the raw XML data from into parsed and structured XML

The modules are coded as classes, meaning that they are constructed with specific parameters, e.g. that the instanciation of a connection needs a host and a port. 

# Installation and use
## As a dependency using npm
The utilities are published at npmjs, meaning that you can easily add the utilities as a dependency in your project.
Found here: https://www.npmjs.com/package/vmix-js-utils

### Install the package and save it to the dependencies in your npm project
```
npm install vmix-js-utils --save
```

In your code you can then require the utils module in your code as a gathered variable:
```
const vMixUtils = require('vmix-js-utils')

const connection = new vMixUtils.connection('localhost', 8088)
```
Or even simpler, you can choose which modules you use from the package:
```
const { Connection, StateFetcher } = require('vmix-js-utils')

const connection = new Connection('localhost', 8088)
const stateFetcher = new StateFetcher(connection)
```

## Standalone project / Fork
```
git clone https://github.com/jensstigaard/vmix-js-utils.git
cd vmix-js-utils

npm install
npm test

node ./index.js
```
# Examples and use
Review index.js for some basic example of how to use the utilities
 - [CommandSender Basic example](../../blob/master/examples/command-sender-basic.js)
 - [StateFetcher Basic example](../../blob/master/examples/state-fetcher-basic.js)

# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)

# Contribution
You are more than welcome to contribute to the repository!
