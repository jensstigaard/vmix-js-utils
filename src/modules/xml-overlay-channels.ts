// Imports
import xpath, { SelectedValue } from 'xpath'

type OverlayChannel = {
	inputNumber: number | null
	inPreview: boolean
}

export default class XmlOverlayChannels {
	static extract(xmlContent: Node): { [key: number]: OverlayChannel } {
		const overlayChannelNodesFound: SelectedValue[] = xpath.select("//vmix/overlays/overlay", xmlContent)

		const overlayChannels: { [key: number]: OverlayChannel } = {
			1: { inputNumber: null, inPreview: false },
			2: { inputNumber: null, inPreview: false },
			3: { inputNumber: null, inPreview: false },
			4: { inputNumber: null, inPreview: false },
			5: { inputNumber: null, inPreview: false },
			6: { inputNumber: null, inPreview: false }
		}

		overlayChannelNodesFound.forEach((overlay: any) => {
			// Map all base attributes of input
			const attributes = Object.values(overlay.attributes as Attr[])

			const overlayChannelNumber = attributes.find((attr: Attr) => attr.name === 'number')

			// No overlay channel number found
			if (!overlayChannelNumber) {
				return
			}

			const channel: number = Number(overlayChannelNumber.nodeValue)

			if (!(channel in overlayChannels)) {
				return
			}

			overlayChannels[channel].inputNumber = overlay.childNodes.length ? overlay.childNodes[0].data : null || null
			overlayChannels[channel].inPreview = false

			const isInPreviewAttribute = attributes.find((attr: Attr) => attr.name === 'preview')

			if (isInPreviewAttribute && isInPreviewAttribute.nodeValue === 'True') {
				overlayChannels[channel].inPreview = true
			}
		})

		return overlayChannels
	}
}