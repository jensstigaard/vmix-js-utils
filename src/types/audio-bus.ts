
export type AudioBus = {
	abbr: string
	name: string

	// State
	volume: number
	muted: boolean

	// Latest readout
	meterF1: number
	meterF2: number

	// Custom name (since vMix 24.0.0.46)
	customName?: string
}

// Master AudioBus extends AudioBus type
export type MasterAudioBus = AudioBus & {
	headphonesVolume: number
}