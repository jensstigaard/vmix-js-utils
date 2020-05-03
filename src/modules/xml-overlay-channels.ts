// Imports
import xpath from 'xpath'
import _ from 'lodash'

// Types
import { OverlayChannel } from '../types/overlay-channel'

export default class XmlOverlayChannels {
	static extract(xmlDocument: Document): { [key: number]: OverlayChannel } {
		const overlayChannelNodesFound: Element[] = xpath.select("//vmix/overlays/overlay", xmlDocument) as Element[]

		return _.keyBy(
			overlayChannelNodesFound.map((overlayNode: Element) => {
				const overlayChannelNumberAttr = overlayNode.attributes.getNamedItem('number')
				const previewAttr = overlayNode.attributes.getNamedItem('preview')

				// No overlay channel number found
				if (!overlayChannelNumberAttr) {
					throw new Error('Invalid channel number')
				}

				const channelNumber: number = Number(overlayChannelNumberAttr.nodeValue)

				// // Guard channel number
				// if (channelNumber < 1 || channelNumber > 8) {
				// 	throw new Error('Invalid channel number')
				// }

				return {
					channelNumber,
					inputNumber: overlayNode.textContent ? Number(overlayNode.textContent) : null,
					inPreview: previewAttr?.nodeValue === 'True'
				}
			}),
			'channelNumber'
		)
	}
}