// Types
import { VirtualSetInput } from '../../../types/inputs/virtual-set'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'

export class VirtualSetInputMapper extends PlayableInputMapper {
	map(input: Element, includeLayers: boolean = true): VirtualSetInput {
		// Map base output attributes
		const baseOutput = super.map(input, includeLayers)

		const output = {
			...baseOutput,
			layers: this.mapLayers(input)
		} as VirtualSetInput

		const position = this.mapLayerPosition(input)

		if (position) {
			output.currentPosition = position
		}

		return output
	}
}
