export default {

	NDICommand: {
		description: 'Send specified command to NDI source.',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Command to send'
			}
		}
	},

	NDISelectSourceByIndex: {
		description: 'Select NDI source by Index.',
		parameters: {
			Input: 'Input',
			Value: {
				type: Number,
				description: 'Index 0-100'
			}
		}
	},

	NDISelectSourceByName: {
		description: 'Select NDI source by Name.',
		parameters: {
			Input: 'Input',
			Value: {
				type: String,
				description: 'Name of source'
			}
		}
	},

	NDIStartRecording: {
		description: 'Start recording of NDI source input (raw NDI recording)',
		parameters: {
			Input: 'Input'
		}
	},

	NDIStopRecording: {
		description: 'Stop recording of NDI source input (raw NDI recording)',
		parameters: {
			Input: 'Input'
		}
	}
}
