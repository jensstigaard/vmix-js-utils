
import { GenericPlayableWithAudioInputMapper } from './generic-av-input-mapper'
import { SrtStreamInput } from '../../types/inputs/streams'

export class VideoCallInputMapper extends GenericPlayableWithAudioInputMapper {

	map(input: Element, includeLayers: boolean = true): SrtStreamInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),

			// Video Call
			videoCall: {
				password: input.attributes.getNamedItem('callPassword')!.value,
				isConnected: input.attributes.getNamedItem('callConnected')!.value === 'True',
				videoSource: input.attributes.getNamedItem('callVideoSource')!.value,
				audioSource: input.attributes.getNamedItem('callAudioSource')!.value,
			}
		}

		return output
	}
}
