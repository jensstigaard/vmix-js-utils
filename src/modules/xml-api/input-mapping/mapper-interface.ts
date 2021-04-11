import { BaseInput } from '../../../types/input'

export interface MapperInterface {
	map(input: Element): BaseInput
}