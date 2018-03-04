const ApiUrlResolver = require("./api-url-resolver")

module.exports = class Connection {
    constructor(params = {}) {
        this.host = params.host || 'localhost'
        this.port = params.port || 8088
    }

    webcontrollerUrl() {
        return `http://${this.host}:${this.port}`
    }

    apiUrl() {
        if (this.port === 1) {
            return `http://localhost:${location.port}/data/vmix-data.xml`
        }

        return ApiUrlResolver.resolve(this.host, this.port)
    }
}