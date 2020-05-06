export default class AudioUtility {

	_amplitudeValue: number = 0

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

		}
	}

	/**
	 * Smart-constructors
	 **/
	static fromAmplitude(value: number) {
		return new AudioUtility('amplitude', value)
	}

	static fromMeterF(value: number) {
		return new AudioUtility('meterF', value)
	}

	static fromVolume(value: number) {
		return new AudioUtility('volume', value)
	}

	static fromVolumeBar(value: number) {
		return new AudioUtility('volumeBar', value)
	}

	/**
	 * Smart-constructors END
	 **/


	/**
	 * Methods for fetching value in a specific format
	 **/

	amplitude(): number {
		return this._amplitudeValue
	}

	volume(): number {
		return Math.round(this._amplitudeValue * 100 * 100) / 100
	}

	volumeBar(): number {
		return Math.round(
			Math.pow(this._amplitudeValue, 0.25) * 100
		)
	}
}