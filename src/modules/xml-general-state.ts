// Imports
import _ from 'lodash'
import xpath from 'xpath'

// Types
// import { AudioBus, MasterAudioBus } from '../types/audio-bus'

//
export default class XmlState {
	_data: Node

	constructor(xmlDocument: Document) {
		this._data = xmlDocument
	}

	update = (xmlDocument: Document): void => {
		this._data = xmlDocument
	}

	softwareVersion(): string {
		const node: Element = xpath.select('//vmix/version', this._data, true) as Element

		return node.textContent!
	}

	softwareEdition(): string {
		const node: Element = xpath.select('//vmix/edition', this._data, true) as Element

		return node.textContent!
	}

	fadedToBlack(): boolean {
		const node: Element = xpath.select('//vmix/fadeToBlack', this._data, true) as Element

		return node.textContent! === 'True'
	}


	recording(): boolean {
		const node: Element = xpath.select('//vmix/recording', this._data, true) as Element

		return node.textContent! === 'True'
	}

	external(): boolean {
		const node: Element = xpath.select('//vmix/recording', this._data, true) as Element

		return node.textContent! === 'True'
	}


	streaming(): boolean {
		const node: Element = xpath.select('//vmix/streaming', this._data, true) as Element

		return node.textContent! === 'True'
	}


	playlist(): boolean {
		const node: Element = xpath.select('//vmix/playList', this._data, true) as Element

		return node.textContent! === 'True'
	}

	multiCorder(): boolean {
		const node: Element = xpath.select('//vmix/multiCorder', this._data, true) as Element

		return node.textContent! === 'True'
	}

	fullscreen(): boolean {
		const node: Element = xpath.select('//vmix/fullscreen', this._data, true) as Element

		return node.textContent! === 'True'
	}


}