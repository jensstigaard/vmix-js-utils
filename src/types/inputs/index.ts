/**
 * Generic input
 * NOTE! Should not be used!
 */
export type GenericInput = {
	[key: string]: unknown
}

/**
 * Base vMix input
 */
export type BaseInput = {
	key: string
	number: number
	type: InputType
	title: string

	/**
	 * Layers - when input are using (multi-)layers, i.e. as a multiview
	 */
	layers?: InputLayer[]
}

/**
 * Playable type
 * Video, AudioInput
 */
export type PlayableInput = BaseInput & {
	shortTitle: string
	state: InputState

	loop: boolean

	position: number // Playback position (ms)
	duration: number // Playback duration (ms)

	// Mark in / out points (optional)
	markIn?: number // (ms)
	markOut?: number // (ms)
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
	| 'Virtual'
	| 'VirtualSet'
	| 'VLC' // VLC stream
	| string & {} // Allow arbitary string value to allow non-listed input types. {} to keep autocomplete

/**
 * Input state
 */
export type InputState = 'Paused'
	| 'Running'
	| 'Completed'
	| string & {} // Allow arbitary string value to allow non-listed input state. {} to keep autocomplete
