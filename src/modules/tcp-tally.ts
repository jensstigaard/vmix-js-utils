import { TALLY_STATE, TallySummary } from "../types/tcp"


/**
 * Map integer (wrapped as string) to tally state enum
 * @param state 
 */
function tallyStateMapperSingleInput(state: string): TALLY_STATE {
	switch (state) {
		case '1':
			return TALLY_STATE.PROGRAM
		case '2':
			return TALLY_STATE.PREVIEW
		default:
			return TALLY_STATE.IDLE
	}
}

/**
 * Map inputs to tally state array
 * 
 * @param tallyString
 */
function mapInputs(tallyString: string): TALLY_STATE[] {
	return tallyString
		.split('') // Split to single characters/number - e.g. from 00102 to ['0', '0', '1', '0', '2']
		.map(tallyStateMapperSingleInput)
}

export default class TcpTally {
	/**
	 * 
	 * @param tallyString - From TCP message: E.g. TALLY OK 00102 (input 3 in program and 5 in preview)
	 */
	static extractSummary(tallyString: string): TallySummary {
		const inputs = mapInputs(tallyString)

		const numberOfInputs = inputs.length

		const programIndex: number = inputs.findIndex(state => state === TALLY_STATE.PROGRAM)
		let previewIndex: number = inputs.findIndex(state => state === TALLY_STATE.PREVIEW)

		if (programIndex >= numberOfInputs) {
			throw new Error(`Invalid program index... ${programIndex} of ${numberOfInputs} inputs`)
		}

		// If there were no preview input found
		if (previewIndex === -1) {
			previewIndex = programIndex
		} else if (previewIndex >= numberOfInputs) {
			throw new Error(`Invalid program index... ${previewIndex} of ${numberOfInputs} inputs`)
		}

		return {
			program: programIndex + 1,
			preview: previewIndex + 1,

			numberOfInputs
		}
	}


	/**
	 * 
	 * @param tallyString - From TCP message: E.g. TALLY OK 00102 (input 3 in program and 5 in preview)
	 */
	static extractInputs(tallyString: string): TALLY_STATE[] {
		return mapInputs(tallyString)
	}
}