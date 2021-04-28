// Types
import { ImageInput } from '../../../types/inputs/image'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'

export class ImageInputMapper extends PlayableInputMapper {
	map(input: Element, includeLayers: boolean = true): ImageInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),
		}

		return output
	}
}