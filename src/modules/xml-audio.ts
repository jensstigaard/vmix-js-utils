// Imports
import _ from 'lodash'
import xpath, { SelectedValue } from 'xpath'

// Types
import { AudioBus } from '../types/audio-bus'

// Map single audio channel info from XML
function mapSingleAudioChannel(entry: Element): AudioBus {

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

	// No attribute found
	if (!volumeAttr || !mutedAttr) {
		throw new Error(`Audio bus did not contain volume or muted attribute`)
	}

	// Parsed info
	const volume: number = Number(volumeAttr.nodeValue)
	const muted: boolean = String(mutedAttr.nodeValue) === 'True'

	return { name, abbr, muted, volume }
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
		) as { [key: string]: AudioBus }
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

	static master(xmlContent: Node): AudioBus {
		const masterAudioXMLelement: Element = xpath.select('//vmix/audio/master', xmlContent, true) as Element

		return mapSingleAudioChannel(masterAudioXMLelement)!
	}
}