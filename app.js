import { displayText } from './displayFunctions.js'
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

app.get('/', (req, res) => res.send({
	routes: [
		'/launch/set/main'
	]
}))

