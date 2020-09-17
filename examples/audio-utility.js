const { AudioUtility } = require('../dist/index').default


for (let volume = 0.00; volume <= 100.00; volume += 5.00) {
	const volumeObj = AudioUtility.fromVolume(volume)

	console.log(
		volumeObj.volume(),
		volumeObj.volumeBar()
	)
}