export type FunctionDescriptionDefinition = String
type FunctionParameterType = Number | String | 'Input'

type FunctionParameterValue = {
	type: FunctionParameterType,
	description?: String
}

export type VmixFunctionDefinition = FunctionDescriptionDefinition | {
	description?: string
	parameters?: {
		[key: string]: FunctionDescriptionDefinition | FunctionParameterValue | FunctionParameterValue[]
	}
}