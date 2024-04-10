const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('hello')
})

server.listen(3000, () => {
    console.log('start at port 3000')
})