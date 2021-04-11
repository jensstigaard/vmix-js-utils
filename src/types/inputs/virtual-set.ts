import { PlayableInput } from ".";

/**
 * Virtual Set input type
 */
export type VirtualSetInput = PlayableInput & {
	layers: VirtualSetLayer[]
}

/**
 * Virtual set layer
 */
export type VirtualSetLayer = {
	index: number
	key: string

	position?: VirtualSetLayerPosition
}

/**
 * Virtual set layer position
 */
export type VirtualSetLayerPosition = {
	pan: {
		x: number
		y: number
	}

	zoom: {
		x: number
		y: number
	}
}
