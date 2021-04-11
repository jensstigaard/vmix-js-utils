import { GenericAudioInput } from './audio'

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
export type VideoInput = PlayableInput & GenericAudioInput

/**
 * Video list input type
 * (extends playable input)
 */
export type VideoListInput = VideoInput & {
	selectedIndex: number
	list?: string[]
}

/**
 * Photos input type
 */
export type PhotosInput = PlayableInput & {
	numberOfPhotos: number
	currentPhotoIndex: number
}

/**
 * Virtual Set input type
 */
export type VirtualSetInput = PlayableInput & {
	layers: {
		index: number
		key: string

		position: {
			pan: {
				x: number
				y: number
			}
			zoom: {
				x: number
				y: number
			}
		} | undefined
	}[]
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
	| 'Photos' // Photos slideshow
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
	| string // Allow arbitary string value to allow non-listed input state
