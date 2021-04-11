
import { GenericPlayableWithAudioInputMapper } from './generic-av-input-mapper'
import { SrtStreamInput } from '../../../types/inputs/streams'

export class SrtStreamInputMapper extends GenericPlayableWithAudioInputMapper {

	map(input: Element): SrtStreamInput {
		return {
			...super.map(input)
		}
	}
}
