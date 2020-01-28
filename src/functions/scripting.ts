//
export default {
	ScriptStart: {
		description: 'Start script',
		parameters: {
			Value: {
				type: String,
				description: 'Script name'
			}
		}
	},

	ScriptStartDynamic: {
		description: 'Start a dynamic script using code specified as the Value.',
		parameters: {
			Value: {
				type: String,
				description: 'Code to execute'
			}
		}
	},

	ScriptStop: {
		description: 'Stop script',
		parameters: {
			Value: {
				type: String,
				description: 'Script name'
			}
		}
	},

	ScriptStopAll: 'Stop all scripts currently executing',
	ScriptStopDynamic: 'Stop all dynamic scripts currently executing'
}
