import { PlayableInput } from "."
import { GenericAudioInput } from "./audio"

/**
 * Stream input
 */
 export type StreamInput = PlayableInput & GenericAudioInput
 
 /**
	* SRT stream input
	*/
	export type SrtStreamInput = PlayableInput & GenericAudioInput
