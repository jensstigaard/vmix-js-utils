/**
 * Audio bus type
 */
export type AudioBus = {
	abbr: string
	name: string

	// State
	volume: number
	muted: boolean

	// Latest readout of audio signal value
	meterF1: number
	meterF2: number

	// Custom name (since vMix 24.0.0.46)
	customName?: string
}

/**
 * Master AudioBus type
 * Extends generic AudioBus type
 */
export type MasterAudioBus = AudioBus & {
	headphonesVolume: number
}
