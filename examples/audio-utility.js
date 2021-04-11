const { AudioUtility } = require('../dist/index').default

/**
 * Example previewing values of volume XML and volume bar
 * 
 * https://www.vmix.com/knowledgebase/article.aspx/144/vmix-api-audio-levels
 */
for (let volumeXml = 0.00; volumeXml <= 100.00; volumeXml += 5.00) {
	const volumeObj = AudioUtility.fromVolume(volumeXml)

	console.log(
		'XML: %s\t BAR: %s',
		String(volumeObj.volume()).padStart(5),
		String(volumeObj.volumeBar()).padStart(5)
	)
}