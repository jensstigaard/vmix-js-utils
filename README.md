# vMix-js-utils
vMix API utility for Javascript.

[![package json version](https://img.shields.io/github/package-json/v/jensstigaard/vmix-js-utils.svg)](https://www.github/jensstigaard/vmix-js-utils)
[![npm version](https://badge.fury.io/js/vmix-js-utils.svg)](https://www.npmjs.com/package/vmix-js-utils)

**Note**: NodeJS utility for communicating with vMix is branched out in its own package - [node-vmix](https://github.com/jensstigaard/node-vmix). 

```javascript
const { FunctionList } = require('vmix-js-utils')

```

# Purpose
The utilities consists of several modules. Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.
The modules is as following:
 - [ApiDataParser](#apidataparser)
 - [InputMapper](#inputmapper)
 - [StateFetcher](#statefetcher) - Under deprecation

The modules are coded as classes, meaning that they are constructed with specific parameters, e.g. that the instanciation of a connection needs a host and a port. 

# Description of modules

## ApiDataParser
Parses the raw XML data from vMix into parsed and structured XML that can be more easily manipulated in JavaScript.

More info will come.

---

## InputMapper
Maps the inputs from the vMix instance state to JSON objects.

---


## Installation and use
### As a dependency using npm
The utilities are published at npmjs, meaning that you can easily add the utilities as a dependency in your frontend project.
Found here: https://www.npmjs.com/package/vmix-js-utils
```sh
npm install vmix-js-utils --save # or 'yarn add vmix-js-utils'
```

In your code the simplest way to import the modules is the following:

```javascript
const { FunctionList } = require('vmix-js-utils')

```

You are also able to import all of the modules as a gathered variable, less elegant way:

```javascript
const vMixUtils = require('vmix-js-utils')


```


## Standalone project / Fork
The code can be cloned and tested as needed from the source code.

```sh
git clone https://github.com/jensstigaard/vmix-js-utils.git
cd vmix-js-utils

npm install # or 'yarn'
npm test # or 'yarn test'
```


# Examples and use
Review index.js for some basic example of how to use the utilities
 - [Send single command example](../../blob/master/examples/send-single-command.js)



# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)


# Contribution
You are more than welcome to contribute to the repository!


# Roadmap
 - More tests
 - Perhaps more functionality
