// Imports
import xpath from 'xpath'
import _ from 'lodash'

/**
 * Dynamic inputs from XML API
 */
export default class DynamicInputs {
	/**
	 * Returns the four dynamic inputs as an object
	 * 
	 * @param {Document} xmlDocument
	 * @returns { [key: number]: number | null }
	 */
	static extract(xmlDocument: Document): { [key: number]: number | null } {
		const dynamicValuesElsFound: Element[] = xpath.select(
			"//vmix/dynamic/*[starts-with(name(), 'input')]",
			xmlDocument,
		) as Element[]

		// console.log('dynamic input elements found', dynamicValuesElsFound.length)

		return Object.fromEntries(
			dynamicValuesElsFound.map((valueEl: Element, i: number) => ([
				i + 1,
				valueEl.textContent && valueEl.textContent.length ? Number(valueEl.textContent) : null,
			])
			)
		)
	}
}