
import { PlayableInputMapper } from './playable-input-mapper'
import { VideoInput } from '../../../types/input'

export class ReplayPreviewInputMapper extends PlayableInputMapper {
	map(input: Element): VideoInput {
		// Map base output attributes
		const output = {
			...super.map(input),
		}

		return output
	}
}