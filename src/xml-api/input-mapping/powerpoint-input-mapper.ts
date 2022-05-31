import { VideoInputMapper } from './video-input-mapper'

import { PowerpointInput } from 'types/inputs/powerpoint'

export class PowerpointInputMapper extends VideoInputMapper {
	map(input: Element, includeLayers: boolean = true): PowerpointInput {
		// console.log(items)

		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),

			// Current slide number - starting at 1
			// (The position field also seems to show the current slide, but starting with 0)
			currentSlideNumber: Number(input.attributes.getNamedItem('selectedIndex')!.value),

			// Total number of slides in Powerpoint file
			totalNumberOfSlides: Number(input.attributes.getNamedItem('duration')!.value),
		}

		return output
	}
}
