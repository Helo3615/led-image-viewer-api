import { exec, spawn } from 'child_process'

const rpiRgbLedMatrixPath = '../rpi-rgb-led-matrix'
const ledRowsCount = 16
const textScrollerPath = '/utils/text-scroller'
const fontPath = rpiRgbLedMatrixPath + '/fonts/9x18.bdf'
const PATH = process.cwd()

const commandPending = null

const executeCommand = command => 
{
	console.log('Will execute command :', command)

	if (!PATH) console.error('Path must be defined')

	var scriptOutput = ""

    const promise = new Promise((resolve, reject) => 
    {
    	commandPending = spawn(command, [], { env: { path: PATH } })
    		.on('close', function(code) 
		    {
		    	console.success('Command closed : ', code)
		    	resolve({ scriptOutput: scriptOutput, code: code })
		    })
    		.on('error', function(error) 
		    {
		    	console.error('Command error : ', error)
		    	reject({ scriptOutput: scriptOutput, code: error })
		    })
		    .stdout.setEncoding('utf8')
		    .stdout.on('data', function(data) 
		    {
		        console.log('stdout: ' + data)

		        data = data.toString()
		        scriptOutput += data
		    })
		    .stderr.setEncoding('utf8')
		    .stderr.on('data', function(data) 
		    {
		        console.log('stderr: ' + data)

		        data = data.toString()
		        scriptOutput += data
		    })
    }) 

	return promise()
		.then(res => ({ command: command, status: 'success', result: res }))
		.catch(err => ({ command: command, status: 'error', result: err }))
}

const makeCommandPrefix = commandFilePath => `${rpiRgbLedMatrixPath}${commandFilePath} --led-rows=${ledRowsCount}`

// int loopCount | -1 for endless
// int speed | 0 for no scrolling
const displayText = (
		text = 'undefined', 
		speed = 2,  
		r = 255, 
		g = 255, 
		b = 255,
		loopCount = -1
	) =>  
{
	reset()

	const color = `${r},${g},${b}`
	const command = `${makeCommandPrefix(textScrollerPath)} -f ${fontPath} -s ${speed} -l ${loopCount} -C ${color} "${text}"`

	return executeCommand(command)
}

const displayImage = () =>  
{
	const commandFilePath = '../led-image-viewer'

}

const reset = () => 
{ 
	if (!commandPending)
		return 'No command pending'

	commandPending.kill()

	return 'Done'
}

export { displayText, displayImage, reset }