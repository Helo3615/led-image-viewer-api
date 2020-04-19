import { exec } from 'child_process'

const rpiRgbLedMatrixPath = '../rpi-rgb-led-matrix'
const ledRowsCount = 16
const fontPath = rpiRgbLedMatrixPath + '/fonts/9x18.bdf'

const timeoutPromise = (ms, promise) => 
{
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => 
    {
      clearTimeout(id)
      reject('Timed out in '+ ms + 'ms.')
    }, ms)
  })

  return Promise.race([
    promise,
    timeout
  ])
}

const executeCommand = command => 
{
	const commandExecuted = new Promise((resolve, reject) => {
		exec(command, (err, stdout, stderr) => 
		{
			if (err) reject(err)

			resolve(stdout ? stdout : stderr)
		})
	})

	return timeoutPromise(5000, commandExecuted)
		.then(res => ({ command: command, status: 'success', result: res }))
		.catch(err => ({ command: command, status: 'error', result: err }))
}

const makeCommandPrefix = commandFilePath => `${rpiRgbLedMatrixPath}${commandFilePath} --led-rows=${ledRowsCount}`

// int loopCount | -1 for endless
// int speed | 0 for no scrolling
const displayText = (
		text = 'undefined', 
		speed = 1, 
		loopCount = -1, 
		r = 255, 
		g = 255, 
		b = 255
	) =>  
{
	const commandFilePath = '/utils/text-scroller'
	const color = `${r},${g},${b}`
	const command = `${makeCommandPrefix(commandFilePath)} -f ${fontPath} -s ${speed} -l ${loopCount} -C ${color} "${text}"`

	return executeCommand(command)
}

const displayImage = () =>  
{
	const commandFilePath = '../led-image-viewer'

}

const turnOff = () => { }

export { displayText, displayImage, turnOff }