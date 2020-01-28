// Function description type - can only be a string
type FunctionDescriptionDefinition = string

// Function Parameter type
type FunctionParameterType = string


type FunctionParameterValue = {
	type: FunctionParameterType
	description?: string
}

// Function parameter can be a description, a function parameter value or array of these
export type IntermediateVmixFunctionParameter = FunctionDescriptionDefinition
	| FunctionParameterValue
	| FunctionParameterValue[]

export type IntermediateVmixFunctionDefinition = FunctionDescriptionDefinition | {
	description?: string
	parameters?: {
		[key: string]: IntermediateVmixFunctionParameter
	}
	examples?: string[]
}