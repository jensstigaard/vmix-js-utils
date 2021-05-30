// Imports
import _ from 'lodash'
import xpath from 'xpath'

// Types
import { AudioBus, MasterAudioBus } from '../types/audio-bus'

/**
 * Helper function: Map single audio bus info from XML
 * @param audioBusNode
 * @returns 
 */
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
	// Optional attributes
	const customName = audioBusNode.attributes.getNamedItem('name')

	// Guard missing attributes
	if (!volumeAttr || !mutedAttr || !meterF1attr || !meterF2attr) {
		throw new Error(`Audio bus ${abbr} did not contain necessary attributes`)
	}

	// Parse audio bus info into class object
	const bus = {
		name,
		abbr,
		muted: String(mutedAttr.value) === 'True',
		volume: Number(volumeAttr.value),
		audioMeter: {
			left: Number(meterF1attr.value),
			right: Number(meterF2attr.value),
		}
	} as AudioBus

	// Parse custom audio bus name
	if (customName && customName.value && customName.value.length > 0) {
		bus.customName = customName.value
	}

	// For master bus only - Append headphones volume
	if (name === 'master') {
		const headphonesVolumeAttr = audioBusNode.attributes.getNamedItem('headphonesVolume')

		if (headphonesVolumeAttr) {
			return {
				...bus,
				headphonesVolume: Number(headphonesVolumeAttr.value)
			} as MasterAudioBus
		}
	}

	return bus
}

/**
 * Audio busses class
 */
export default class AudioBusses {

	/**
	 * Extract info for all audio channels (master + busses) from XML document
	 * 
	 * @param xmlDocument
	 */
	static all(xmlDocument: Document): { [key: string]: AudioBus } {
		const audioBussesXml: Element[] = xpath.select('//vmix/audio/*', xmlDocument) as Element[]

		// console.log(audioBussesXml)

		const audioBusses = audioBussesXml.map(mapSingleAudioBus)

		// console.log(audioBusses)

		return _.keyBy(
			audioBusses,
			(bus: AudioBus) => bus.name
		)
	}

	/**
	 * Extract all audio-busses from XML document (excluding master)
	 *
	 * @param xmlDocument
	 */
	static busses(xmlDocument: Document): { [key: string]: AudioBus } {
		const audioBussesXml: Element[] = xpath.select(
			`//vmix/audio/*[starts-with(local-name(),'bus')]`,
			xmlDocument
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
	 * Extract master audio bus info from XML document
	 * @param xmlDocument
	 */
	static master(xmlDocument: Document): MasterAudioBus {
		const masterAudioXMLelement: Element = xpath.select('//vmix/audio/master', xmlDocument, true) as Element

		return mapSingleAudioBus(masterAudioXMLelement)! as MasterAudioBus
	}
}