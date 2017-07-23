const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.static(__dirname))
app.use(require('body-parser').json())

app.get('/json', (req, res) => { 
  res.setHeader('Content-Type', 'application/json');
  res.send(fs.readFileSync('./data/index.json')) 
})

app.post('/json', (req, res) => { 
  fs.writeFileSync('data/index.json', JSON.stringify(req.body, null, "\t"), 'utf8')
  res.send(fs.readFileSync('./data/index.json')) 
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

