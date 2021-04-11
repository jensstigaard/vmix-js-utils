import { PlayableInputMapper } from './playable-input-mapper'
import { VirtualSetInput } from '../../../types/inputs'

export class VirtualSetInputMapper extends PlayableInputMapper {
	map(input: Element): VirtualSetInput {
		// Map base output attributes
		const output = {
			...super.map(input),

			// TODO:
			layers: [] 
		}

		return output
	}
}