// Examples can be found in the /examples folder

import ApiDataParser from './modules/api-data-parser'
import InputMapper from './modules/input-mapper'
import FunctionList from './modules/function-list'
import TcpTally from './modules/tcp-tally'


// Exposing the util classes - used by npm
export {
    ApiDataParser,
    InputMapper,
    FunctionList,
    TcpTally
}
export default {
    ApiDataParser,
    InputMapper,
    FunctionList,
    TcpTally

    // StateFetcher: require('./src/state-fetcher'),
}
