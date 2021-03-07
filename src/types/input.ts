export type Input = {
	key?: string
	number?: number
	type?: InputType
	title?: string
	shortTitle?: string
	state?: InputState
	position?: number
	duration?: number
	loop?: boolean
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

export type InputType = 'AudioFile'
	| 'Audio'
	| 'Browser'
	| 'Colour'
	| 'GT'
	| 'Xaml'
	| 'Video'
	| 'VideoList'
	| string

export type InputState = 'Paused'
	| 'Running'
	| string // Arbitary value