const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello docker caching!')
})

app.listen(5000, "0.0.0.0", function () {
  console.log('Listening on port 5000!')
})
