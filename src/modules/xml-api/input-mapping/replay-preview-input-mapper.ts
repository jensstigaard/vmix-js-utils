
import { PlayableInputMapper } from './playable-input-mapper'
import { PlayableInput } from '../../../types/inputs'

export class ReplayPreviewInputMapper extends PlayableInputMapper {
	map(input: Element, includeLayers: boolean = true): PlayableInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),
		}

		return output
	}
}