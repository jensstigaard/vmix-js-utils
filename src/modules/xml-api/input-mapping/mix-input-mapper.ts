// Types
import { MixInput } from '../../../types/inputs/index'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'

export class MixInputMapper extends PlayableInputMapper {
	map(input: Element): MixInput {
		// Map base output attributes
		const output = {
			...super.map(input),
		}

		return output
	}
}
