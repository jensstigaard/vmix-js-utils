
import { PlayableInputMapper } from './playable-input-mapper'
import { VideoInput } from '../../../types/input'

export class VideoInputMapper extends PlayableInputMapper {
	map(input: Element): VideoInput {
		// Map base output attributes
		const output = {
			...super.map(input),
		}

		return output
	}
}