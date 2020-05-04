// Imports
import xpath from 'xpath'
import _ from 'lodash'

// Types
import { Transition } from '../types/transition'

export default class XmlTransitions {
	static extract(xmlDocument: Document): { [key: number]: Transition } {
		const transitionNodesFound: Element[] = xpath.select("//vmix/transitions/transition", xmlDocument) as Element[]

		if (transitionNodesFound.length !== 4) {
			throw new Error('Did not find all four defined transitions...')
		}

		return _.keyBy(
			transitionNodesFound.map((transitionNode: Element) => {

				const transitionNumberAttr = transitionNode.attributes.getNamedItem('number')
				const effectAttr = transitionNode.attributes.getNamedItem('effect')
				const durationAttr = transitionNode.attributes.getNamedItem('duration')

				// Guard attributes not found
				if (!transitionNumberAttr || !effectAttr || !durationAttr) {
					throw new Error('Necessary attributes not found in transition')
				}

				const transitionNumber: number = Number(transitionNumberAttr.nodeValue)

				if (!([1, 2, 3, 4].includes(transitionNumber))) {
					throw new Error('Transition number not valid...')
				}

				// console.log(transitionNumber)

				return {
					number: transitionNumber,
					effect: String(effectAttr.nodeValue),
					duration: Number(durationAttr.nodeValue)
				}
			}),
			'number'
		)
	}
}