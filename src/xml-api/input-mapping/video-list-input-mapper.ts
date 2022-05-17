import xpath from 'xpath'

import { VideoInputMapper } from './video-input-mapper'
import { VideoListInput, VideoListItem } from 'types/inputs/video-list'

export class VideoListInputMapper extends VideoInputMapper {

	map(input: Element, includeLayers: boolean = true): VideoListInput {
		const listItemsEls = xpath.select('list/item', input) as Element[]

		const items: VideoListItem[] = listItemsEls.map(el => {
			return {
				filePath: el.textContent || '',
				selected: el.attributes.getNamedItem('selected')?.value === 'true' || false,
			}
		})

		// console.log(items)

		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),

			selectedIndex: Number(input.attributes.getNamedItem('selectedIndex')!.value),
			items
		}

		return output
	}
}
