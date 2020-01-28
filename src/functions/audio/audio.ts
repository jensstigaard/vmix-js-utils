// Description used multiple places
const audioBussesDesc: string = 'Valid bus names M,A,B,C,D,E,F,G - Value can be mixed, e.g. MAB - to toggle MAB busses'

export default {
	Audio: {
		description: 'Toggle Audio Mute On/Off for an Input',
		parameters: {
			Input: 'Input'
		}
	},

	AudioAuto: {
		description: 'Toggle AudioAuto (Audio Follow Video) On/Off for an Input',
		parameters: {
			Input: 'Input'
		}
	},

	AudioAutoOff: {
		description: 'Switch AudioAuto (Audio Follow Video) Off for an Input',
		parameters: {
			Input: 'Input'
		}
	},

	AudioAutoOn: {
		description: 'Switch AudioAuto (Audio Follow Video) On for an Input',
		parameters: {
			Input: 'Input'
		}
	},

	// Audio busses general functions
	AudioBus: {
		description: 'Toggle on/off Audio Bus(ses) for an Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Busses to toggle. ' + audioBussesDesc
			}
		}
	},

	AudioBusOff: {
		description: 'Switch off Audio Bus(ses) for an Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Busses to switch off. ' + audioBussesDesc
			}
		}
	},

	AudioBusOn: {
		description: 'Switch on Audio Bus(ses) for an Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Busses to switch on. ' + audioBussesDesc
			}
		}
	},

	AudioMixerShowHide: {
		description: 'Toggle show/hide of Audio Mixer panel',
		parameters: {}
	},

	AudioOff: {
		description: 'Switch Audio off for an Input',
		parameters: {
			Input: 'Input'
		}
	},

	AudioOn: {
		description: 'Switch Audio on for an Input',
		parameters: {
			Input: 'Input'
		}
	},

	AudioPluginOff: {
		description: 'Switch off Audio Plugin for an Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Plugin Number starting from 1'
			}
		}
	},

	AudioPluginOn: {
		description: 'Switch on Audio Plugin for an Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Plugin Number starting from 1'
			}
		}
	},

	AudioPluginOnOff: {
		description: 'Toggle on/off Audio Plugin for an Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Plugin Number starting from 1'
			}
		}
	},

	AudioPluginShow: {
		description: 'Show Audio Plugin Editor',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Plugin Number starting from 1'
			}
		}
	},
}