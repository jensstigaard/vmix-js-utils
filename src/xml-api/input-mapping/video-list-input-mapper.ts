
import { VideoInputMapper } from './video-input-mapper'
import { VideoListInput } from 'types/inputs/video'

export class VideoListInputMapper extends VideoInputMapper {

	map(input: Element, includeLayers: boolean = true): VideoListInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),
			selectedIndex: Number(input.attributes.getNamedItem('selectedIndex')!.value),
			list: [], // TODO: ???
		}

		return output
	}
}
