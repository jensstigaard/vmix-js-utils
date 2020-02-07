
export enum TALLY_STATE {
	IDLE,
	PREVIEW,
	PROGRAM
}


export type TallySummary = {
	preview: number
	program: number
	// overlays: {
	// 	1: number | null
	// 	2: number | null
	// 	3: number | null
	// 	4: number | null
	// }
}