// Types
import { BaseInput } from '../../types/inputs'
// Mappers
import { BaseInputMapper } from './base-input-mapper'

export class BlankInputMapper extends BaseInputMapper {
	map(input: Element, includeLayers: boolean = true): BaseInput {
		// Map base output attributes
		const output = {
			...super.map(input, includeLayers),
		}

		return output
	}
}
