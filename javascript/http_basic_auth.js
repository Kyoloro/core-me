'use strict'


const http = require('http')

const server = http.createServer((req, res) => {
    const base = req.headers.authorization.split(' ')[1]
    const r = new Buffer(base, 'base64').toString().split(':')
    const user = r[0]
    const pwd = r[1]
    console.log('user: ', user)
    console.log('pwd: ', pwd)

    if (user && pwd) {
        res.end('Ok')
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.statusCode = 401
        res.end('Access Denied')
    }
})

server.listen(3000)