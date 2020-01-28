
// A vMix command consists of one or more parameters
// Especially the parameter 'Function' which holds a string value,
// and arbritary parameters can be strings or number, or arrays of these
export type VmixCommand = {
	Function: string
	[key: string]: string | number | string[] | number[]
}
