const net = require('net')

const querystring = require("querystring")

// Exceptions
const ApiUrlError = require('./exceptions/api-url-error')

const listenerTypes = [
    'close',
    'connect',
    'end',
    'error'
]

const DEFAULT_TCP_PORT = 8099

/**
 * vMix Connection via TCP
 * 
 * vMix TCP API docs
 * https://www.vmix.com/help22/TCPAPI.html
 * 
 * Node.js TCP client / server
 * https://gist.github.com/sid24rane/2b10b8f4b2f814bd0851d861d3515a10
 */
module.exports = class vMixConnectionTCP {

    /**
     * 
     * @param {String} host 
     * @param {Number} port 
     * @param {Function} onDataCallback 
     */
    constructor(host = 'localhost', port = DEFAULT_TCP_PORT, onDataCallback = null) {

        // Validate host and port
        if (!host || host.length < 3) {
            throw new ApiUrlError('Invalid host provided')
        }
        if (!port || port < 80 || port > 99999) {
            throw new ApiUrlError('Invalid port provided')
        }

        // Set params
        this.host = host
        this.port = port

        this.isConnected = false

        // Buffer to store byte array of current incoming message
        this.buffer = Buffer.from([])

        // TCP socket
        this.socket = new net.Socket()

        // Initialize listener arrays and callback taps
        this.listeners = {
            data: [],
            xmlData: []
            // ... plus the generic ones from the socket!
        }

        // On base listener types
        listenerTypes.forEach(type => {
            this.listeners[type] = []

            // Add socket listenener to tap all
            // registered callbacks
            this.socket.on(type, (data) => {
                // Get all listeners of this type and
                // Invoke callback method with data
                this.listeners[type].forEach(callback => {
                    callback(data)
                })
            })
        })

        // On data listener
        // Put data into buffer and try to process data
        this.socket.on('data', data => {
            this.buffer = Buffer.concat([this.buffer, data])
            this.processBuffer()
        })

        // Attempt connect
        this.socket.connect(this.port, this.host, () => {
            this.isConnected = true
        })

        // Were a onDataCallback passed with constructor?
        // Add this to listeners for data
        if (onDataCallback && typeof onDataCallback === 'function') {
            this.listeners.data.push(onDataCallback)
        }


        // ///////////////////////
        // Private methods below
        // /////////////////////

        /**
         * Process received data that is currently in the buffer
         */
        this.processBuffer = () => {

            // Process buffer if it contains data
            if (!this.buffer.byteLength) {
                return
            }

            // Parse buffer to string and trim start and end
            const data = this.buffer.toString()

            // Split on each new line
            const receivedLines = data.split('\r\n')
            // .map(line => line.trim())
            // .filter(line => line)

            // If less than two lines were found
            // do not process buffer yet - keep whole buffer
            if (receivedLines.length === 0) {
                return
            }

            // console.log('Total bytes length:', this.buffer.byteLength)
            // console.log('Got lines:', receivedLines.length)
            // console.log(receivedLines[0])
            // console.log(data.byteLength)
            // console.log('-----')
            // return

            // We know now that the buffer got at least one complete message!
            // We now ingest and analyse this first message
            let firstMsg = ''
            for (let i = 0; i < receivedLines.length; i++) {
                const line = receivedLines[i]
                if (line.length) {
                    firstMsg = line
                    break
                }
            }

            const firstMessage = firstMsg

            if (firstMessage.length === 0) {
                return
            }

            // Trim and then split the first message on spaces
            const firstMessageParts = firstMessage.split(' ')
                .map(p => p.trim())
                .filter(p => p)

            const firstMessageLength = Buffer.from(firstMessage).byteLength

            // console.log('First message length', `"${firstMessage}"`, firstMessageLength, firstMessage.length)

            const messageMethod = firstMessageParts[0]

            // If not an XML message then
            // just emit the message without further manipulation
            if (messageMethod !== 'XML') {
                // console.log('Not an XML message - instead a message of type', messageMethod)
                this.emitMessage(firstMessage)


                // Pop first message from buffer
                const sliced = this.buffer.slice(firstMessageLength + 2) // New line character is two bytes
                // console.log('Sliced', sliced.toString())
                this.buffer = sliced

                // Process more data
                this.processBuffer()
                return
            }

            // We now know the message were a XML message

            if (firstMessageParts.length < 2) {
                console.log('First message did not include how long the XML should be..')
                return
            }

            // What should the number of bytes the XML data should be?
            // The first message includes the length as the second argument
            // (e.g. "XML 2534")
            // The data could potentially be split up in multiple messages
            // Therefore, we need to check that we have received the complete
            // message, otherwise we do not emit the message yet!
            const bufferLengthNeeded = parseInt(firstMessageParts[1])
            // console.log('Buffer Length needed', bufferLengthNeeded)

            // const dataMessages = data.slice(1) // Strip out the first message
            // const messages = dataMessages.join('\r\n') // Concat all received messages

            // Is the total length of the data "long enough"?
            // console.log('Buffer length: ', this.buffer.byteLength)
            // console.log('First message length: ', firstMessageLength)
            // console.log('Needed from message: ', bufferLengthNeeded)
            if (this.buffer.byteLength < firstMessageLength + 2 + bufferLengthNeeded) {
                // console.log('Not enough data in buffer...')
                // console.log(`"""${data}"""`)
                return
            }

            // The buffer were "long enough"
            // Exctract the XML data

            const xmlData = this.buffer.slice(firstMessageLength + 2, firstMessageLength + bufferLengthNeeded)
            const xmlDataString = xmlData.toString()

            this.emitXmlMessage(xmlDataString)

            // Pop message from current buffer data and update buffer
            this.buffer = this.buffer.slice(firstMessageLength + bufferLengthNeeded + 2)

            this.processBuffer()
        }

        /**
         * Emit generic data message
         */
        this.emitMessage = (message) => {
            // Tap callback listeners with message
            this.listeners.data.forEach(callback => {
                callback(message)
            })
        }

        /**
         * Emit XML message
         */
        this.emitXmlMessage = (message) => {

            const listeners = this.listeners.xmlData

            // If no xmlData listeners were registered then
            // fallback to emit the xml message as generic message
            if (!listeners || !listeners.length) {
                return this.emitMessage(message)
            }

            // Tap callback listeners with message
            listeners.forEach(callback => {
                callback(message)
            })
        }



        /**
         * Send message to connection
         * 
         * This must be a string of the complete command to execute
         * 
         * The available commands are listed under:
         * https://www.vmix.com/help22/TCPAPI.html 
         * See "Commands section"
         * 
         * @param {String} message 
         */
        this.sendSingleMessage = (message) => {
            // End message with a new line character
            // to make sure the message is interpreted by the receiver
            if (!message.endsWith('\r\n')) {
                message += '\r\n'
            }

            this.socket.write(message)
        }


        /**
         * Convert a command object to the string to execute
         * 
         * @param {Object} command
         * @returns {String}
         */
        this.commandObjectToString = (command) => {
            // Guard no function for the command set
            if (!'Function' in command) {
                throw new Error('Function parameter is missing in the command')
            }

            // Resolve function name and
            // remove it from object to be injected as querystring
            const funcName = command.Function
            delete command.Function

            const cmdString = querystring.stringify(command)
            return `FUNCTION ${funcName} ${cmdString}`
        }

        /**
         * Stringify commands if necessary
         * @param {Object|String} command
         * 
         * @returns {String}
         */
        this.stringifyCommand = command => {
            if (typeof command === 'object') {
                return this.commandObjectToString(command)
            }

            return command
        }

        // //////////////////////
        // Private methods end
        // ////////////////////
    }




    /**
     * Send command(s) to connection
     * 
     * This must be a string or object,
     * or a array of strings or objects (or a mix of object or strings) 
     * 
     * The available commands are listed under:
     * https://www.vmix.com/help22/TCPAPI.html 
     * See "Commands section"
     * 
     * @param {Array|Object|String} commands 
     */
    send(commands) {
        if (!Array.isArray(commands)) {
            commands = [commands]
        }

        // Stringify each command (if necessary) and send these as 
        // single messages on TCP socket
        commands
            .map(this.stringifyCommand)
            .forEach(this.sendSingleMessage)
    }

    /**
     * Register listener on a specific type
     * 
     * @param {String} type 
     * @param {Function} callback 
     */
    on(type, callback) {
        const availableListenerTypes = listenerTypes.concat(['data', 'xmlData'])

        if (!availableListenerTypes.includes(type)) {
            throw new Error(`Invalid type of listener... ${type}`)
        }

        if (typeof callback !== 'function') {
            throw new Error(`Invalid type of callback... ${typeof callback}`)
        }

        this.listeners[type].push(callback)
    }

    /**
     * AskShutdown and destroy the TCP socket
     */
    shutdown() {
        // this.socket.destroy(); // kill client after server's response
        this.socket.destroy()
    }

    /**
     * Get raw TCP socket
     * 
     * @returns net.Socket
     */
    socket() {
        return this.socket
    }
}