
export type AudioBus = {
	abbr: string

	name: string

	volume: number
	muted: boolean

	meterF1: number
	meterF2: number
}

// Master AudioBus extends AudioBus type
export type MasterAudioBus = AudioBus & {
	headphonesVolume: number
}