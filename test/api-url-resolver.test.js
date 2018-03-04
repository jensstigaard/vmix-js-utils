const assert = require('assert')

const ApiUrlResolver = require('../src/api-url-resolver')

describe('api-url-resolver', function () {
    describe('resolve', function () {
        it('should pass and resolve basic host and port', function () {
            assert.equal(ApiUrlResolver.resolve('localhost', 8088), 'http://localhost:8088/api')
        })

        it('should throw an exception if host is less than three characters', function () {
            assert.throws(() => { ApiUrlResolver.resolve('ab') })
        })

        it('should throw an exception if port is equal to zero', function () {
            assert.throws(() => { ApiUrlResolver.resolve('localhost', 0) })
        })

        it('should throw an exception if port is less than zero', function () {
            assert.throws(() => { ApiUrlResolver.resolve('localhost', -5) })
        })
    })
})