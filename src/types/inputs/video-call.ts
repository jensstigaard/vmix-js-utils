import { PlayableInput } from "."
import { GenericAudioInput } from "./audio"

type AudioBus = 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG' | 'BusG'

/**
 * Video call input (vMix call)
 */
export type VideoCallInput = PlayableInput & GenericAudioInput & {
	call: {
		password: string
		isConnected: boolean
		videoSource: 'Output1' | 'Output2' | 'Output3' | 'Output4' | string
		audioSource: 'Master' | 'Headphones' | AudioBus | string
	}
}