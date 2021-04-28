import { PlayableInput } from '.'
import { InputLayer } from './index'

/**
 * Virtual Set input type
 */
export type VirtualSetInput = PlayableInput & {
	layers: InputLayer[]
}

export type VirtualSetLayer = InputLayer