import { PlayableInput } from '.'

export type ReplayInput = PlayableInput & {
	replay: ReplayChannel & {
		live: boolean

		recording: boolean

		channelMode: ChannelMode // Current channel mode

		// Currently selected events bank (tab)
		channelA: ReplayChannelVariables
		channelB: ReplayChannelVariables
	}
}

export type ChannelMode = 'AB' | 'A' | 'B'

export type CameraNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type ReplayChannel = {
	eventBank: number
	speed: number
	timecode: Date
}

export type ReplayChannelVariables = ReplayChannel & {
	camera: CameraNumber
}