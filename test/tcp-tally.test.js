// Using assert library
const assert = require('assert')

// Import the modules
const {
    TcpTally
} = require('../dist/index')

const data = '00010002'

describe('input-mapper', function () {
    it('should have 8 inputs from the sample data', function () {
        const inputsTallyInfo = TcpTally.extractInputs(data)

        // Assert the inputs were found
        assert.equal(inputsTallyInfo.length, 8, 'Did not see expected number of inputs')
    })

    it('should have a input in program from the sample data', function () {
        const inputsTallyInfo = TcpTally.extractInputs(data)

        // Assert the inputs were found
        assert.equal(inputsTallyInfo.filter(state => state === 1).length, 1)
    })
})