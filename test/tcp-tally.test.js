// Using assert library
const assert = require('assert')

// Import the modules
const { TcpTally } = require('../dist/index')

// Known data to test
const data = '00010002'

describe('tcp-tally', function () {
    it('should have 8 inputs from the sample data', function () {
        const tallySummary = TcpTally.extractSummary(data)

        // Assert the inputs were found
        assert.strictEqual(tallySummary.numberOfInputs, 8)
    })

    it('should have a input in program from the sample data', function () {
        const tallySummary = TcpTally.extractSummary(data)

        // Assert the program input were found
        assert.strictEqual(tallySummary.program.length, 1)
    })

    it('should have a input in preview from the sample data', function () {
        const tallySummary = TcpTally.extractSummary(data)

        // Assert the program input were found
        assert.strictEqual(tallySummary.preview.length, 1)
    })

    it('can have multiple inputs in program duration a transition', function () {
        const data = '1100'

        const tallySummary = TcpTally.extractSummary(data)


        // Assert the tally summary
        assert.strictEqual(tallySummary.program.length, 2)
        assert.strictEqual(tallySummary.preview.length, 0)
    })

    it('can read preview input from program if program and preview is the same', function () {
        const data = '100' // No preview tally asserted - however, it is derived anyway

        const tallySummary = TcpTally.extractSummary(data)

        // Assert the tally
        assert.strictEqual(tallySummary.program.length, 1)
        assert.strictEqual(tallySummary.preview.length, 1)
    })

    it('cannot contain any characters besides number 0, 1 or 2', function () {
        const data = '100ABC' // Invalid input containing ABC

        assert.throws(() => {
            TcpTally.extractSummary(data)
        })
    })

    it('cannot contain any space characters', function () {
        const data = '100 ' // Invalid input containing a space

        assert.throws(() => {
            TcpTally.extractSummary(data)
        })
    })
})