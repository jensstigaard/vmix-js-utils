export default {

	DataSourceAutoNextOff: {
		description: 'Turn off auto next for data source',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: String,
					description: 'Data source name Name'
				},
				{
					type: String,
					description: 'Table name'
				},
			]
		}
	},

	DataSourceAutoNextOn: {
		description: 'Turn on auto next for data source',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: String,
					description: 'Data source name'
				},
				{
					type: String,
					description: 'Table name'
				},
			]
		}
	},

	DataSourceAutoNextOnOff: {
		description: 'Toggle on/off auto next for data source',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: String,
					description: 'Data source name'
				},
				{
					type: String,
					description: 'Table name'
				},
			]
		}
	},

	DataSourceNextRow: {
		description: 'Select next row of data source',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: String,
					description: 'Data source name'
				},
				{
					type: String,
					description: 'Table name'
				},
			]
		}
	},

	DataSourcePreviousRow: {
		description: 'Select previous row of data source',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: String,
					description: 'Data source name'
				},
				{
					type: String,
					description: 'Table name'
				},
			]
		}
	},

	DataSourceSelectRow: {
		description: 'Select row by row index of data source',
		parameters: {
			Value: [ // Composite separated by ","
				{
					type: String,
					description: 'Data source name'
				},
				{
					type: String,
					description: 'Table name'
				},
				{
					type: Number,
					description: 'Row Index starting from 0'
				},
			]
		}
	},

	GENERIC: {
		description: '',
		parameters: {

		}
	}
}
