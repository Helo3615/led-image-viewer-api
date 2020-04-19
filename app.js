import { displayText, reset } from './displayFunctions.js'
import { main } from './sets.js'
import Express from 'express'

const PORT = 3000
const HOSTNAME = '192.168.0.41'

const app = Express()

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
})

// routes
app.get('/launch/set/main', async (req, res) => res.send(await main()))
app.get('/launch/text/:text/:r/:g/:b/:speed', async (req, res) => 
	res.send(await main(req.params.text, req.params.speed || 2, req.params.r || 255, req.params.g || 255, req.params.b || 255)))
app.get('/reset', (req, res) => res.send(reset())

app.get('/', (req, res) => res.send({
	routes: [
		'/launch/set/main', '/reset', '/launch/text/:text/:r/:g/:b/:speed'
	]
}))
