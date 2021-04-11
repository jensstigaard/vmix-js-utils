
// Types
import { GenericAudioInput } from '../../../types/inputs/audio'
// Mappers
import { GenericAudioInputMapper } from './generic-audio-input-mapper'

export class AudioInputMapper extends GenericAudioInputMapper {

	map(input: Element): GenericAudioInput {
		return {
			...super.map(input),
		}
	}
}
