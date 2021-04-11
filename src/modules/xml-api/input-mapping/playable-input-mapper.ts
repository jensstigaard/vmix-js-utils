import { BaseInputMapper } from './base-input-mapper'
import { PlayableInput } from '../../../types/input'

export abstract class PlayableInputMapper extends BaseInputMapper {
	requiredAttributes = ['shortTitle', 'state', 'position', 'duration']

	map(input: Element): PlayableInput {
		// Map base output attributes
		const output = {
			...super.map(input),

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
