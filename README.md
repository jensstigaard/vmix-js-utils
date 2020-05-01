# vMix-js-utils

[![package json version](https://img.shields.io/github/package-json/v/jensstigaard/vmix-js-utils.svg)](https://www.github/jensstigaard/vmix-js-utils)
[![npm version](https://badge.fury.io/js/vmix-js-utils.svg)](https://www.npmjs.com/package/vmix-js-utils)

vMix API utility for Javascript can be used in either front or backend applications and includes the following modules:
- API Function list
- TCP Tally parser
- XML API Data parser
- XML Input mapper
- XML Overlay Channels
- XML Transitions Setup

It is recommended to import the package as a NPM package. Alternatively you can download the source code and included it as a library manually.

## OBS - NodeJS utility for vMix
**Note**: The NodeJS utility for communicating with vMix is branched out in its own repository/package - See [node-vmix](https://github.com/jensstigaard/node-vmix) for more info. This package is only for NodeJS applications.

---
Simple use
```javascript
import { FunctionList, ApiDataParser, InputMapper } from 'vmix-js-utils'

```

# Purpose
The utilities consists of several modules. Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.
The modules is as following:
 - [FunctionList](#function-list)
 - [TcpTally](#tcp-tally)
 - [XmlApiDataParser](#xml-api-data-parser)
 - [XmlInputMapper](#xml-input-mapper)
 - [XmlOverlayChannels](#xml-overlay-channels)
 - [XmlTransitions](#xml-transitions)
 - [StateFetcher](#statefetcher) - Under deprecation

The modules are coded as classes, meaning that they are constructed with specific parameters, e.g. that the instanciation of a connection needs a host and a port. 

# Description of modules

## Function List
`.all()` - Returns a complete list of available functions in the vMix API. **Format: JSON**
`.category(category: string)` - Returns a list of available functions in a given category from the vMix API. **Format: JSON**
`.get(function: string)` - Returns a single function with a given name from the vMix API. **Format: JSON**

---

## Tcp Tally
Interprets the tally info from the TCP service.

`TcpTally.extractSummary(tallyString: string)` *(static)*: Extract summary of tally info. **Format: **
`TcpTally.extractInputs(tallyString: string)` *(static)*: Extract (full) info of inputs from tally. **Format: **

---

## Xml Api Data Parser
Parses the raw XML data from vMix into parsed and structured XML that can be more easily manipulated in JavaScript.
All full XML responses from the API needs to be used to convert the content to a proper XML DOM object.

`XmlApiDataParser.parse(xmlContent)` *(static)*: Parse raw XML string content to XML DOM object.

---

## Xml Input Mapper
Maps the inputs from the vMix instance state to JSON objects.

`XmlInputMapper.extractInputsFromXML(xmlContent)` *(static)*: Extract all inputs from raw XML data using XPath.
`XmlInputMapper.mapInputs(xmlContent, wantedAttributes?)` *(static)*: Map all (extracted) inputs to JSON objects. **Format:**
`XmlInputMapper.mapTallyInfo(xmlContent, wantedAttributes?)` *(static)*: Map all (extracted) inputs to JSON objects. **Format:**

---


## Xml Overlay Channels
`XmlOverlayChannels.extract(xmlContent)` *(static)* - Returns a object of overlay channels state read from XML data. **Format:**
```javascript
{ // Overlay channels
	1: { inputNumber: Number|null, inPreview: Boolean },
	2: { inputNumber: Number|null, inPreview: Boolean },
	3: { inputNumber: Number|null, inPreview: Boolean },
	4: { inputNumber: Number|null, inPreview: Boolean },
	5: { inputNumber: Number|null, inPreview: Boolean },
	6: { inputNumber: Number|null, inPreview: Boolean },
}
```

---
## Xml Transitions
`XmlTransitions.extract(xmlContent)` *(static)* - Returns a object of transitions state read from XML data. **Format:**
```javascript
{ // Transitions
	1: { effect: String, duration: Number },
	2: { effect: String, duration: Number },
	3: { effect: String, duration: Number },
	4: { effect: String, duration: Number },
}
```

---


# Installation and use

## As a dependency using npm
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


# Examples and use
*Work in progress.*
- [Function list (all)](./examples/function-list-all.js)
- [Function list (get single)](./examples/function-list-get.js)


# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)


# Contribution
You are more than welcome to contribute to the repository!


# Roadmap
 - More examples
 - More tests
 - Perhaps more functionality
