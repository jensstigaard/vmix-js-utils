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
	layers?: InputLayer[]
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
 * Mix input type
 */
export type MixInput = PlayableInput


/**
 * Input Layer
 * Used by Virtuel Set and "multi view"-inputs
 */
export type InputLayer = {
	index: number
	key: string

	position?: InputLayerPosition
}

/**
 * Input layer position
 */
export type InputLayerPosition = {
	panX?: number
	panY?: number
	zoomX?: number
	zoomY?: number
}

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
	| 'Mix'
	| 'NDI'
	| 'Photos' // Photos slideshow/folder
	| 'Stream' // RTSP stream
	| 'SRT' // SRT stream
	| 'Xaml' // XAML title
	| 'Video' // Video or audio file
	| 'VideoDelay' // Video delay
	| 'VideoList' // List of video or audio files
	| 'VirtualSet'
	| 'VLC' // VLC stream
	| string // Allow arbitary string value to allow non-listed input types

/**
 * Input state
 */
export type InputState = 'Paused'
	| 'Running'
	| 'Completed'
	| string // Allow arbitary string value to allow non-listed input state
