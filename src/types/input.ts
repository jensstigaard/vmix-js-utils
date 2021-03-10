export type Input = {
	key?: string
	number?: number
	type?: InputType
	title?: string
	shortTitle?: string

	/**
	 * Playback related  attributes
	 */
	state?: InputState
	position?: number
	duration?: number
	loop?: boolean

	/**
	 * Audio related attributes
	 */
	muted?: boolean
	volume?: number
	balance?: number
	solo?: boolean
	audiobusses?: string[]
	meterF1?: number
	meterF2?: number
	gainDb?: number

	// Title (GT or Xaml) specific attributes
	fields?: { [key: string]: any }[]

	// VideoList specific attributes
	selectedIndex?: number
	list?: string[]
}

/**
 * Input type
 */
export type InputType = 'Audio'
	| 'AudioFile'
	| 'Blank'
	| 'Browser'
	| 'Colour'
	| 'GT'
	| 'Xaml'
	| 'Video'
	| 'VideoList'
	| string // Allow arbitary string value to allow non-listed input types

/**
 * Input state
 */
export type InputState = 'Paused'
	| 'Running'
	| string // Allow arbitary string value to allow non-listed input state
