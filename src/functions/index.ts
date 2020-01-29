import General from './general'

import Audio from './audio/index'
import Transition from './transition'
import Output from './output'
import Title from './title'
import Input from './input'
import Overlay from './overlay'
import Playlist from './playlist'
import Scripting from './scripting'
import Replay from './replay'
import NDI from './ndi'
import PTZ from './ptz'
import Preset from './preset'
import DataSources from './datasources'
import Browser from './browser'

// All functions broken up in categories
// Respecting the order of the vMix documentation
// See https://www.vmix.com/help23/ShortcutFunctionReference.html
export default {
	General,
	Audio,
	Transition,
	Output,
	Title,
	Input,
	Overlay,
	Playlist,
	Scripting,
	Replay,
	NDI,
	PTZ,
	Preset,
	DataSources,
	Browser
}
