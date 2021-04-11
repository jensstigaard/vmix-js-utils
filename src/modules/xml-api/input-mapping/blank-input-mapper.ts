import { BaseInput } from '../../../types/input'
import { BaseInputMapper } from './base-input-mapper'

export class BlankInputMapper extends BaseInputMapper {
	map(input: Element): BaseInput {
		// Map base output attributes
		const output = {
			...super.map(input),
		}

		return output
	}
}
