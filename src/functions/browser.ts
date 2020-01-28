export default {

	BrowserBack: {
		description: 'Go back one page for browser input',
		parameters: {
			Input: 'Input'
		}
	},

	BrowserForward: {
		description: 'Go forward one page for browser input',
		parameters: {
			Input: 'Input'
		}
	},

	BrowserKeyboardDisabled: {
		description: 'Disable keyboard for browser input',
		parameters: {
			Input: 'Input'
		}
	},

	BrowserKeyboardEnabled: {
		description: 'Enable keyboard for browser input',
		parameters: {
			Input: 'Input'
		}
	},

	BrowserMouseDisabled: {
		description: 'Disable mouse interaction for browser input',
		parameters: {
			Input: 'Input'
		}
	},

	BrowserMouseEnabled: {
		description: 'Enable mouse interaction for browser input',
		parameters: {
			Input: 'Input'
		}
	},

	BrowserNavigate: {
		description: 'Navigate browser input to specific URL',
		parameters: {
			Input: 'Input',
			Value: {
				type: URL,
				description: 'URL to navigate to'
			}
		}
	},

	BrowserReload: {
		description: 'Reload page for browser input',
		parameters: {
			Input: 'Input'
		}
	}
}
