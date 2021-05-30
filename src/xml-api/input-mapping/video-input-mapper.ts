
import { GenericPlayableWithAudioInputMapper } from './generic-av-input-mapper'
import { SrtStreamInput } from '../../types/inputs/streams'

export class VideoInputMapper extends GenericPlayableWithAudioInputMapper {

	map(input: Element, includeLayers: boolean = true): SrtStreamInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers)
		}

		return output
	}
}
