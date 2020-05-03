// Imports
import _ from 'lodash'
import xpath from 'xpath'

// Types
import { AudioBus, MasterAudioBus } from '../types/audio-bus'

// Map single audio bus info from XML
function mapSingleAudioBus(audioBusNode: Element): AudioBus | MasterAudioBus {

	// Map all base attributes of input
	const name: string = audioBusNode.nodeName

	// Guard bus name - must be master or busA-busH
	if (name !== 'master' && !name.startsWith('bus')) {
		throw new Error(`Unknown name of audio bus.. ${name}`)
	}

	const abbr = name === 'master' ? 'M' : name.replace('bus', '')

	// Extract attributes
	const volumeAttr = audioBusNode.attributes.getNamedItem('volume')
	const mutedAttr = audioBusNode.attributes.getNamedItem('muted')
	const meterF1attr = audioBusNode.attributes.getNamedItem('meterF1')
	const meterF2attr = audioBusNode.attributes.getNamedItem('meterF2')

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

	// For master bus only - Append headphones volume
	if (name === 'master') {
		const headphonesVolumeAttr = audioBusNode.attributes.getNamedItem('headphonesVolume')

		if (headphonesVolumeAttr) {
			return {
				...bus,
				headphonesVolume: Number(headphonesVolumeAttr.nodeValue)
			}
		}
	}


	return bus
}

export default class XmlAudio {

	/**
	 * All busses
	 * @param xmlContent
	 */
	static all(xmlContent: Node): { [key: string]: AudioBus } {
		const audioBussesXml: Element[] = xpath.select('//vmix/audio/*', xmlContent) as Element[]

		// console.log(audioBussesXml)

		const audioBusses = audioBussesXml.map(mapSingleAudioBus)

		// console.log(audioBusses)

		return _.keyBy(
			audioBusses,
			(bus: AudioBus) => bus.name
		)
	}

	/**
	 * Busses (excluding master)
	 *
	 * @param xmlContent
	 */
	static busses(xmlContent: Node): { [key: string]: AudioBus } {
		const audioBussesXml: Element[] = xpath.select(
			`//vmix/audio/*[starts-with(local-name(),'bus')]`,
			xmlContent
		) as Element[]

		// console.log(audioBussesXml)

		const audioBusses = audioBussesXml.map(mapSingleAudioBus)

		// console.log(audioBusses)

		return _.keyBy(
			audioBusses,
			(bus: AudioBus) => bus.name
		) as { [key: string]: AudioBus }
	}

	/**
	 * Audio master bus
	 * @param xmlContent
	 */
	static master(xmlContent: Node): MasterAudioBus {
		const masterAudioXMLelement: Element = xpath.select('//vmix/audio/master', xmlContent, true) as Element

		return mapSingleAudioBus(masterAudioXMLelement)! as MasterAudioBus
	}
}