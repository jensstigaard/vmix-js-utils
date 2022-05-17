// Libraries
import xpath from 'xpath'

// Types
import { BaseInput } from '../../types/inputs'
import { InputLayer as InputLayer, InputLayerPosition } from '../../types/inputs'

// Errors
import MissingRequiredAttributeError from '../../exceptions/missing-required-attribute-error'

// Mappers
import { MapperInterface } from './mapper-interface'

/**
 * Base input mapper
 * 
 * Acts as base/master class to be extended by other types of inputs
 * Previously this was an abstract class...
 * 
 */
export class BaseInputMapper implements MapperInterface {

	/**
	 * Required attributes
	 * (can be overriden by child class)
	 */
	protected requiredAttributes: string[] = []

	/**
	 * Required base attributes
	 */
	private requiredBaseAttributes: string[] = ['key', 'type', 'title']

	/**
	 * Map the input
	 *
	 * @param {Element} input (XML element)
	 * @param {boolean} includeLayers
	 * @returns {BaseInput}
	 */
	map(input: Element, includeLayers: boolean = true): BaseInput {
		const notFoundRequiredBaseAttributes: string[] = []

		const attrs = input.attributes

		// Guard check required base attributes
		this.requiredBaseAttributes.forEach(attrName => {
			const attr = attrs.getNamedItem(attrName)

			// Required attribute not found
			if (!attr) {
				notFoundRequiredBaseAttributes.push(attrName)
			}
		})

		// Throw error if one or more required base attributes were not found
		if (notFoundRequiredBaseAttributes.length > 0) {
			console.error(input)
			throw new MissingRequiredAttributeError([
				'Input',
				!notFoundRequiredBaseAttributes.includes('number') ?
					`with no. ${attrs.getNamedItem('number')!.value}`
					: null,
				'did not contain required base',
				`attribute${notFoundRequiredBaseAttributes.length === 1 ? '' : 's'}:`,
				notFoundRequiredBaseAttributes.join(', '),
				'...'
			].join(' '))
		}

		// Construct/prepare output object
		const output = {
			key: attrs.getNamedItem('key')!.value,
			type: attrs.getNamedItem('type')!.value,
			number: Number(attrs.getNamedItem('number')!.value),
			title: attrs.getNamedItem('title')!.value,
		} as BaseInput

		// console.log(includeLayers ? 'INCLUDE LAYERS' : 'DO NOT INCLUDE LAYERS')
		// Include layers?
		if (includeLayers) {
			output.layers = this.mapLayers(input)
		}

		const notFoundRequiredAttributes: string[] = []
		// Guard check required attributes (on specific input type implementation)
		this.requiredAttributes.forEach(attrName => {
			const attr = attrs.getNamedItem(attrName)

			// Required attribute not found
			if (!attr) {
				notFoundRequiredAttributes.push(attrName)
			}
		})

		// Throw error if one or more required attributes were not found
		if (notFoundRequiredAttributes.length > 0) {
			throw new Error(
				[
					'Input no.',
					output.number,
					'with title',
					`'${output.title}'`,
					`did not contain required attribute${notFoundRequiredAttributes.length === 1 ? '' : 's'}:`,
					notFoundRequiredAttributes.join(', ')
				].join(' ')
			)
		}

		// console.log('YES', output)
		// Map required attributes
		return output
	}

	/**
	 * Map layers
	 * for VirtuelSet inputs or inputs used as "multi view"
	 * 
	 * @param {Element} input
	 * @returns 
	 */
	protected mapLayers(input: Element): InputLayer[] {
		return (xpath.select('overlay', input) as Element[])
			.map((layer: Element) => {
				const output = {
					index: Number(layer.attributes.getNamedItem('index')!.value),
					key: layer.attributes.getNamedItem('key')!.value,
				} as InputLayer

				const position = this.mapLayerPosition(layer)

				if (position) {
					output.position = position
				}

				return output
			})
	}

	protected mapLayerPosition(layer: Element): InputLayerPosition | undefined {
		const position = xpath.select1('position', layer) as Element

		if (!position) {
			return
		}

		const attrs = position.attributes

		const panX = attrs.getNamedItem('panX')
		const panY = attrs.getNamedItem('panY')

		const zoomX = attrs.getNamedItem('zoomX')
		const zoomY = attrs.getNamedItem('zoomY')

		return {
			panX: panX ? Number(panX.value) : undefined,
			panY: panY ? Number(panY.value) : undefined,

			zoomX: zoomX ? Number(zoomX.value) : undefined,
			zoomY: zoomY ? Number(zoomY.value) : undefined,
		}
	}
}
