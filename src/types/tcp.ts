
// Tally state
// Values mapping values read from vMix API
export enum TALLY_STATE {
	IDLE, // 0
	PROGRAM, // 1
	PREVIEW // 2
}


export type TallySummary = {
	preview: number[] // One or more inputs can be in preview
	program: number[] // One or more inputs can be in program
	numberOfInputs: number
	// overlays: {
	// 	1: number | null
	// 	2: number | null
	// 	3: number | null
	// 	4: number | null
	// }
}
