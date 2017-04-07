'use strict'


const net = require('net')

const server = net.createServer((socket) => {
    socket.pipe(socket)
    socket.write('welcome\n')

    // socket.on('data', (msg) => {
    //     console.log(msg.toString())
    // })
})

server.listen(8888)

