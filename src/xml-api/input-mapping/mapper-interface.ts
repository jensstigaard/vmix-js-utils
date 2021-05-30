// Types
import { BaseInput } from '../../types/inputs'

export interface MapperInterface {
	map(input: Element, includeLayers: boolean): BaseInput
}