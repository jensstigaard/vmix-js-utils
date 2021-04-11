// Imports
import xpath from 'xpath'
import _ from 'lodash'

// Types
import { OverlayChannel } from '../../types/overlay-channel'

/**
 * Overlay channels from XML API
 */
export default class OverlayChannels {
	/**
	 * Returns the overlay channels state read from XML document as an object
	 * 
	 * @param {Document} xmlDocument
	 * @returns { [key:number]: OverlayChannel }
	 */
	static extract(xmlDocument: Document): { [key: number]: OverlayChannel } {
		const overlayChannelNodesFound: Element[] = xpath.select("//vmix/overlays/overlay", xmlDocument) as Element[]

		return _.keyBy(
			overlayChannelNodesFound.map((overlayNode: Element) => {
				const overlayChannelNumberAttr = overlayNode.attributes.getNamedItem('number')
				const previewAttr = overlayNode.attributes.getNamedItem('preview')

				// No overlay channel number found
				if (!overlayChannelNumberAttr) {
					throw new Error('Overlay channel did not contain channel number')
				}

				const channelNumber: number = Number(overlayChannelNumberAttr.value)

				// // Guard channel number
				// if (channelNumber < 1 || channelNumber > 8) {
				// 	throw new Error('Invalid channel number')
				// }

				return {
					channelNumber,
					inputNumber: overlayNode.textContent ? Number(overlayNode.textContent) : null,
					inPreview: previewAttr?.value === 'True'
				}
			}),
			'channelNumber'
		)
	}
}