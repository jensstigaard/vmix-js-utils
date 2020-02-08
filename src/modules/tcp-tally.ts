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
		case '0':
			return TALLY_STATE.IDLE
		default:
			throw new Error(`Invalid tally string inputted... '${state}'`)
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
		const inputs = Object.entries(mapInputs(tallyString))

		const numberOfInputs = inputs.length

		const inputsInProgram = inputs.filter(([_, state]) => (state === TALLY_STATE.PROGRAM))
		const inputsInPreview = inputs.filter(([_, state]) => (state === TALLY_STATE.PREVIEW))


		// If there were no preview input found - use input in program
		if (inputsInPreview.length === 0 && inputsInProgram.length === 1) {
			inputsInPreview[0] = inputsInProgram[0]
		}

		return {
			program: inputsInProgram.map(([index, _]) => Number(index) + 1),
			preview: inputsInPreview.map(([index, _]) => Number(index) + 1),

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