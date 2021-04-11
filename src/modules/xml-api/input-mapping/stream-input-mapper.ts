
import { GenericPlayableWithAudioInputMapper } from './generic-av-input-mapper'
import { StreamInput } from '../../../types/inputs/streams'

export class StreamInputMapper extends GenericPlayableWithAudioInputMapper {

	map(input: Element): StreamInput {
		return {
			...super.map(input)
		}
	}
}
