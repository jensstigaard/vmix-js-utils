/**
 * Created by Jens on 07-07-2017.
 */
const axios = require('axios')
const { forEach } = require('lodash')

module.exports = class VmixStateFetcher {
    constructor(vMixConnection, refreshRate = 100, startOnInit = false) {
        // Callbacks
        this.callbacksOnSuccess = []
        this.callbacksOnError = []

        // HTTP client
        this.httpClient = axios.create()
        this.httpClient.defaults.timeout = 1500

        // Destination
        this.connection = vMixConnection

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
            //console.log(this.refreshRate)
            this.httpClient.get(this.connection.apiUrl(), this.webcontrollerAjaxRequestHeaders)
                .then(response => {
                    this.refreshRate = this.defaultRefreshRate
                    forEach(this.callbacksOnSuccess, callback => {
                        callback(response.data)
                    })
                })
                .catch(error_response => {
                    this.increaseRefreshRate()
                    forEach(this.callbacksOnError, callback => {
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
            this.callbacksOnSuccess.push(func)

            return this
        }

        this.registerCallbackOnError = function (func) {
            this.callbacksOnError.push(func)

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