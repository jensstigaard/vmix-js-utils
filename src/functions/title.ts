export default {
	// Currently only able to control one countdown on each title input
	AdjustCountdown: {
		description: 'Seconds to add or subtract from current Countdown time',
		parameters: {
			Value: {
				type: Number,
				description: 'Value in seconds - Enter negative number to subtract'
			}
		}
	},

	// Currently only able to control one countdown on each title input
	ChangeCountdown: {
		description: 'Change countdown time. SelectedIndex or SelectedName parameters can be used to select Text Field',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: String,
				optional: true,
			},
			// NOTE - vMix API documentation says 'SelectedName'
			SelectName: {
				type: String,
				optional: true,
			},

			Value: {
				type: String,
				description: 'Value as hh:mm:ss (00:00:00)'
			}
		},
	},

	NextTitlePreset: {
		description: 'Next Title Preset on Input',
		parameters: {
			Input: 'Input'
		},
	},

	// Currently only able to control one countdown on each title input
	PauseCountdown: {
		description: 'Pause or Resume Countdown. If complete, it restarts from beginning. SelectedIndex or SelectedName parameters can be used to select Text Field',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: String,
				optional: true,
			},
			// NOTE - vMix API documentation says 'SelectedName', and not SelectName (which works though)
			SelectName: {
				type: String,
				optional: true,
			}
		},
	},

	PauseRender: {
		description: 'Pause render of Title input. Remember to fire ResumeRender after making multiple updates',
		parameters: {
			Input: 'Input'
		},
	},

	PreviousTitlePreset: {
		description: 'Previous Title Preset on Input',
		parameters: {
			Input: 'Input'
		},
	},

	ResumeRender: {
		description: 'Resume render of Title input after making multiple updates.',
		parameters: {
			Input: 'Input'
		},
	},

	SelectTitlePreset: {
		description: 'Select Title Preset on Input',
		parameters: {
			Input: 'Input',
			Value: {
				type: Number,
				description: 'Preset Index starting at 0'
			}
		},
	},

	SetCountdown: {
		description: 'Set countdown duration',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Duration as hh:mm:ss (e.g. 00:00:00)'
			}
		},
	},

	SetImage: {
		description: 'Change Image in Title according to Filename or empty to clear. SelectedIndex or SelectedValue can be used to select image.',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},

			Value: {
				type: String,
				description: 'Can use both file:// and https:// addresses.'
			},
		},
	},

	SetImageVisible: {
		description: 'Toggle Image Visibility in Title. SelectedIndex or SelectedValue can be used to select image.',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},
		},
	},

	SetImageVisibleOff: {
		description: 'Hide Image in Title. SelectedIndex or SelectedValue can be used to select image.',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},
		},
	},

	SetImageVisibleOn: {
		description: 'Show Image in Title. SelectedIndex or SelectedValue can be used to select image.',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},
		},
	},

	SetText: {
		description: 'Change Text in Title according to Value parameter. SelectedIndex or SelectName can be used to select image.',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			// NOTE - vMix API documentation says 'SelectedName'
			SelectName: {
				type: String,
				optional: true,
			},

			Value: {
				type: String,
				description: 'Can use both file:// and https:// addresses.'
			},
		},
	},

	SetTextColour: {
		description: 'Change Colour of Text in Title in HTML format',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			// NOTE - vMix API documentation says 'SelectedName', but only SelectName works
			SelectName: {
				type: String,
				optional: true,
			},

			Value: {
				type: String,
				description: 'HTML format (#xxxxxx or #xxxxxxxx), remember to urlencode. E.g. %2333FFFFFF for transparant white'
			},
		},
	},

	SetTextVisible: {
		description: 'Toggle on/off Text Visibility in Title',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},
		},
	},

	SetTextVisibleOff: {
		description: 'Switch off Text Visibility in Title',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},
		},
	},

	SetTextVisibleOn: {
		description: 'Switch on Text Visibility in Title',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},
		},
	},

	SetTickerSpeed: {
		description: 'Change Ticker Speed.',
		parameters: {
			Input: 'Input',

			SelectedIndex: {
				type: Number,
				optional: true,
			},
			SelectedValue: {
				type: String,
				optional: true,
			},

			Value: {
				type: Number,
				description: 'Speed between 0 to 1000'
			}
		},
	},


	StartCountdown: {
		description: 'Start Countdown',
		parameters: {
			Input: 'Input',

			// 	SelectedIndex: {
			// 		type: Number,
			// 		optional: true,
			// 	},
			// 	SelectedValue: {
			// 		type: String,
			// 		optional: true,
			// 	},
			// },
		},
	},

	StopCountdown: {
		description: 'Stop Countdown',
		parameters: {
			Input: 'Input',

			// SelectedIndex: {
			// 	type: Number,
			// 	optional: true,
			// },
			// SelectedValue: {
			// 	type: String,
			// 	optional: true,
			// },
		},
	},

	SuspendCountdown: {
		description: 'Suspend Countdown - does not restart countdown on completion - stays 00.00.',
		parameters: {
			Input: 'Input',

			// SelectedIndex: {
			// 	type: Number,
			// 	optional: true,
			// },
			// SelectedValue: {
			// 	type: String,
			// 	optional: true,
			// },
		},
	},

	TitleBeginAnimation: {
		description: 'Title begin animation',
		parameters: {
			Input: 'Input',

			Value: {
				type: String,
				description: 'Animation name'
			},
		},
	},
}