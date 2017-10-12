const express = require('express')
const server = express()

server.get('/like', (req, res) => {

    res.send({ like: 1 })

})

server.listen(6000, console.log('server on : 6000'))