// Imports
import _ from 'lodash'
import xpath from 'xpath'

// Types
import { AudioBus, MasterAudioBus } from '../types/audio-bus'

// Map single audio channel info from XML
function mapSingleAudioChannel(entry: Element): AudioBus | MasterAudioBus {

	// Map all base attributes of input
	const name: string = entry.nodeName

	// Guard bus name - must be master or busA-busH
	if (name !== 'master' && !name.startsWith('bus')) {
		throw new Error(`Unknown name of audio bus.. ${name}`)
	}

	const abbr = name === 'master' ? 'M' : name.replace('bus', '')

	const attributesList = Object.values(entry.attributes)

	// Extract attributes
	const volumeAttr = attributesList.find((attr: Attr) => attr.name === 'volume')
	const mutedAttr = attributesList.find((attr: Attr) => attr.name === 'muted')
	const meterF1attr = attributesList.find((attr: Attr) => attr.name === 'meterF1')
	const meterF2attr = attributesList.find((attr: Attr) => attr.name === 'meterF2')

	// Guard missing attributes
	if (!volumeAttr || !mutedAttr || !meterF1attr || !meterF2attr) {
		throw new Error(`Audio bus did not contain necessary attributes`)
	}

	// Parsed info
	const bus = {
		name,
		abbr,
		muted: String(mutedAttr.nodeValue) === 'True',
		volume: Number(volumeAttr.nodeValue),
		meterF1: Number(meterF1attr.nodeValue),
		meterF2: Number(meterF2attr.nodeValue)
	}

	const headphonesVolumeAttr = attributesList.find((attr: Attr) => attr.name === 'headphonesVolume')

	if (headphonesVolumeAttr) {
		return {
			...bus,
			headphonesVolume: Number(headphonesVolumeAttr.nodeValue)
		}
	}


	return bus
}

export default class XmlAudio {

	static all(xmlContent: Node): { [key: string]: AudioBus } {
		const audioBussesXml: Element[] = xpath.select('//vmix/audio/*', xmlContent) as Element[]

		// console.log(audioBussesXml)
		// return

		const audioBusses = audioBussesXml.map(mapSingleAudioChannel)

		// console.log(audioBusses)

		return _.keyBy(
			audioBusses,
			(bus: AudioBus) => bus.name
		)
	}

	static busses(xmlContent: Node): { [key: string]: AudioBus } {
		const audioBussesXml: Element[] = xpath.select(`//vmix/audio/*[starts-with(local-name(),'bus')]`, xmlContent) as Element[]

		// console.log(audioBussesXml)
		// return

		const audioBusses = audioBussesXml.map(mapSingleAudioChannel)

		// console.log(audioBusses)

		return _.keyBy(
			audioBusses,
			(bus: AudioBus) => bus.name
		) as { [key: string]: AudioBus }
	}

	static master(xmlContent: Node): MasterAudioBus {
		const masterAudioXMLelement: Element = xpath.select('//vmix/audio/master', xmlContent, true) as Element

		return mapSingleAudioChannel(masterAudioXMLelement)! as MasterAudioBus
	}
}