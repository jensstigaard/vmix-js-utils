// Examples can be found in the /examples folder

import FunctionList from './modules/function-list'
import TcpTally from './modules/tcp-tally'
import XmlApiDataParser from './modules/xml-api-data-parser'
import XmlInputMapper from './modules/xml-input-mapper'
import XmlOverlayChannels from './modules/xml-overlay-channels'


// Exposing the util classes - used by npm
export {
    FunctionList,
    TcpTally,
    XmlApiDataParser,
    XmlInputMapper,
    XmlOverlayChannels
}
export default {
    FunctionList,
    TcpTally,
    XmlApiDataParser,
    XmlInputMapper,
    XmlOverlayChannels

    // StateFetcher: require('./src/state-fetcher'),
}
