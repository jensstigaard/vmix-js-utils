// Imports
import xpath from 'xpath'

// Types
import { ReplayInput } from './../../types/inputs/replay'

// Mappers
import { ReplayInputMapper } from './input-mapping/replay-input-mapper'

/**
 * Replay state from XML API
 */
export default class InstantReplay {
	/**
	 * Returns the instant replay module state
	 */
	static get(xmlDocument: Document): ReplayInput | null {
		const replayInput = xpath.select1('/vmix/inputs/input[@type="Replay"]', xmlDocument) as Element
		if (!replayInput) {
			return null
		}

		const mapper = new ReplayInputMapper

		return mapper.map(replayInput)
	}
}