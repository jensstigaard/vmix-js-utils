// Imports
import xpath, { SelectedValue } from 'xpath'

// Types
import { Transition } from '../types/transition'

export default class XmlTransitions {
	static extract(xmlContent: Node): { [key: number]: Transition } {
		const transitionNodesFound: SelectedValue[] = xpath.select("//vmix/transitions/transition", xmlContent)

		// if (transitionNodesFound.length !== 4) {
		// 	throw new Error('Did not find all four transitions...')
		// }

		const transitions: { [key: number]: Transition } = {
			1: { effect: '', duration: 0 },
			2: { effect: '', duration: 0 },
			3: { effect: '', duration: 0 },
			4: { effect: '', duration: 0 }
		}

		transitionNodesFound.forEach((entry: any) => {
			// Map all base attributes of input
			const attributesList = Object.values(entry.attributes as Attr[])

			const transitionNumberAttr = attributesList.find((attr: Attr) => attr.name === 'number')
			const effectAttr = attributesList.find((attr: Attr) => attr.name === 'effect')
			const durationAttr = attributesList.find((attr: Attr) => attr.name === 'duration')

			// No attribute found
			if (!transitionNumberAttr || !effectAttr || !durationAttr) {
				return
			}

			const transitionNumber: number = Number(transitionNumberAttr.nodeValue)

			if (!(transitionNumber in transitions)) {
				return
			}

			const effect: string = String(effectAttr.nodeValue)
			const duration: number = Number(durationAttr.nodeValue)

			transitions[transitionNumber].effect = effect
			transitions[transitionNumber].duration = duration
		})

		return transitions
	}
}