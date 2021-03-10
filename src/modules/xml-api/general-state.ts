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

	/**
	 * Software version
	 * @returns
	 */
	softwareVersion(): string {
		const node: Element = xpath.select('//vmix/version', this._data, true) as Element

		return node.textContent!
	}

	/**
	 * Software edition
	 * Value one of following: Free, Basic, HD, 4K, Pro
	 * @returns 
	 */
	softwareEdition(): string {
		const node: Element = xpath.select('//vmix/edition', this._data, true) as Element

		return node.textContent!
	}

	/**
	 * Is currently faded to black?
	 * @returns
	 */
	fadedToBlack(): boolean {
		const node: Element = xpath.select('//vmix/fadeToBlack', this._data, true) as Element

		return node.textContent! === 'True'
	}

	/**
	 * Is recording currently
	 * @returns
	 */
	recording(): boolean {
		const node: Element = xpath.select('//vmix/recording', this._data, true) as Element

		return node.textContent! === 'True'
	}

	/**
	 * Is external output enabled?
	 * @returns
	 */
	external(): boolean {
		const node: Element = xpath.select('//vmix/recording', this._data, true) as Element

		return node.textContent! === 'True'
	}

	/**
	 * Is currently streaming?
	 * @returns
	 */
	streaming(): boolean {
		const node: Element = xpath.select('//vmix/streaming', this._data, true) as Element

		return node.textContent! === 'True'
	}

	/**
	 * Is currently playing back using the playlist module?
	 * @returns
	 */
	playlist(): boolean {
		const node: Element = xpath.select('//vmix/playList', this._data, true) as Element

		return node.textContent! === 'True'
	}

	/**
	 * Is multicorder currently enabled?
	 * @returns
	 */
	multiCorder(): boolean {
		const node: Element = xpath.select('//vmix/multiCorder', this._data, true) as Element

		return node.textContent! === 'True'
	}

	/**
	 * Is fullscreen mode currently enabled?
	 * 
	 * @returns 
	 */
	fullscreen(): boolean {
		const node: Element = xpath.select('//vmix/fullscreen', this._data, true) as Element

		return node.textContent! === 'True'
	}
}