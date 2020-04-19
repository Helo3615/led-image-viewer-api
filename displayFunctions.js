import { exec } from 'child_process'

const fontPath = '../fonts/9x18.bdf'
const rpiRgbLedMatrixPath = '../rpi-rgb-led-matrix'

const handleCommandResponse = (err, stdout, stderr) => 
{
	if (err) console.error(err)
	else {
	   // the *entire* stdout and stderr (buffered)
	   console.log(`stdout: ${stdout}`)
	   console.log(`stderr: ${stderr}`)
	}
}

// int loopCount | -1 for endless
// int speed | 0 for no scrolling
const displayText = (
		text = 'undefined', 
		speed = 0, 
		loopCount = -1, 
		r = 255, 
		g = 255, 
		b = 255
	) =>  
{
	const commandPrefix = rpiRgbLedMatrixPath + '/utils/text-scroller'
	const color = `${r},${g},${b}`
	const command = `${commandPrefix} -f ${fontPath} -s ${speed} -l ${loopCount} -C ${color} "${text}"`

	exec(command,  handleCommandResponse)
}

const displayImage = () =>  
{
	const commandPrefix = '../led-image-viewer --led-rows=16 '

}

const turnOff = () => { }

export { displayText, displayImage, turnOff }