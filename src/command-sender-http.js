const axios = require('axios')
const querystring = require("querystring")

const Connection = require('./connection-http')

module.exports = class CommandSenderHttp {
    constructor(connection, onSuccess, onError) {
        this.setConnection(connection)

        this.onError = onError
        this.onSuccess = onSuccess

        // Prepare promise
        this.preparePromise = (commands) => {

            // If only one command were coded - send via get request
            if (!Array.isArray(commands)) {
                let command = commands

                return axios.get(this.connection.apiUrl(), { params: command })
            }

            // If multiple commands - send via POST request

            // Manipulate commands for being sent in POST request
            let commandsMap = commands.map(command => {
                return querystring.stringify(command)
            })

            let data = {
                Function: 'ScriptStartDynamic',
                Value: commandsMap.join("\n\r")
            }

            let dataString = querystring.stringify(data)

            return axios.post(this.connection.apiUrl(), dataString)
        }
    }

    /**
     * Set the vMix connection used to know the endpoint for the vMix instance
     * @param {Connection} connection 
     */
    setConnection(connection) {
        if (!connection || !connection instanceof Connection) {
            throw Error("Invalid connection provided!")
        }

        this.connection = connection
    }

    send(commands, onSuccess, onError) {

        let promise = this.preparePromise(commands)

        promise
            .then(response => {
                this.onSuccess && this.onSuccess(response)
                onSuccess && onSuccess(response)
            })
            .catch(error => {
                this.onError && this.onError(error)
                onError && onError(error)
            })

        return promise
    }
}
