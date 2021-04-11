import xpath from 'xpath'

import { PlayableInputMapper } from './playable-input-mapper'
import { ReplayInput, ChannelMode, ReplayChannelVariables, CameraNumber } from '../../../types/input/replay'


export class ReplayInputMapper extends PlayableInputMapper {
	// Required replay attributes (in sub element)
	requiredReplayAttributes = [
		'live', 'recording', 'channelMode',
		'events', 'eventsA', 'eventsB',
		'cameraA', 'cameraB',
		'speed', 'speedA', 'speedB'
	]

	private mapChannel(replayEl: Element, channel: 'A' | 'B'): ReplayChannelVariables {

		const timecodeNode = replayEl.childNodes

		console.log('replay el keys:', Object.keys(replayEl.childNodes))

		return {
			eventBank: Number(replayEl.attributes.getNamedItem(`events${channel}`)!.value),
			camera: Number(replayEl.attributes.getNamedItem(`camera${channel}`)!.value) as CameraNumber,
			speed: Number(replayEl.attributes.getNamedItem(`speed${channel}`)!.value),
			timecode: new Date,
		}
	}

	map(input: Element): ReplayInput {
		// Map base output attributes
		const baseOutput = super.map(input)

		const replayEl = xpath.select1('replay', input) as Element

		if (!replayEl) {
			throw new Error(`Input no. ${baseOutput.number} '${baseOutput.title}' did not contain required child node element 'replay'...`)
		}

		// console.log(replayEl)

		// console.log(this.requiredReplayAttributes)

		// Guard check required attributes in replay element
		this.requiredReplayAttributes.forEach(attrName => {
			const attr = replayEl.attributes.getNamedItem(attrName)
			if (!attr) {
				throw new Error(`Replay element under input no. ${baseOutput.number} '${baseOutput.title}' did not contain required attribute '${attrName}'...`)
			}
		})


		const replay = {
			live: replayEl.attributes.getNamedItem('live') ? Boolean(replayEl.attributes.getNamedItem('live')!.value === 'True') : false,
			recording: replayEl.attributes.getNamedItem('recording') ? Boolean(replayEl.attributes.getNamedItem('recording')!.value === 'True') : false,

			channelMode: replayEl.attributes.getNamedItem('channelMode')!.value as ChannelMode,

			eventBank: Number(replayEl.attributes.getNamedItem('events')!.value),
			speed: Number(replayEl.attributes.getNamedItem('speed')!.value),
			timecode: new Date,

			// Replay channel specific variables
			channelA: this.mapChannel(replayEl, 'A'),
			channelB: this.mapChannel(replayEl, 'B'),
		}

		return {
			...baseOutput,
			replay
		}
	}
}