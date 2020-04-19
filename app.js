import { displayText } from './displayFunctions'
import { main } from './sets'
import Express from 'express'

const PORT = 3000
const HOSTNAME = '127.0.0.1'

const app = Express()

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// routes
app.get('/launch/set/main', (req, res) => main())

app.get('*', (req, res) => {  throw new Error('Wrong route') })

