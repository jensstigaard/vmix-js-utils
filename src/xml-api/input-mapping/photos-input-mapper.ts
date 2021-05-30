// Types
import { PhotosInput } from '../../types/inputs/image'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'

export class PhotosInputMapper extends PlayableInputMapper {
	map(input: Element, includeLayers: boolean = true): PhotosInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),

			// Number of photos (from duration)
			numberOfPhotos: Number(input.attributes.getNamedItem('duration')!.value),

			// Number of photos (from duration)
			currentPhotoIndex: Number(input.attributes.getNamedItem('selectedIndex')!.value),
		}

		return output
	}
}