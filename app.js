import { displayText } from './displayFunctions.js'
import { main } from './sets.js'
import Express from 'express'

const PORT = 3000
const HOSTNAME = '127.0.0.1'

const app = Express()

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
})

// routes
app.get('/launch/set/main', async (req, res) => res.send(await main())

app.get('*', (req, res) => {  throw new Error('Wrong route') })

