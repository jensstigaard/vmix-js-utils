import { PlayableInput, InputLayer, InputLayerPosition } from '.'

/**
 * Virtual Set input type
 */
export type VirtualSetInput = PlayableInput & {
	layers: InputLayer[], // Layers in virtual set
	currentPosition?: InputLayerPosition // Current Pan and zoom of virtual set
}

export type VirtualSetLayer = InputLayer
