const axios = require('axios')
const querystring = require("querystring")

const Connection = require('./connection-tcp')

module.exports = class CommandSender {
    constructor(connection) {
        this.setConnection(connection)


        // //////////////////////
        // Private methods
        // ////////////////////

        /**
         * Send single command
         * @param {Object} command
         */
        this.sendSingleCommand = (command) => {
            // Resolve function name and remove it from object to be injected as querystring
            const funcName = command.Function
            delete command.Function

            const cmdString = querystring.stringify(command)
            this.connection.send(`FUNCTION ${funcName} ${cmdString}`)
        }

        // //////////////////////
        // Private methods end
        // ////////////////////
    }



    /**
     * Set the vMix connection used to know the endpoint for the vMix instance
     *
     * @param {Connection} connection 
     */
    setConnection(connection) {
        if (!connection || !connection instanceof Connection) {
            throw Error("Invalid connection provided!")
        }

        this.connection = connection
    }

    /**
     * Send one or multiple commands
     *
     * @param {Object|Array} commands
     */
    send(commands) {
        if (!Array.isArray(commands)) {
            commands = [commands]
        }

        commands.forEach(this.sendSingleCommand)
    }
}
