/**
 * Created by Jens on 07-07-2017.
 */
const ApiUrlError = require('./exceptions/api-url-error')

module.exports = class VmixApiUrl {
    static resolve (host, port) {
        if(!host || host.length < 3){
            throw new ApiUrlError('Invalid host provided')
        }

        if(!port || port < 80 || port > 99999){
            throw new ApiUrlError('Invalid port provided')
        }

        return `http://${host}:${port}/api`
    }
}