
import { PlayableInputMapper } from './playable-input-mapper'
import { PlayableInput } from '../../../types/inputs'

export class ReplayPreviewInputMapper extends PlayableInputMapper {
	map(input: Element): PlayableInput {
		// Map base output attributes
		const output = {
			...super.map(input),
		}

		return output
	}
}