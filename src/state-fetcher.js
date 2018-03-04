/**
 * Created by Jens on 07-07-2017.
 */
const axios = require('axios')

const Connection = require('./connection')

// Specific headers for ajax request to webcontroller
let webcontrollerAjaxRequestHeaders = {
    timeout: 500,
    headers: {
        common: ''
    }
}

module.exports = class VmixStateFetcher {
    constructor(connection, refreshRate = 100, startOnInit = false) {

        if (!connection || !connection instanceof Connection) {
            throw Error("Need a connection!")
        }

        // Callbacks
        this.callbacks = {
            onSuccess: [],
            onError: [],
        }

        // HTTP client
        this.httpClient = axios.create()
        this.httpClient.defaults.timeout = 1500

        // Destination
        this.connection = connection

        // State
        this.active = false

        // Timestamps
        this.timestamps = {
            latestSuccess: null,
            latestError: null
        }

        // Refresh rate - ms - how long between requests?
        this.defaultRefreshRate = refreshRate < 100 ? 100 : refreshRate
        this.refreshRate = this.defaultRefreshRate
        this.refreshRateThreshold = 10000

        this.run = function () {
            this.httpClient
                .get(this.connection.apiUrl(), webcontrollerAjaxRequestHeaders)
                .then(this.registerSuccess)
                .catch(this.registerError)

            return this.runNextTick()
        }

        // Run the "next tick"
        this.runNextTick = () => {
            if (!this.active) {
                return this
            }

            setTimeout(_ => {
                this.run()
            }, this.refreshRate)

            return this
        }

        // Act upon a success response
        this.registerSuccess = (response) => {
            this.resetRefreshRate()

            this.timestamps.latestSuccess = new Date

            // Tap callbacks
            this.callbacks.onSuccess.forEach(callback => {
                callback(response.data)
            })
        }

        // Act upon a faulty response
        this.registerError = (error) => {
            this.increaseRefreshRate()

            this.timestamps.latestError = new Date

            // Tap callbacks
            this.callbacks.onError.forEach(callback => {
                callback(error)
            })
        }

        this.resetRefreshRate = () => {
            this.refreshRate = this.defaultRefreshRate
        }

        this.increaseRefreshRate = () => {
            // Guard if the threshold is reached
            if (this.refreshRate >= this.refreshRateThreshold) {
                return
            }

            this.refreshRate *= 2

            return this
        }

        if (!!startOnInit) {
            this.start()
        }
    }

    //////////////////////////////////
    // Public functions 
    //////////////////////////////////

    // Methods

    onSuccess(func) {
        this.callbacks.onSuccess.push(func)

        return this
    }

    onError(func) {
        this.callbacks.onError.push(func)

        return this
    }

    start() {
        if (this.active) {
            return
        }

        this.active = true
        this.run()
    }

    stop() {
        this.active = false
    }


    // Getters

    currentRefreshRate() {
        return this.refreshRate
    }

    latestSuccessAt() {
        return this.latestSuccess
    }

    latestErrorAt() {
        return this.latestError
    }
}