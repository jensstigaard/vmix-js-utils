/**
 * Generic input
 * NOTE! Should not be used!
 */
export type GenericInput = {
	[key: string]: any
}

/**
 * Base vMix input
 */
export type BaseInput = {
	key: string
	number: number
	type: InputType
	title: string
}

/**
 * Playable type
 * Video, AudioInput
 */
export type PlayableInput = BaseInput & {
	shortTitle: string
	state: InputState
	position: number
	duration: number
	loop: boolean

	// Mark in / out points (optional)
	markIn?: number
	markOut?: number
}

/**
 * Video input
 */
export type VideoInput = PlayableInput

/**
 * Video list input type
 * (extends playable input)
 */
export type VideoListInput = PlayableInput & {
	selectedIndex: number
	list?: string[]
}

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
export type AudioFileInput = BaseInput & GenericAudioInput & PlayableInput

/**
 * Input type
 */
export type InputType = 'Audio' // Microphone or other live audio source
	| 'Blank'
	| 'Browser'
	| 'Capture' // Camera input
	| 'Colour'
	| 'DesktopCapture'
	| 'GT'
	| 'Image'
	| 'ImageSequence'
	| 'Photos' // Photos slideshow
	| 'Srt' // SRT stream
	| 'Xaml' // XAML title
	| 'Video' // Video or audio file
	| 'VideoDelay' // Video delay
	| 'VideoList' // List of video or audio files
	| 'VirtualSet'
	| string // Allow arbitary string value to allow non-listed input types

/**
 * Input state
 */
export type InputState = 'Paused'
	| 'Running'
	| string // Allow arbitary string value to allow non-listed input state
