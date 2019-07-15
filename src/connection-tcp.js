var net = require('net')

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

        this.buffered = ''

        // TCP socket
        this.socket = new net.Socket()
        this.socket.setEncoding('utf8')

        // Initialize listener arrays and callback taps
        this.listeners = {
            data: [],
            // ... plus others!
        }

        listenerTypes.forEach(type => {
            this.listeners[type] = []

            this.socket.on(type, (data) => {
                // Tap all listener callbacks
                this.listeners[type].forEach(callback => {
                    callback(data)
                })
            })
        })

        this.socket.on('data', (data) => {
            this.buffered += data
            this.processBuffer()
        })

        // Attempt connect
        this.socket.connect(this.port, this.host, () => {
            // console.log('Connected', this.host, this.port)
            this.isConnected = true
        })

        if (onDataCallback && typeof onDataCallback === 'function') {
            this.listeners.data.push(onDataCallback)
        }

        // Process received data
        // Each command is sent "in its own line", 
        // and ending with a new line character. 
        // https://medium.com/@nikolaystoykov/build-custom-protocol-on-top-of-tcp-with-node-js-part-1-fda507d5a262
        this.processBuffer = () => {
            let received = this.buffered.split('\r\n')

            // No new lines were found - keep whole buffer
            if (received.length === 1) {
                return
            }

            // While there are found one or more new line characters,
            // Keep flushing each message out, and reduce the buffer
            while (received.length > 1) {
                // Got message. Trim this, and 
                // emitt the message if there were content
                const message = received[0].trim()
                if (message) {
                    this.emitMessage(message)
                }

                // Slice buffer and repeat if more complete messages can be found
                this.buffered = received.slice(1).join('\r\n')
                received = this.buffered.split('\r\n')
            }
        }

        this.emitMessage = (message) => {
            // console.log('Message are to be emitted', message)

            // Tap callback listeners with message
            this.listeners.data.forEach(callback => {
                callback(message)
            })
        }
    }

    /**
     * Send command to connection
     * 
     * @param {String} message 
     */
    send(message) {
        // End message with a new line character
        // to make sure the message is interpreted by the receiver
        if (!message.endsWith('\r\n')) {
            message += '\r\n'
        }

        this.socket.write(message)
        // client.write('Hello, server! Love, Client.')
    }

    /**
     * Register listener
     * 
     * @param {String} type 
     * @param {Function} callback 
     */
    on(type, callback) {
        const availableListenerTypes = listenerTypes.concat(['data'])

        if (!availableListenerTypes.includes(type)) {
            throw new Error(`Invalid type of listener... ${type}`)
        }

        if (typeof callback !== 'function') {
            throw new Error(`Invalid type of callback... ${typeof callback}`)
        }

        this.listeners[type].push(callback)
    }

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