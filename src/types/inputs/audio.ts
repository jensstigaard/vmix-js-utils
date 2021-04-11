import { BaseInput, PlayableInput } from '.'

/**
 * Generic audio input type
 * Can be any input containing audio channels, i.e.
 *  - Microphone
 *  - Camera
 *  - vMix Call
 *  - Audio file
 *  - Video file
 *  - NDI source
 *  - SRT input
 */
 export type GenericAudioInput = BaseInput & {
	muted: boolean
	volume: number
	balance: number // -1=left, 0=center, 1=right
	solo: boolean
	audiobusses: string[]
	audioMeter: {
		left: number
		right: number
	},
	gainDb?: number // Introduced in vMix 24
}

/**
 * Audio File input type
 */
export type AudioFileInput = GenericAudioInput & PlayableInput
