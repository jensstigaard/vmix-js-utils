// Types
import { VideoInput } from '../../../types/inputs/video'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'
import { GenericAudioInputMapper } from './generic-audio-input-mapper'

export abstract class GenericPlayableWithAudioInputMapper extends PlayableInputMapper {

	map(input: Element, includeLayers: boolean = true): VideoInput {
		return {
			...super.map(input, includeLayers),
			...(new GenericAudioInputMapper).map(input)
		}
	}
}
