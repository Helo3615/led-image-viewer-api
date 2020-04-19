const express = require('express')
const app = express()

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

import { displayText } from './displayFunctions'
import { main } from './sets'

// routes
app.get('/launch/set/main', (req, res) => main())

app.get('*', (req, res) => {  throw new Error('Wrong route') })

