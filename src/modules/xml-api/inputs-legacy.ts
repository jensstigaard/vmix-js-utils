
import { GenericInput } from '../../types/inputs'

/**
 * XML API Inputs - Legacy!
 */
export default class InputsLegacy {

	/**
	 * Map single input (generic)
	 * Legacy method
	 *
	 * @param {Element} input
	 * @param {string | string[]} wantedAttributes
	 * @returns {BaseInputType}
	 */
	static mapSingle(input: Element, wantedAttributes: string | string[] = '*'): GenericInput {
		const output: { [key: string]: any } = {}

		// Map all base attributes of input
		for (const attrName in input.attributes) {
			const attr: Attr = input.attributes[attrName]

			// Guard attribute not having name, being a function or nodeValue being a function
			if (!attr.name
				|| typeof attr.name !== 'string'
				|| typeof attr === 'function'
				|| attr.value === 'function'
			) {
				continue
			}

			// Only add the attribute to the output object if it is mandatory or desired by user
			if (
				['key', 'type'].includes(attr.name)
				|| wantedAttributes === '*'
				|| wantedAttributes.includes(attr.name)
			) {
				output[attr.name] = attr.value
			}
		}

		switch (output.type) {
			// If input is a title
			case 'GT':
			case 'Xaml':
				// Guard - Attach fields only if "field" attributes is desired
				if (wantedAttributes !== '*' && !wantedAttributes.includes('fields')) {
					break
				}

				output.fields = []
				// A regular .forEach doesn't work on this somehow...
				for (const i in input.childNodes) {
					const titleFieldEl: Element = input.childNodes[i] as Element

					// Guard child node does not have node name and the node is not of correct type
					if (!titleFieldEl.nodeName || !['image', 'text'].includes(titleFieldEl.nodeName)) {
						continue
					}

					const nameAttr = titleFieldEl.attributes.getNamedItem('name')
					// Guard child node does not have a name attribute
					if (!nameAttr) {
						continue
					}

					// Build fields of object from its attributes
					const titleField: { [key: string]: any } = {
						type: titleFieldEl.nodeName,
						name: nameAttr.value,
						value: (titleFieldEl as Node).textContent?.trim()
					}

					output.fields.push(titleField)
				}

				break
			case 'Replay':
				// Replay input - extract child node info
				const replayChildNode = input.childNodes[1]! as Element

				output.replay = {}
				for (const attrName in replayChildNode.attributes) {
					const attr: Attr = replayChildNode.attributes[attrName]

					// Guard attribute not having name, being a function or nodeValue being a function
					if (!attr.name
						|| typeof attr.name !== 'string'
						|| typeof attr === 'function'
						|| attr.value === 'function'
					) {
						continue
					}

					// console.log('ADD REPLAY ATTR', attr.name, attr.value)
					output.replay[attr.name] = attr.value
				}

				// A regular .forEach doesn't work on this somehow...
				for (const i in replayChildNode.childNodes) {
					const replayEl: Node = replayChildNode.childNodes[i]

					// Guard entry does not have node name and the node is not of correct type
					if (
						!replayEl.nodeName
						|| !['timecode', 'timecodeA', 'timecodeB'].includes(replayEl.nodeName)
					) {
						continue
					}
					// console.log('REPLAY CHILD NODE', replayEl.nodeName, replayEl.textContent)

					output.replay[replayEl.nodeName] = replayEl.textContent?.trim()
				}
				break
			default:
				break
		}

		return output
	}

	/**
	 * Map inputs (generic)
	 * Legacy method
	 *
	 * @param {Element[]} xmlInputs
	 * @param wantedAttributes
	 * @returns {GenericInput[]}
	 */
	static mapGeneric(xmlInputs: Element[], wantedAttributes: string | string[] = '*'): GenericInput[] {

		// Map all data from raw input
		const xmlInputsMapped = xmlInputs.map(input => InputsLegacy.mapSingle(input, wantedAttributes))

		// Make a dictionary and populate it
		const inputsDictionary: any = {}
		xmlInputsMapped.forEach((input: any) => {
			inputsDictionary[input.key] = input
		})

		return inputsDictionary
	}
}
