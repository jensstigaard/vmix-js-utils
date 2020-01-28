import general from './general'

import audio from './audio/index'
import transition from './transition'
import output from './output'
import title from './title'
import input from './input'
import overlay from './overlay'
import playlist from './playlist'
import scripting from './scripting'
import replay from './replay'
import ndi from './ndi'
import ptz from './ptz'
import preset from './preset'
import datasources from './datasources'
import browser from './browser'

// All functions broken up in categories
// Respecting the order of the vMix documentation
// See https://www.vmix.com/help23/ShortcutFunctionReference.html
export default {
	...general,
	...audio,
	...transition,
	...output,
	...title,
	...input,
	...overlay,
	...playlist,
	...scripting,
	...replay,
	...ndi,
	...ptz,
	...preset,
	...datasources,
	...browser
}
