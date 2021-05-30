/**
 * Audio utility helper class
 *
 * Based on info from
 * https://www.vmix.com/knowledgebase/article.aspx/144/vmix-api-audio-levels
 */
export default class AudioUtility {

	/**
	 * Value to hold internally in class
	 */
	protected _amplitudeValue: number = 0

	/**
	 * Audio utility class
	 * @param fromType
	 * @param {number} value
	 */
	constructor(fromType: 'amplitude' | 'meterF' | 'volume' | 'volumeBar', value: number) {
		switch (fromType) {
			case 'amplitude':
			case 'meterF':
				if (value < 0) {
					throw new Error(`Invalid ${fromType} value - Below 0: ${value}`)
				}
				if (value > 1) {
					throw new Error(`Invalid ${fromType} value - Above 1: ${value}`)
				}
				this._amplitudeValue = value
				break
			case 'volume':
				if (value < 0) {
					throw new Error(`Invalid volume value - Below 0: ${value}`)
				}
				if (value > 100) {
					throw new Error(`Invalid volume value - Above 100: ${value}`)
				}
				this._amplitudeValue = value / 100
				break
			case 'volumeBar':
				this._amplitudeValue = Math.pow(value / 100, 4)
				break
			default:
				throw new Error(`Invalid input - Unknown conversion 'from type': ${fromType}`)
		}

	}

	/**
	 * Smart-constructor: from Amplitude
	 **/
	static fromAmplitude(value: number) {
		return new AudioUtility('amplitude', value)
	}

	/**
	 * Smart-constructor: from Meter F
	 **/
	static fromMeterF(value: number) {
		return new AudioUtility('meterF', value)
	}

	/**
	 * Smart-constructor: from Volume
	 **/
	static fromVolume(value: number) {
		return new AudioUtility('volume', value)
	}

	/**
	 * Smart-constructor: from Volume bar
	 **/
	static fromVolumeBar(value: number) {
		return new AudioUtility('volumeBar', value)
	}

	// Smart-constructors END



	/**
	 * Methods for fetching value in a specific format
	 **/

	/**
	 * Return amplitude
	 * Value is between 0.0 and 1.0
	 * 
	 * @returns {number}
	 */
	amplitude(): number {
		return this._amplitudeValue
	}

	/**
	 * Return volume value (in dB)
	 * @returns {number}
	 */
	volume(): number {
		return Math.round(this._amplitudeValue * 100 * 100) / 100
	}

	/**
	 * Return volume bar
	 * Value is in percentage (between 0% and 100%)
	 * @returns {number}
	 */
	volumeBar(): number {
		return Math.round(
			Math.pow(this._amplitudeValue, 0.25) * 100
		)
	}
}