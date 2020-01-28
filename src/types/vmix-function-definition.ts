//
export type SimpleFunctionParameter = {
	type: string,
	description: string,
	optional: boolean
}

export type CompositeFunctionParameter = {
	composites: SimpleFunctionParameter[]
}

export type VmixFunctionParameter = SimpleFunctionParameter | CompositeFunctionParameter

export type VmixFunctionDefinition = {
	function: string,
	description: string
	parameters: { [key: string]: VmixFunctionParameter },
	examples: string[]
}