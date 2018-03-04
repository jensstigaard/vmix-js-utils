/**
 * Created by Jens on 07-07-2017.
 */
const axios = require('axios')

const Connection = require('./connection')

module.exports = class VmixStateFetcher {
    constructor(connection, refreshRate = 100, startOnInit = false) {

        if (!connection || !connection instanceof Connection) {
            throw Error("Need a connection!")
        }

        // Callbacks
        this.onSuccess = []
        this.onError = []

        // HTTP client
        this.httpClient = axios.create()
        this.httpClient.defaults.timeout = 1500

        // Destination
        this.connection = connection

        // Status
        this.active = false

        // Refresh rate - ms - how long between requests?
        this.defaultRefreshRate = refreshRate < 100 ? 100 : refreshRate
        this.refreshRate = this.defaultRefreshRate
        this.refreshRateThreshold = 10000

        // Specific headers for ajax request to webcontroller
        this.webcontrollerAjaxRequestHeaders = {
            timeout: 500,
            headers: {
                common: ''
            }
        }

        this.run = function () {
            this.httpClient
                .get(this.connection.apiUrl(), this.webcontrollerAjaxRequestHeaders)
                .then(response => {
                    this.refreshRate = this.defaultRefreshRate
                    this.onSuccess.forEach(callback => {
                        callback(response.data)
                    })
                })
                .catch(error_response => {
                    this.increaseRefreshRate()
                    this.onError.forEach(callback => {
                        callback(error_response)
                    })
                })

            this.runNextTick()
        }

        this.runNextTick = function () {
            if (!this.active) {
                return this
            }

            setTimeout(_ => {
                this.run()
            }, this.refreshRate)

            return this
        }


        this.registerCallbackOnSuccess = function (func) {
            this.onSuccess.push(func)

            return this
        }

        this.registerCallbackOnError = function (func) {
            this.onError.push(func)

            return this
        }

        this.restart = function () {
            this.refreshRate = this.defaultRefreshRate
        }

        this.increaseRefreshRate = function () {
            // Guard
            if (this.refreshRate >= this.refreshRateThreshold) {
                return
            }

            this.refreshRate *= 2

            return this
        }

        if (startOnInit) {
            this.start()
        }
    }

    currentRefreshRate() {
        return this.refreshRate
    }

    start() {
        if (this.active) {
            return
        }

        this.active = true
        this.run()
    }
}