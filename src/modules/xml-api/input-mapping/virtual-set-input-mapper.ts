// Libraries
import xpath from 'xpath'
// Types
import { VirtualSetInput, VirtualSetLayer, VirtualSetLayerPosition } from '../../../types/inputs/virtual-set'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'

export class VirtualSetInputMapper extends PlayableInputMapper {
	map(input: Element): VirtualSetInput {
		// Map base output attributes
		const baseOutput = super.map(input)

		// Map layers of virtual set
		const layers: VirtualSetLayer[] = (xpath.select('overlay', input) as Element[]).map((layer: Element) => {
			const output = {
				index: Number(layer.attributes.getNamedItem('index')!.value),
				key: layer.attributes.getNamedItem('key')!.value,
			} as VirtualSetLayer

			const position = this.mapLayerPosition(layer)

			if (position) {
				output.position = position
			}

			return output
		})

		return {
			...baseOutput,
			layers
		}
	}

	protected mapLayerPosition(layer: Element): VirtualSetLayerPosition | null {
		const position = xpath.select1('position', layer) as Element

		if (!position) {
			return null
		}

		const panX = position.attributes.getNamedItem('panX')
		const panY = position.attributes.getNamedItem('panY')

		if (!panX || !panY) {
			return null
		}

		const zoomX = position.attributes.getNamedItem('zoomX')
		const zoomY = position.attributes.getNamedItem('zoomY')

		if (!zoomX || !zoomY) {
			return null
		}

		return {
			pan: {
				x: Number(panX.value),
				y: Number(panY.value),
			},
			zoom: {
				x: Number(zoomX.value),
				y: Number(zoomY.value),
			},
		}
	}
}