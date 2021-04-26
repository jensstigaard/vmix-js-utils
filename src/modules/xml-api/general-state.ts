// Imports
import _ from 'lodash'
import xpath from 'xpath'

// Types
// import { AudioBus, MasterAudioBus } from '../types/audio-bus'

/**
 * Read out of General state of vMix instance
 */
export default class XmlState {
	/**
	 * Raw data from last known state of vmix instance
	 */
	_data: Document

	constructor(xmlDocument: Document) {
		this._data = xmlDocument
	}

	update = (xmlDocument: Document): void => {
		this._data = xmlDocument
	}

	/**
	 * Software version
	 * @returns I.e. 24.0.0.50
	 */
	softwareVersion(xmlDocument?: Document): string {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/version', this._data) as Element

		return el.textContent!
	}

	/**
	 * Software edition
	 * 
	 * @returns One of following values: Free, Basic, HD, 4K, Pro
	 */
	softwareEdition(xmlDocument?: Document): string {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/edition', this._data) as Element

		return el.textContent!
	}

	/**
	 * Preset file path (if present)
	 */
	preset(xmlDocument?: Document): string | undefined {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/preset', this._data) as Element

		if (!el) {
			return undefined
		}

		return el.textContent!.trim()
	}

	/**
	 * Is currently faded to black?
	 */
	fadedToBlack(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/fadeToBlack', this._data) as Element

		return el.textContent! === 'True'
	}

	/**
	 * Is currently recording?
	 */
	recording(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/recording', this._data) as Element

		return el.textContent! === 'True'
	}

	/**
	 * Is external output enabled?
	 */
	externalOutput(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/recording', this._data) as Element

		return el.textContent! === 'True'
	}

	/**
	 * Is currently streaming?
	 */
	streaming(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/streaming', this._data) as Element

		return el.textContent! === 'True'
	}

	/**
	 * Is currently playing back using the playlist module?
	 */
	playlistActive(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/playList', this._data) as Element

		return el.textContent! === 'True'
	}

	/**
	 * Is the multicorder module currently recording?
	 */
	multiCorder(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}
		const el: Element = xpath.select1('//vmix/multiCorder', this._data) as Element

		return el.textContent! === 'True'
	}

	/**
	 * Is fullscreen output currently enabled?
	 */
	fullscreenOutput(xmlDocument?: Document): boolean {
		if (xmlDocument) {
			this.update(xmlDocument)
		}

		const el: Element = xpath.select1('//vmix/fullscreen', this._data) as Element

		return el.textContent! === 'True'
	}
}