import { BaseInputMapper } from './base-input-mapper'
import { TitleInput, TitleField, TitleFieldType } from '../../../types/input/title'

export class TitleInputMapper extends BaseInputMapper {
	map(input: Element): TitleInput {
		// Map base output attributes
		const output = {
			...super.map(input),
		} as TitleInput

		const fields: TitleField[] = []

		// A regular .forEach doesn't work on this somehow...
		for (const i in input.childNodes) {
			const titleFieldEl: Element = input.childNodes[i] as Element

			// Guard child node does not have node name and the node is not of correct type
			if (!titleFieldEl.nodeName || !['image', 'text'].includes(titleFieldEl.nodeName)) {
				continue
			}

			const type = titleFieldEl.nodeName as TitleFieldType

			const indexAttr = titleFieldEl.attributes.getNamedItem('index')
			// Guard child node does not have a index attribute
			if (!indexAttr) {
				continue
			}

			const nameAttr = titleFieldEl.attributes.getNamedItem('name')
			// Guard child node does not have a name attribute
			if (!nameAttr) {
				continue
			}

			// Build fields of object from its attributes
			const titleField: TitleField = {
				index: Number(indexAttr.value),
				type,
				name: nameAttr.value,
				value: titleFieldEl.textContent!.trim()
			}

			fields.push(titleField)
		}

		output.fields = fields

		return output
	}
}