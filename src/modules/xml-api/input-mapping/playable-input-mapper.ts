// Types
import { PlayableInput } from '../../../types/inputs'
// Mappers
import { BaseInputMapper } from './base-input-mapper'

export abstract class PlayableInputMapper extends BaseInputMapper {
	requiredAttributes = ['shortTitle', 'state', 'position', 'duration']

	map(input: Element, includeLayers: boolean = true): PlayableInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),

			shortTitle: input.attributes.getNamedItem('shortTitle')!.value,
			state: input.attributes.getNamedItem('state')!.value,
			position: Number(input.attributes.getNamedItem('position')!.value),
			duration: Number(input.attributes.getNamedItem('duration')!.value),
			markIn: input.attributes.getNamedItem('markIn') ? Number(input.attributes.getNamedItem('markIn')!.value) : undefined,
			markOut: input.attributes.getNamedItem('markOut') ? Number(input.attributes.getNamedItem('markOut')!.value) : undefined,
			loop: input.attributes.getNamedItem('loop') ? Boolean(input.attributes.getNamedItem('loop')!.value === 'True') : false
		}

		return output
	}
}
