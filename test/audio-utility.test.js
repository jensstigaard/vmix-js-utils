// Using assert library
const assert = require('assert')

// Import the modules
const {
    AudioUtility
} = require('../dist/index')

const table = [
    {
        volume: 6.25,
        volumeBar: 50 // %
    },
    {
        volume: 9.83,
        volumeBar: 56 // %
    },
    {
        volume: 20.15,
        volumeBar: 67 // %
    },
    {
        volume: 49.79,
        volumeBar: 84 // %
    }
]

describe('audio-utility', function () {
    it('can convert volume values to volumeBar values', function () {
        table.forEach((entry) => {
            assert.equal(AudioUtility.fromVolume(entry.volume).volumeBar(), entry.volumeBar)
        })
    })

    it('can convert volumeBar values to volume values', function () {
        table.forEach((entry) => {
            assert.equal(AudioUtility.fromVolumeBar(entry.volumeBar).volume(), entry.volume)
        })
    })

})