export default {

	Fullscreen: 'Toggle on/off fullscreen',

	FullscreenOff: 'Switch off fullscreen',

	FullscreenOn: 'Switch on fullscreen',

	SetOutput2: {
		description: 'Change what is displayed on Output 2.',
		parameters: {
			Value: {
				type: String,
				description: 'Can be set to one of the following values: Output, Preview, MultiView, Input. When the value is Input, also the Input parameter must be set to a valid Input number, name or UUID'
			},
			Input: {
				type: String,
				optional: true
			},
		}
	},
	SetOutput3: {
		description: 'Change what is displayed on Output 3.',
		parameters: {
			Value: {
				type: String,
				description: 'Can be set to one of the following values: Output, Preview, MultiView, Input. When the value is Input, also the Input parameter must be set to a valid Input number, name or UUID'
			},
			Input: {
				type: String,
				optional: true
			},
		}
	},
	SetOutput4: {
		description: 'Change what is displayed on Output 4.',
		parameters: {
			Value: {
				type: String,
				description: 'Can be set to one of the following values: Output, Preview, MultiView, Input. When the value is Input, also the Input parameter must be set to a valid Input number, name or UUID'
			},
			Input: {
				type: String,
				optional: true
			},
		}
	},
	SetOutputFullscreen: {
		description: 'Change what is displayed on the Fullscreen output.',
		parameters: {
			Value: {
				type: String,
				description: 'Can be set to one of the following values: Output, Preview, MultiView, Input. When the value is Input, also the Input parameter must be set to a valid Input number, name or UUID'
			},
			Input: {
				type: String,
				optional: true
			},
		}
	},
	SetOutputFullscreen2: {
		description: 'Change what is displayed on the Fullscreen2 output.',
		parameters: {
			Value: {
				type: String,
				description: 'Can be set to one of the following values: Output, Preview, MultiView, Input. When the value is Input, also the Input parameter must be set to a valid Input number, name or UUID'
			},
			Input: {
				type: String,
				optional: true
			},
		}
	},

	Snapshot: {
		description: 'Create a snapshot image of the current Output. Optional Value specifies save Filename, otherwise a save file window will appear. Filename can specify date, for example mysnapshot {0:dd MMM yyyy}.jpg',
		parameters: {
			Value: {
				type: String,
				optional: true
			}
		}
	},

	SnapshotInput: {
		description: 'Create a snapshot image of the selected Input. Optional Value specifies save Filename, otherwise a save file window will appear. Filename can specify date, for example mysnapshot {0:dd MMM yyyy}.jpg',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				optional: true
			}
		}
	},

	StartExternal: 'Start external output',

	StartMultiCorder: 'Start MultiCorder',

	StartRecording: 'Start recording',

	StartStopExternal: 'Toggle start/stop external output',

	StartStopMultiCorder: 'Toggle start/stop MultiCorder',

	StartStopRecording: 'Toggle start/stop recording',

	StartStopStreaming: {
		description: 'Toggle start/stop streaming (of one specific or all configured streams).',
		parameters: {
			Value: {
				type: Number,
				optional: true,
				description: 'Optional stream number starting from 0. Leave blank to control all streams.'
			}
		}
	},

	StartStreaming: {
		description: 'Start streaming (of one specific or all configured streams).',
		parameters: {
			Value: {
				type: Number,
				optional: true,
				description: 'Optional stream number starting from 0. Leave blank to control all streams.'
			}
		}
	},

	StopExternal: 'Stop external output',
	StopMultiCorder: 'Stop MultiCorder',
	StopRecording: 'Stop recording',

	StopStreaming: {
		description: 'Stop streaming (of one specific or all configured streams).',
		parameters: {
			Value: {
				type: Number,
				optional: true,
				description: 'Optional stream number starting from 0. Leave blank to control all streams.'
			}
		}
	},

	StreamingSetKey: {
		description: 'Set Key on Custom RTMP Stream.',
		parameters: {
			Value: {
				type: String,
				description: 'Optional stream number starting from 0 at start followed by comma, e.g. 0,mystreamkey.'
			}
		}
	},

	StreamingSetPassword: {
		description: 'Set Password on Custom RTMP Stream.',
		parameters: {
			Value: {
				type: String,
				description: 'Optional stream number starting from 0 at start followed by comma, e.g 0,password'
			}
		}
	},

	StreamingSetURL: {
		description: 'Set URL on Custom RTMP Stream.',
		parameters: {
			Value: {
				type: String,
				description: 'Optional stream number starting from 0 at start followed by comma, e.g 0,rtmp://myurl/'
			}
		}
	},

	StreamingSetUsername: {
		description: 'Set Username on Custom RTMP Stream.',
		parameters: {
			Value: {
				type: String,
				description: 'Optional stream number starting from 0 at start followed by comma, e.g 0,username'
			}
		}
	},

	WriteDurationToRecordingLog: {
		description: 'Write current recording duration to log file with optional tag text Value.',
		parameters: {
			Value: {
				type: String,
				description: 'Tag Text'
			}
		}
	},
}