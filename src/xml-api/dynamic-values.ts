// Imports
import xpath from 'xpath'
import _ from 'lodash'

/**
 * Dynamic values from XML API
 */
export default class DynamicValues {
	/**
	 * Returns the four dynamic values as an object
	 * 
	 * @param {Document} xmlDocument
	 * @returns { [key: number]: string | null }
	 */
	static extract(xmlDocument: Document): { [key: number]: string | null } {
		const dynamicValuesElsFound: Element[] = xpath.select(
			"//vmix/dynamic/*[starts-with(name(), 'value')]",
			xmlDocument,
		) as Element[]

		// console.log('dynamic value elements found', dynamicValuesElsFound.length)

		return Object.fromEntries(
			dynamicValuesElsFound.map((valueEl: Element, i: number) => ([
				i + 1,
				valueEl.textContent && valueEl.textContent.length ? valueEl.textContent : null,
			])
			)
		)
	}
}