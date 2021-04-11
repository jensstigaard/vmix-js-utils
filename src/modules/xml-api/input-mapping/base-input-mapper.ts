import { MapperInterface } from './mapper-interface'
import { BaseInput } from '../../../types/input'

export abstract class BaseInputMapper implements MapperInterface {

	/**
	 * Required attributes
	 * (can be overriden by child class)
	 */
	protected requiredAttributes: string[] = []

	/**
	 * Required base attributes
	 */
	private requiredBaseAttributes: string[] = ['key', 'type', 'title']

	map(input: Element): BaseInput {
		// Guard check required base attributes
		this.requiredBaseAttributes.forEach(attrName => {
			const attr = input.attributes.getNamedItem(attrName)
			if (!attr) {
				console.error(input)
				throw new Error(`Input did not contain required base attribute '${attrName}'...`)
			}
		})

		const output = {
			key: input.attributes.getNamedItem('key')!.value,
			type: input.attributes.getNamedItem('type')!.value,
			number: Number(input.attributes.getNamedItem('number')!.value),
			title: input.attributes.getNamedItem('title')!.value,
		}

		// Guard check required attributes
		this.requiredAttributes.forEach(attrName => {
			const attr = input.attributes.getNamedItem(attrName)
			if (!attr) {
				throw new Error(`Input no. ${output.number} '${output.title}' did not contain required attribute '${attrName}'...`)
			}
		})

		console.log('YES', output)
		// Map required attributes
		return output
	}
}