// Libraries
import xpath from 'xpath'

// Types
import { BaseInput } from '../../../types/inputs'
import { InputLayer as InputLayer, InputLayerPosition } from '../../../types/inputs/'

// Mappers
import { MapperInterface } from './mapper-interface'

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

	map(input: Element, includeLayers: boolean = true): BaseInput {
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
		} as BaseInput

		// console.log(includeLayers ? 'INCLUDE LAYERS' : 'DO NOT INCLUDE LAYERS')
		// Include layers?
		if (includeLayers) {
			output.layers = this.mapLayers(input)
		}

		// Guard check required attributes (on specific input type implementation)
		this.requiredAttributes.forEach(attrName => {
			const attr = input.attributes.getNamedItem(attrName)
			if (!attr) {
				throw new Error(
					`Input no. ${output.number} '${output.title}' did not contain required attribute '${attrName}'...`
				)
			}
		})

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

		const panX = position.attributes.getNamedItem('panX')
		const panY = position.attributes.getNamedItem('panY')

		const zoomX = position.attributes.getNamedItem('zoomX')
		const zoomY = position.attributes.getNamedItem('zoomY')

		return {
			panX: panX ? Number(panX.value) : undefined,
			panY: panY ? Number(panY.value) : undefined,

			zoomX: zoomX ? Number(zoomX.value) : undefined,
			zoomY: zoomY ? Number(zoomY.value) : undefined,
		}
	}
}
