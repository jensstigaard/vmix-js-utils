import xpath from 'xpath'
// Types
import { ReplayInput, ChannelMode, ReplayChannelVariables, CameraNumber } from '../../../types/inputs/replay'
// Mappers
import { PlayableInputMapper } from './playable-input-mapper'

export class ReplayInputMapper extends PlayableInputMapper {
	// Required replay attributes (in sub element)
	requiredReplayAttributes = [
		'live', 'recording', 'channelMode',
		'events', 'eventsA', 'eventsB',
		'cameraA', 'cameraB',
		'speed', 'speedA', 'speedB'
	]

	private mapChannel(replayEl: Element, channel: 'A' | 'B'): ReplayChannelVariables {
		const timecodeEl = xpath.select1(`timecode${channel}`, replayEl) as Element

		return {
			eventBank: Number(replayEl.attributes.getNamedItem(`events${channel}`)!.value),
			camera: Number(replayEl.attributes.getNamedItem(`camera${channel}`)!.value) as CameraNumber,
			speed: Number(replayEl.attributes.getNamedItem(`speed${channel}`)!.value),
			timecode: new Date(String(timecodeEl.textContent)),
		}
	}

	map(input: Element, includeLayers: boolean = true): ReplayInput {
		// Map base output attributes
		const baseOutput = super.map(input, includeLayers)

		const replayEl = xpath.select1('replay', input) as Element

		if (!replayEl) {
			throw new Error(
				`Input no. ${baseOutput.number} '${baseOutput.title}' did not contain required child node element 'replay'...`
			)
		}

		// console.log(replayEl)

		// console.log(this.requiredReplayAttributes)

		// Guard check required attributes in replay element
		this.requiredReplayAttributes.forEach(attrName => {
			const attr = replayEl.attributes.getNamedItem(attrName)
			if (!attr) {
				throw new Error(
					`Replay element under input no. ${baseOutput.number} '${baseOutput.title}' did not contain required attribute '${attrName}'...`
				)
			}
		})

		const timecodeEl = xpath.select1('timecode', replayEl) as Element

		const replay = {
			live: replayEl.attributes.getNamedItem('live') ? Boolean(replayEl.attributes.getNamedItem('live')!.value === 'True') : false,
			recording: replayEl.attributes.getNamedItem('recording') ? Boolean(replayEl.attributes.getNamedItem('recording')!.value === 'True') : false,

			channelMode: replayEl.attributes.getNamedItem('channelMode')!.value as ChannelMode,

			eventBank: Number(replayEl.attributes.getNamedItem('events')!.value),
			speed: Number(replayEl.attributes.getNamedItem('speed')!.value),
			timecode: new Date(String(timecodeEl.textContent)),

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