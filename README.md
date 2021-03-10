# vMix-js-utils

[![package json version](https://img.shields.io/github/package-json/v/jensstigaard/vmix-js-utils.svg)](https://www.github/jensstigaard/vmix-js-utils)
[![npm version](https://badge.fury.io/js/vmix-js-utils.svg)](https://www.npmjs.com/package/vmix-js-utils)
[![npm downloads](https://img.shields.io/npm/dm/vmix-js-utils)](https://www.npmjs.com/package/vmix-js-utils)

[![NPM Badge](https://nodei.co/npm/vmix-js-utils.png)](https://npmjs.com/package/vmix-js-utils)

vMix API utility for Javascript can be used in either front or backend applications and includes the following modules:
 - [AudioUtility](#audio-utility)
 - [TcpTally](#tcp-tally)
 - [XmlApiDataParser](#xml-api-data-parser)
 - [XmlAudio](#xml-audio) (Master audio + busses)
 - [XmlInputMapper](#xml-input-mapper)
 - [XmlOverlayChannels](#xml-overlay-channels)
 - [XmlTransitions](#xml-transitions)

It is recommended to import the package as a NPM package. Alternatively you can download the source code and included it as a library manually.

## OBS - NodeJS utility for vMix
**Note**: The NodeJS utility for communicating with vMix is branched out in its own repository/package - See [node-vmix](https://github.com/jensstigaard/node-vmix) for more info. The node-vmix package is only for NodeJS applications, used for easy connection to vMix instances.

---
Simple use
```javascript
import { DataParser, InputMapping } from 'vmix-js-utils/xml-api'
```

# Purpose
The utilities consists of several modules. Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.

The modules are coded as classes, meaning that they are constructed with specific parameters, e.g. that the instanciation of a connection needs a host and a port. 

# Documentation
Please read the [Documentation](../docs/index.html).


# Installation and use

## As a dependency using npm
The utilities are published at npmjs, meaning that you can easily add the utilities as a dependency in your frontend project.
Found here: https://www.npmjs.com/package/vmix-js-utils
```sh
npm install vmix-js-utils --save
# or 'yarn add vmix-js-utils -d'
```

In your code the simplest way to import the modules is the following:

```javascript
const { DataParser, GeneralState } = require('vmix-js-utils/xml-api')
// ...
```

You are also able to import all of the modules as a gathered variable, less elegant way:

```javascript
const vMixUtils = require('vmix-js-utils')
// ...
```


# Standalone project / Fork
The source code is written in TypeScript, and ported to javascript (including types for TypeScript support) to allow it to be used as a npm package.

The code can be cloned and tested as needed from the source code.

```sh
git clone https://github.com/jensstigaard/vmix-js-utils.git
cd vmix-js-utils
```

Install dependencies
```sh
npm install # or 'yarn'
```

Compile TypeScript source code to JavaScript code
```sh
npm build # or 'yarn build'
```

Run tests
```sh
npm test # or 'yarn test'
```


# Examples

*Work in progress.*

## XML API
### Input mapping
- [All attributes](./examples/xml-api/input-mapping.js)
- [Selected attributes](./examples/xml-api/input-mapping-selective.js)


# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)


# Contribution
You are more than welcome to contribute to the repository!


# Roadmap
 - More examples
 - More tests
 - Perhaps more functionality
