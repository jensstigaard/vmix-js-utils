import {
	SimpleFunctionParameter,
	VmixFunctionDefinition,
	VmixFunctionParameter
} from './types/vmix-function-definition'
import {
	IntermediateVmixFunctionDefinition,
	IntermediateVmixFunctionParameter
} from './types/intermediate/intermediate-vmix-function-definition'

import functionsIntermediateList from './functions/index'

const validParameterTypes: string[] = ['string', 'number', 'input', 'url']

/**
 * 
 * @param functions
 */
function parseFunctions(
	functions: object
): VmixFunctionDefinition[] {
	return Object.entries(functions).map(([functionName, obj]) => parseFunction(functionName, obj))
}

/**
 * 
 * @param functionName
 * @param functionObj
 */
function parseFunction(
	functionName: string,
	functionObj: IntermediateVmixFunctionDefinition
): VmixFunctionDefinition {
	const output = {
		function: functionName,
		description: '',
		parameters: {},
		examples: []
	} as VmixFunctionDefinition

	// Is functionObj just a string - then parse it as description
	if (typeof functionObj === 'string') {
		output.description = functionObj
		return output
	}

	// Is functionObj not a object
	if (typeof functionObj !== 'object') {
		console.error(functionObj)
		throw new Error(`Invalid function object of type ${typeof functionObj}`)
	}

	// Is functionObj an object, we can read from it
	if ('description' in functionObj) {
		output.description = functionObj.description || ''
	}
	if ('examples' in functionObj && functionObj.examples && Array.isArray(functionObj.examples)) {
		output.examples = (functionObj.examples as string[])
	}
	if ('parameters' in functionObj) {
		output.parameters = parseFunctionParameters(functionObj.parameters || {})
	}

	return output
}

/**
 * 
 * @param params
 */
function parseFunctionParameters(
	params: { [key: string]: IntermediateVmixFunctionParameter }
): { [key: string]: VmixFunctionParameter } {
	const parameters: { [key: string]: VmixFunctionParameter } = {}

	Object.entries(params).forEach(([paramKey, parameterValue]) => {
		parameters[paramKey] = parseFunctionParameter(paramKey, parameterValue)
	})

	return parameters
}

/**
 * 
 * @param paramKey
 * @param value
 */
function parseFunctionParameter(paramKey: string, value: IntermediateVmixFunctionParameter):
	VmixFunctionParameter {

	if (Array.isArray(value)) {
		return {
			composites: value.reduce(
				(all: SimpleFunctionParameter[], subparamValue) => {
					all.push(parseFunctionParameter(paramKey, subparamValue) as SimpleFunctionParameter)
					return all
				},
				[])
		}
	}

	const parameter: SimpleFunctionParameter = {
		type: '',
		description: '',
		optional: false
	}

	// If value is a string - wrap just type
	if (typeof value === 'string') {
		parameter.type = value
	}
	// If value is an object - wrap type, description and examlpes if possible 
	else if (typeof value === 'object') {
		if ('type' in value) {
			parameter.type = value.type
		}
		if ('description' in value) {
			parameter.description = value.description || ''
		}
		if ('optional' in value) {
			parameter.optional = value.optional || false
		}
	}

	if (!validParameterTypes.includes(parameter.type)) {
		throw new Error(`Parameter '${paramKey}' had unknown type '${parameter.type}'...`)
	}

	return parameter
}

// 
export default class FunctionList {
	protected _functions: VmixFunctionDefinition[] = []

	constructor() {
		this._functions = parseFunctions(functionsIntermediateList)
	}

	/**
	 * Returns complete list of functions in the vMix API
	 */
	all = (): VmixFunctionDefinition[] => {
		return this._functions
	}

	/**
	 * Get function by function name
	 */
	get = (functionName: string): VmixFunctionDefinition => {
		const func = this._functions
			.find(f => f.function === functionName)

		if (!func) {
			throw new Error(`Function not found with name '${functionName}'`)
		}

		return func
	}
}
