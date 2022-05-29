import { VideoInputMapper } from './video-input-mapper'

import { PowerpointInput } from 'types/inputs/powerpoint'

export class PowerpointInputMapper extends VideoInputMapper {
	map(input: Element, includeLayers: boolean = true): PowerpointInput {
		// console.log(items)

		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),

			currentSlideNumber: Number(input.attributes.getNamedItem('selectedIndex')!.value),
		}

		return output
	}
}
