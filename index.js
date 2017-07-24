const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()

app.use(cors())
app.use(express.static(__dirname))
app.use(require('body-parser').json())

app.get('/json', (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  res.setHeader('Content-Type', 'application/json')
  res.send(fs.readFileSync('./copy/index.json'))

})

app.post('/json', (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  fs.writeFileSync('copy/index.json', JSON.stringify(req.body, null, "\t"), 'utf8')
  res.send(fs.readFileSync('./copy/index.json'))
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

