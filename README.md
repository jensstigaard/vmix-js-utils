# vMix-js-utils

[![package json version](https://img.shields.io/github/package-json/v/jensstigaard/vmix-js-utils.svg)](https://github.com/jensstigaard/vmix-js-utils)
[![npm version](https://badge.fury.io/js/vmix-js-utils.svg)](https://www.npmjs.com/package/vmix-js-utils)
[![npm downloads](https://img.shields.io/npm/dm/vmix-js-utils)](https://www.npmjs.com/package/vmix-js-utils)

[![NPM Badge](https://nodei.co/npm/vmix-js-utils.png)](https://npmjs.com/package/vmix-js-utils)

vMix API utility library for Javascript can be used in either frontend or backend applications (NodeJS).

It is recommended to import the package as a NPM package.
Alternatively you can download the source code and included it as a library manually.

## OBS - NodeJS utility for vMix
**Note**: The NodeJS utility for communicating with vMix is branched out in its own repository/package - See [node-vmix](https://github.com/jensstigaard/node-vmix) for more info.
The node-vmix package is only for NodeJS applications, used for easy connection to vMix instances.

This library can be used both in front-end and NodeJS projects.

---
Simple use
```javascript
// Import XML API functionality
import { DataParser, InputMapping } from 'vmix-js-utils/modules/xml-api'
```

# Purpose
This library is a set of utilities consisting of several modules. 
Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.
This is demonstrated in [the examples](#examples).

The modules are coded as classes, meaning that they are constructed with specific parameters.

The source code is written in TypeScript, and compiled to javascript to allow it to be used as a npm package.
It includes type declarations for TypeScript support, meaning that you can type defer i.e. the input types.

# Documentation
Please read [the documentation](https://jensstigaard.github.io/vmix-js-utils/).

# Installation and use

## As a dependency using npm (or yarn)
The library is published at npmjs as a package, meaning that you can easily add the utilities as a dependency in your project.
Found here: https://www.npmjs.com/package/vmix-js-utils
```sh
npm install vmix-js-utils --save
# or 'yarn add vmix-js-utils -d'
```

In your code the simplest way to import the modules is the following:

```javascript
const { DataParser, GeneralState } = require('vmix-js-utils/modules/xml-api')
// ...
```

You are also able to import all of the modules as a gathered variable, but less elegant way:

```javascript
// Import all vMix utils
const vMixUtils = require('vmix-js-utils')
// Import XML API functions
const { DataParser, GeneralState, Inputs } = vMixUtils.XmlApi
// ...
```


# Standalone project / Fork
The code can be cloned and tested as needed from the source code.
It is especially useful when deveoping and extending the functionality.

```sh
git clone https://github.com/jensstigaard/vmix-js-utils.git
cd vmix-js-utils
```

To run the project as standalone locally, you may want to first install the dependencies
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
### Inputs
- [Map all attributes](./examples/xml-api/input-mapping.js)
- [Map only selected attributes](./examples/xml-api/input-mapping-selective.js)


# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)


# Contribution
You are more than welcome to contribute to the repository!


# Roadmap
 - More examples
 - More tests
 - Perhaps more functionality
