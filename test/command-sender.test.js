const assert = require('assert')
const moxios = require('moxios')

const CommandSender = require('../src/command-sender')

describe('command-sender', function () {

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install()
    })

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    })


    describe('send', function () {

        it('should send a basic command', async function () {
            let url = 'http://localhost:8088/api'

            moxios.stubRequest(`${url}?Function=Cut`, {
                status: 200,
                response: 'Function completed successfully.'
            })

            let command = { Function: 'Cut' }

            let response = await CommandSender.send(url, command)

            assert.equal(response.status, 200)
            assert.equal(response.data, 'Function completed successfully.')
        })


        it('should be allowed to send multiple commands in the same request', async function () {
            let url = 'http://localhost:8088/api'

            moxios.stubRequest(`${url}`, {
                status: 200,
                response: 'Function completed successfully.'
            })

            let command = [{ Function: 'Cut' }, { Function: 'Merge' }, { Function: 'Cut' }]

            let response = await CommandSender.send(url, command)

            assert.equal(response.status, 200)
            assert.equal(response.data, 'Function completed successfully.')
        })

        it('should fail when a invalid command is sent', async function () {
            let url = 'http://localhost:8088/api'
            let command = { Function: 'IAmAnInvalidFunction' }

            moxios.stubRequest(`${url}?Function=IAmAnInvalidFunction`, {
                status: 500,
                response: 'No suitable Function could be found.'
            })

            try {
                let response = await CommandSender.send(url, command)
                assert.fail("Request did not fail")
            } catch (error) {
                assert.equal(error.response.status, 500)
                assert.equal(error.response.data, 'No suitable Function could be found.')
            }
        })
    })
})