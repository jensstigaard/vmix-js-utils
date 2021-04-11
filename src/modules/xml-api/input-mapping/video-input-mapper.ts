
import { PlayableInputMapper } from './playable-input-mapper'
import { VideoInput } from '../../../types/input'
import { GenericAudioInputMapper } from './generic-audio-input-mapper'

export class VideoInputMapper extends PlayableInputMapper {

	map(input: Element): VideoInput {
		// Map base output attributes
		const output = {
			...super.map(input),
			...(new GenericAudioInputMapper).map(input)
		}

		return output
	}
}