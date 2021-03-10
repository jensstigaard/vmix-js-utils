import { TALLY_STATE, TallySummary } from "../types/tcp"


/**
 * Map integer (wrapped as string) to tally state enum
 * 
 * Returns state for single input based on data from TCP tally response
 * 
 * @param {string} state 
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
 * Interprets the tally info from the TCP service of a vMix instance.
 * 
 * E.g. "TALLY OK 001020" reads:
 *  - input no. 3 in program
 *  - input no. 5 in preview
 *  - all other inputs is idle
 */
export default class TcpTally {
	/**
	 * Extract summary from TCP message
	 * 
	 * @param {string} tallyString
	 * @returns {TallySummary}
	 */
	static extractSummary(tallyString: string): TallySummary {
		const inputs = Object.entries(TcpTally.extractInputs(tallyString))

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
	 * Extract inputs from TCP message
	 * 
	 * E.g. "TALLY OK 00102" reads input 3 in program and 5 in preview
	 * @param tallyString - 
	 */
	static extractInputs(tallyString: string): TALLY_STATE[] {
		return tallyString
			.split('') // Split to single characters/number - e.g. from 00102 to ['0', '0', '1', '0', '2']
			.map(tallyStateMapperSingleInput)
	}
}