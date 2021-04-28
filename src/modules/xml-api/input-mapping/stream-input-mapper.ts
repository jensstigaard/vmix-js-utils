
import { GenericPlayableWithAudioInputMapper } from './generic-av-input-mapper'
import { StreamInput } from '../../../types/inputs/streams'

export class StreamInputMapper extends GenericPlayableWithAudioInputMapper {

	map(input: Element, includeLayers: boolean = true): StreamInput {
		return {
			...super.map(input, includeLayers)
		}
	}
}
