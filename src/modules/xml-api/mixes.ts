// Imports
import xpath from 'xpath'

// Types
import { Mix as MixType } from '../../types/mix'


/**
 * Mix inputs from XML API
 */
export default class Mixes {
	/**
	 * Returns all mixes
	 */
	static all(xmlDocument: Document): MixType[] {
		return [2, 3, 4]
			.map(number => this.getSingle(xmlDocument, number as 2 | 3 | 4) as MixType)
			.filter(x => x !== null)
	}

	/**
	 * Returns a single mix
	 */
	static getSingle(xmlDocument: Document, number: 2 | 3 | 4): MixType | null {
		const mixState = xpath.select1(`/vmix/mix[@number="${number}"]`, xmlDocument) as Element

		if (!mixState) {
			return null
		}

		// Read child elements
		const previewEl = xpath.select1('preview', mixState) as Element
		const activeEl = xpath.select1('active', mixState) as Element

		// Guard unable to read values
		if (!previewEl || !previewEl.textContent || !previewEl.textContent.length || !activeEl || !activeEl.textContent || !activeEl.textContent.length) {
			return null
		}

		return {
			number,
			preview: Number(previewEl.textContent),
			active: Number(activeEl.textContent),
		}
	}
}
